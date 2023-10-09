from flask import Flask, make_response,jsonify,request,session
from sqlalchemy import desc
from flask_migrate import Migrate
from flask_restful import Resource,Api
from models import db,User,Post,Message,Comment
import bcrypt
# from flask_cors import CORS

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///link_loop.db'
app.secret_key='Bad_secret'
# CORS(app)
migrate=Migrate(app,db)

db.init_app(app)

api=Api(app)

@app.before_request
def check_if_logged_in():
    if session.get('user_id') is None and request.endpoint not in ['/login', '/signup']:
        return {'error': 'Unauthorized'}, 401

class Index(Resource):
    def get(self):
        try:
            response_dict = {
                "index": "Welcome to the link loop RESTful API",
            }
            return make_response(jsonify(response_dict), 200)
            
        except Exception as e:
            response_dict = {"error": f"An error occurred.{str(e)}"}
            return make_response(jsonify(response_dict), 500)

api.add_resource(Index, '/')


class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            existing_user = User.query.filter_by(username=data['username']).first()
            if existing_user:
                return jsonify({"error": "Username is already taken"}), 400

            
            password = data.get('password').encode('utf-8')
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

            new_user = User(
                username=data.get('username'),
                email=data.get("email"),
                password=hashed_password,
                profile_picture_url=data.get('profile_picture_url')
            )
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id

            response = make_response(
                new_user.to_dict(),
                201
            )
            return response

        except Exception as e:
            response_dict = {"error": f"{str(e)}"}
            return make_response(jsonify(response_dict), 500)

api.add_resource(Signup, '/signup', endpoint='/signup')        


class Login(Resource):

   def post(self):
        data = request.get_json()
        try:
            user = User.query.filter(User.username == data['username'] and User.password==data['password']).first()
            if user and bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
                session['user_id'] = user.id
                return jsonify(user.to_dict())
            else:
                return jsonify({"error": "Invalid username or password"}), 401
        except Exception as e:
            response_dict = {"error": f"{str(e)}"}
            return make_response(jsonify(response_dict), 500)
    
api.add_resource(Login, '/login', endpoint='/login')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return jsonify(user.to_dict())
        else:
            return jsonify({'message': '401: Not Authorized'}), 401 
            

api.add_resource(CheckSession, '/check_session')



class LogOut(Resource):
    def delete(self):
        try:
            session.pop('user_id', None)
            print(session)
            return make_response(jsonify({'message': 'Logged out'}), 204)
        except Exception as e:
            response_dict = {"error": f"error .{str(e)}"}
            return make_response(jsonify(response_dict), 500)        
        

api.add_resource(LogOut, '/logout')

class Users(Resource):
    def get(self):
        try:
            if 'user_id' in session:
                user_id=session['user_id']
                user=User.query.get(user_id)
                if user:
                    return make_response(user.to_dict(),200)
            return make_response('User not logged in',401)    
        
        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching users.{str(e)}"}
            return make_response(jsonify(response_dict), 500)
        
    def post(self):
        data = request.get_json()
        try:
            password = data.get('password').encode('utf-8')
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')

            new_user = User(
                username=data.get('username'),
                email=data.get("email"),
                password=hashed_password,
                profile_picture_url=data.get('profile_picture_url')
            )
            db.session.add(new_user)
            db.session.commit()

            response = make_response(
                new_user.to_dict(),
                201
            )
            return response

        except Exception as e:
            response_dict = {"error": f"{str(e)}"}
            return make_response(jsonify(response_dict), 403)    
        
api.add_resource(Users,'/users')
class UserByID(Resource):
    def get (self,id):
        try:
            user=User.query.filter_by(id=id).first()
            if user:
                user_dict=user.to_dict()
                return make_response(jsonify(user_dict),200)
            else:
                response_dict = {"error": "User not found"}
                return make_response(jsonify(response_dict), 404)

        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching user by ID.{str(e)}"}
            return make_response(jsonify(response_dict), 500)
        
    def patch(self,id):
        data = request.get_json()
        try:
            user= User.query.filter_by(id=id).first()
            if user:
                for attr in data:
                    setattr(user,attr,data.get(attr))
                db.session.add(user)
                db.session.commit()

                response_dict=user.to_dict()
                return make_response(jsonify(response_dict),200)   
            else:
                response_dict = {"error": "User not found"}
                return make_response(jsonify(response_dict), 404)

            
        except Exception as e:
            response_dict = {"error": f"{str(e)}"}
            return make_response(jsonify(response_dict), 500)  

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        try:
            if user:
                for message in user.messages:
                    db.session.delete(message)
                for post in user.posts:
                    db.session.delete(post)
                for comment in user.comments:
                    db.session.delete(comment)        
                db.session.delete(user)
                db.session.commit()

                return make_response('User deleted successfully', 204)
            else:
                response_dict = {"error": "User not found"}
                return make_response(jsonify(response_dict), 404)
            
        except Exception as e:
            response_dict = {"error": f"An error occurred while deleting the user: {str(e)}"}
            return make_response(jsonify(response_dict), 500)      
        
