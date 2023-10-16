from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

db=SQLAlchemy()

class User(db.Model,SerializerMixin):
    __tablename__='users'

    serialize_rules=('-messages','-posts','-comments',)

    id= db.Column(db.Integer,primary_key=True)
    profile_picture_url=db.Column(db.String)
    username= db.Column(db.String,nullable=False,unique=True)
    email= db.Column(db.String,unique=True)
    password= db.Column(db.String)
    # messages = db.relationship('Message', back_populates='user')
    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    messages = db.relationship('Message', foreign_keys="Message.sender_id", back_populates='user')

    def __repr__(self):
        return f"(id={self.id}, username={self.username}, email= {self.email}, profile_picture_url={self.profile_picture_url})"
    
    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError("Email must contain '@' symbol")
        return email

    @validates('username')
    def validate_username(self, key, username):
        if ' ' in username:
            raise ValueError("Username should not contain spaces")
        return username

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 8:
            raise ValueError("Password should be at least 8 characters long")
        return password

class Message(db.Model,SerializerMixin):
    __tablename__='messages'

    serialize_rules=('-user',)

    id= db.Column(db.Integer,primary_key=True)
    text= db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    sender_id= db.Column(db.Integer,db.ForeignKey('users.id'))
    recipient_id=db.Column(db.Integer,db.ForeignKey('users.id'))

    user = db.relationship('User', foreign_keys="Message.sender_id", back_populates='messages')
 

    def __repr__(self):
        return f"id={self.id}, text={self.text} , created_at={self.created_at} , sender_id={self.sender_id}, recipient_id={self.recipient_id}"

   

class Post(db.Model,SerializerMixin):
    __tablename__='posts'

    serialize_rules=('user','-comments',)

    id=db.Column(db.Integer,primary_key=True) 
    image_url= db.Column(db.String)
    caption= db.Column(db.String)
    likes= db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id= db.Column(db.Integer,db.ForeignKey('users.id'))  
    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='posts')

    def __repr__(self):
        return f"id={self.id}, image_url={self.image_url},caption={self.caption},likes={self.likes},created_at={self.created_at},updated_at={self.updated_at},user_id={self.user_id}"
   


class Comment(db.Model,SerializerMixin):
    __tablename__='comments'

    serialize_rules=('user','posts',)

    id= db.Column(db.Integer,primary_key=True)
    text= db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id= db.Column(db.Integer,db.ForeignKey('users.id'))
    post_id= db.Column(db.Integer,db.ForeignKey('posts.id'))

    user = db.relationship('User', back_populates='comments')
    posts = db.relationship('Post',back_populates='comments')


    def __repr__(self):
        return f"id={self.id}, text={self.text},created_at={self.created_at}, updated_at={self.updated_at},user_id={self.user_id},post_id={self.post_id}"
    
class Follower(db.Model,SerializerMixin):
    __tablename__ = 'followers'
    serialize_rules=()
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    


