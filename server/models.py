from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

db=SQLAlchemy()

class User(db.Model,SerializerMixin):
    __tablename__='users'

    serialize_rules=()

    id= db.Column(db.Integer,primary_key=True)
    username= db.Column(db.String,nullable=False,unique=True)
    email= db.Column(db.String,unique=True)
    password= db.Column(db.String)

class Post(db.Model,SerializerMixin):
    __tablename__='posts'

    serialize_rules=()

    id=db.Column(db.Integer,primary_key=True) 
    image_url= db.Column(db.String)
    caption= db.Column(db.String)
    likes= db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id= db.Column(db.Integer,db.ForeignKey('users.id'))  

class Message(db.Model,SerializerMixin):
    __tablename__='messages'

    serialize_rules=()

    id= db.Column(db.Integer,primary_key=True)
    text= db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    sender_id= db.Column(db.Integer,db.ForeignKey('users.id'))
    recipient_id=db.Column(db.Integer)

class Comment(db.Model,SerializerMixin):
    __tablename__='comments'

    serialize_rules=()

    id= db.Column(db.Integer,primary_key=True)
    text= db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    user_id= db.Column(db.Integer,db.ForeignKey('users.id'))
    post_id= db.Column(db.Integer,db.ForeignKey('posts.id'))


