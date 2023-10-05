from flask import Flask, make_response,jsonify,request
from flask_migrate import Migrate
from flask_restful import Resource,Api
from models import db,User,Post,Message,Comment

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///link_loop.db'

migrate=Migrate(app,db)

db.init_app(app)

api=Api(app)

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

class Users(Resource):
    def get(self):
        try:
            users=User.query.all()
            user_dicts=[user.to_dict() for user in users]
            return make_response(jsonify(user_dicts),200)
        
        except Exception as e:
            response_dict = {"error": f"An error occurred while fetching users.{str(e)}"}
            return make_response(jsonify(response_dict), 500)
        
    def post(self):
        data = request.get_json()
        try:
            new_user=User(
                username=data.get('username'),
                email= data.get("email"),
                password= data.get("password"),
            ) 
            db.session.add(new_user)
            db.session.commit()
        
            response = make_response(
                new_user.to_dict(),
                201 
            )
            return response
        
        except Exception as e:
            response_dict = {"error" : f"{str(e)}"}
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



class Posts(Resource):
    def get(self):
        try:
            posts=Post.query.all()
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


if __name__ == '__main__':
    app.run(port=5555,debug=True)