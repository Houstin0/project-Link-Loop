from sqlalchemy import Boolean, Column, ForeignKey, Integer, Float, String,DateTime,func,delete
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):

    __tablename__="users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50),unique=True, nullable=False)
    email = Column(String(120),unique=True, nullable=False)
    password = Column(String(128), nullable=False)
    profile_picture = Column(String)
    cover_photo = Column(String)
    bio = Column(String)
    created_at =Column(DateTime, default=func.current_timestamp())
    updated_at = Column(DateTime, onupdate=func.current_timestamp())

    # Relationships
    posts = relationship('Post', back_populates='owner', lazy=True ,cascade='all, delete-orphan')
    likes = relationship('Like', back_populates='liker', lazy=True ,cascade='all, delete-orphan')
    comments = relationship('Comment', back_populates='commenter', lazy=True ,cascade='all, delete-orphan')
    notifications = relationship('Notification', back_populates='receiver', lazy=True ,cascade='all, delete-orphan')
    follower = relationship('Friendship',foreign_keys='Friendship.follower_id', back_populates='follower', lazy=True ,cascade='all, delete-orphan')
    following = relationship('Friendship',foreign_keys='Friendship.following_id', back_populates='following', lazy=True ,cascade='all, delete-orphan')
    sent_messages = relationship('Message', foreign_keys='Message.sender_id', back_populates='sender', lazy=True ,cascade='all, delete-orphan')
    received_messages = relationship('Message', foreign_keys='Message.receiver_id', back_populates='receiver', lazy=True ,cascade='all, delete-orphan')

    

class Post(Base):

    __tablename__="posts"

    id = Column(Integer, primary_key=True)
    image_url= Column(String,nullable=False)
    caption= Column(String)
    created_at =Column(DateTime, default=func.current_timestamp())
    updated_at = Column(DateTime, onupdate=func.current_timestamp())

    owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    owner=relationship('User',back_populates='posts')
    
    # Relationships
    likes = relationship('Like', back_populates='post', lazy=True ,cascade='all, delete-orphan')
    comments = relationship('Comment', back_populates='post', lazy=True ,cascade='all, delete-orphan')

    

class Friendship(Base):
    __tablename__="friendships"

    id = Column(Integer, primary_key=True)
    status = Column(String(20), default='pending')
    created_at =Column(DateTime, default=func.current_timestamp())
    updated_at = Column(DateTime, onupdate=func.current_timestamp())

    follower_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    follower = relationship('User', back_populates='follower', foreign_keys=[follower_id])
    following_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    following = relationship('User', back_populates='following', foreign_keys=[following_id])

   
    

class Like(Base):

    __tablename__="likes"

    id = Column(Integer, primary_key=True)
    created_at =Column(DateTime, default=func.current_timestamp())
    updated_at = Column(DateTime, onupdate=func.current_timestamp())

    liker_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    liker=relationship('User',back_populates='likes')
    post_id = Column(Integer, ForeignKey('posts.id'), nullable=False)
    post=relationship('Post',back_populates='likes')

  

class Comment(Base):

    __tablename__="comments"

    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)
    created_at =Column(DateTime, default=func.current_timestamp())
    updated_at = Column(DateTime, onupdate=func.current_timestamp())

    commenter_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    commenter=relationship('User',back_populates='comments')
    post_id = Column(Integer, ForeignKey('posts.id'), nullable=False)
    post=relationship('Post',back_populates='comments')

   

class Notification(Base):

    __tablename__="notifications"

    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at =Column(DateTime, default=func.current_timestamp())
    updated_at = Column(DateTime, onupdate=func.current_timestamp())

    receiver_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    receiver=relationship('User',back_populates='notifications')



class Message(Base):

    __tablename__="messages"

    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at =Column(DateTime, default=func.current_timestamp())
    updated_at = Column(DateTime, onupdate=func.current_timestamp())

    sender_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    sender = relationship('User', back_populates='sent_messages', foreign_keys=[sender_id])
    receiver_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    receiver = relationship('User', back_populates='received_messages', foreign_keys=[receiver_id])