api.add_resource(UserByID,'/users/<int:id>')


# messaging routes
class Messages(Resource):
    def get(self):
        try:
            messages=Message.query.order_by(Message.created_at).all()
            message_dicts=[message.to_dict() for message in messages]
            return make_response(jsonify(message_dicts),200)
        
        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching messages: {str(e)}"}
            return make_response(jsonify(response_dict), 500)
        
    def post(self):
        data = request.get_json() 
        try:
            new_message=Message(
                text=data.get('text'),
                sender_id=data.get('sender_id'),
                recipient_id=data.get('recipient_id')
            ) 
            db.session.add(new_message)
            db.session.commit()
        
            response = make_response(
                new_message.to_dict(),
                201 
            )
            return response
        
        except Exception as e:
            response_dict = {"error" : f"{str(e)}"}
            return make_response(jsonify(response_dict), 403)    
        
api.add_resource(Messages,'/messages')

class MessageByID(Resource):
    def get (self,id):
        try:
            message=Message.query.filter_by(id=id).first()
            if message:
                message_dict=message.to_dict()
                return make_response(jsonify(message_dict),200)
            else:
                response_dict = {"error": "Message not found"}
                return make_response(jsonify(response_dict), 404)

        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching message by ID.{str(e)}"}
            return make_response(jsonify(response_dict), 500)
        
    def patch(self,id):
        data = request.get_json()
        try:
            message= Message.query.filter_by(id=id).first()
            if message:
                for attr in data:
                    setattr(message,attr,data.get(attr))
                db.session.add(message)
                db.session.commit()

                response_dict=message.to_dict()
                return make_response(jsonify(response_dict),200)   
            else:
                response_dict = {"error": "Message not found"}
                return make_response(jsonify(response_dict), 404)
            
        except Exception as e:
            response_dict = {"error": f"{str(e)}"}
            return make_response(jsonify(response_dict), 500)  

    def delete(self, id):
        message = Message.query.filter_by(id=id).first()
        try:
            if message:       
                db.session.delete(message)
                db.session.commit()

                return make_response('Message deleted successfully', 204)
            else:
                response_dict = {"error": "Message not found"}
                return make_response(jsonify(response_dict), 404)
            
        except Exception as e:
            response_dict = {"error": f"An error occurred while deleting the message: {str(e)}"}
            return make_response(jsonify(response_dict), 500)      
        
api.add_resource(MessageByID,'/messages/<int:id>')

class MessagesBetweenUsers(Resource):
    def get (self):
        try:
            sender_id=request.args.get('sender_id')
            recipient_id=request.args.get('recipient_id')

            messages=Message.query.filter(
                (Message.sender_id==sender_id) | (Message.recipient_id==sender_id),
                (Message.sender_id == recipient_id) | (Message.recipient_id == recipient_id)
            ).order_by(Message.created_at).all()

            message_dicts = [message.to_dict() for message in messages]
            return make_response(jsonify(message_dicts), 200)
        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching messages: {str(e)}"}
            return make_response(jsonify(response_dict), 500)
api.add_resource(MessagesBetweenUsers, '/messages_between_users')

class UsersWithMessages(Resource):
    def get(self):
        try:
            user_id = session.get('user_id')

            if user_id:
                messages = Message.query.filter(
                    (Message.sender_id == user_id) | (Message.recipient_id == user_id)
                ).all()

                user_ids = set()
                for message in messages:
                    if message.sender_id != user_id:
                        user_ids.add(message.sender_id)
                    if message.recipient_id != user_id:
                        user_ids.add(message.recipient_id)

                users = User.query.filter(User.id.in_(user_ids)).all()
                user_dicts = [user.to_dict() for user in users]

                return make_response(jsonify(user_dicts))  
            else:
                return make_response(jsonify({'message': 'Not authorized'}), 401)

        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching users with messages: {str(e)}"}
            return make_response(jsonify(response_dict), 500)

api.add_resource(UsersWithMessages, '/users_with_messages')


# post routes
class Posts(Resource):
    def get(self):
        try:
            posts = Post.query.order_by(desc(Post.created_at)).all()
            post_dicts=[post.to_dict() for post in posts]
            return make_response(jsonify(post_dicts),200)
        
        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching posts.{str(e)}"}
            return make_response(jsonify(response_dict), 500)
        
    def post(self):
        data = request.get_json()
        try:
            new_post=Post(
                caption=data.get('caption'),
                image_url=data.get('image_url'),
                likes=data.get('likes'),
                user_id=data.get('user_id')
            ) 
            db.session.add(new_post)
            db.session.commit()
        
            response = make_response(
                new_post.to_dict(),
                201 
            )
            return response
        
        except Exception as e:
            response_dict = {"error" : f"{str(e)}"}
            return make_response(jsonify(response_dict), 403)     
        
api.add_resource(Posts,'/posts') 

class PostByID(Resource):
    def get (self,id):
        try:
            post=Post.query.filter_by(id=id).first()
            if post:
                post_dict=post.to_dict()
                return make_response(jsonify(post_dict),200)
            else:
                response_dict = {"error": "Post not found"}
                return make_response(jsonify(response_dict), 404)

        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching post by ID.{str(e)}"}
            return make_response(jsonify(response_dict), 500)
        
    def patch(self,id):
        data = request.get_json()
        try:
            post= Post.query.filter_by(id=id).first()
            if post:
                for attr in data:
                    setattr(post,attr,data.get(attr))
                db.session.add(post)
                db.session.commit()

                response_dict=post.to_dict()
                return make_response(jsonify(response_dict),200)   
            else:
                response_dict = {"error": "Post not found"}
                return make_response(jsonify(response_dict), 404)
            
        except Exception as e:
            response_dict = {"error": f"{str(e)}"}
            return make_response(jsonify(response_dict), 500)  

    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        try:
            if post:       
                db.session.delete(post)
                db.session.commit()

                return make_response('Post deleted successfully', 204)
            else:
                response_dict = {"error": "post not found"}
                return make_response(jsonify(response_dict), 404)
            
        except Exception as e:
            response_dict = {"error": f"An error occurred while deleting the post: {str(e)}"}
            return make_response(jsonify(response_dict), 500)      
        
api.add_resource(PostByID,'/posts/<int:id>')


class Comments(Resource):
    def get(self):
        try:
            comments=Comment.query.all()
            comment_dicts=[comment.to_dict() for comment in comments]
            return make_response(jsonify(comment_dicts),200)
        
        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching comments.{str(e)}"}
            return make_response(jsonify(response_dict), 500)

    def post(self):
        data = request.get_json()
        try:
            new_comment=Comment(
                text=data.get('text'),
                post_id=data.get('post_id'),
                user_id=data.get('user_id')
            ) 
            db.session.add(new_comment)
            db.session.commit()
        
            response = make_response(
                new_comment.to_dict(),
                201 
            )
            return response
        
        except Exception as e:
            response_dict = {"error" : f"{str(e)}"}
            return make_response(jsonify(response_dict), 403)    

api.add_resource(Comments,'/comments')

class CommentByID(Resource):
    def get (self,id):
        try:
            comment=Comment.query.filter_by(id=id).first()
            if comment:
                comment_dict=comment.to_dict()
                return make_response(jsonify(comment_dict),200)
            else:
                response_dict = {"error": "comment not found"}
                return make_response(jsonify(response_dict), 404)

        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching comment by ID.{str(e)}"}
            return make_response(jsonify(response_dict), 500)
        
    def patch(self,id):
        data = request.get_json()
        try:
            comment= Comment.query.filter_by(id=id).first()
            if comment:
                for attr in data:
                    setattr(comment,attr,data.get(attr))
                db.session.add(comment)
                db.session.commit()

                response_dict=comment.to_dict()
                return make_response(jsonify(response_dict),200)   
            else:
                response_dict = {"error": "comment not found"}
                return make_response(jsonify(response_dict), 404)
            
        except Exception as e:
            response_dict = {"error": f"{str(e)}"}
            return make_response(jsonify(response_dict), 500)  

    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        try:
            if comment:       
                db.session.delete(comment)
                db.session.commit()
                return make_response('comment deleted successfully', 204)
            else:
                response_dict = {"error": "comment not found"}
                return make_response(jsonify(response_dict), 404)
            
        except Exception as e:
            response_dict = {"error": f"An error occurred while deleting the comment: {str(e)}"}
            return make_response(jsonify(response_dict), 500)      
        
api.add_resource(CommentByID,'/comments/<int:id>')


if __name__ == '__main__':
    app.run(port=5555,debug=True)