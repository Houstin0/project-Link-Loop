from pydantic import BaseModel
from typing import List,Union, Optional
from datetime import datetime


class UserBase(BaseModel):
    id: int
    username: str
    email: str
    profile_picture: Optional[str] = None
    cover_photo: Optional[str] = None
    bio: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str
    userData: UserBase

class TokenData(BaseModel):
    username: str | None = None






class FriendshipBase(BaseModel):
    follower_id: int
    following_id: int
    status: Optional[str] = 'pending'

class FriendshipCreate(FriendshipBase):
    pass

class FriendshipUpdate(BaseModel):
    follower_id: Optional[int] =  None
    following_id: Optional[int] = None
    status: Optional[str] = 'pending'

class Friendship(FriendshipBase):
    id: Optional[int] = None
    follower: UserBase
    following: UserBase
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class LikeBase(BaseModel):
    liker_id: int
    post_id: int

class LikeCreate(LikeBase):
    pass

class LikeUpdate(BaseModel):
    liker_id: Optional[int] = None
    post_id: Optional[int] = None

class Like(LikeBase):
    id: Optional[int] = None
    liker: UserBase
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
        

class CommentBase(BaseModel):
    commenter_id: int
    post_id: int
    content: str

class CommentCreate(CommentBase):
    pass

class CommentUpdate(BaseModel):
    commenter_id: Optional[int] = None
    post_id: Optional[int] = None
    content: Optional[str] = None

class Comment(CommentBase):
    id: Optional[int] = None
    commenter: UserBase
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class NotificationBase(BaseModel):
    receiver_id: int
    content: str
    is_read: Optional[bool] = False

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(BaseModel):
    receiver_id: Optional[int] = None
    content: Optional[str] = None
    is_read: Optional[bool] = False

class Notification(NotificationBase):
    id: Optional[int] = None
    receiver: UserBase
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class MessageBase(BaseModel):
    sender_id: int
    receiver_id: int
    content: str
    is_read: Optional[bool] = False

class MessageCreate(MessageBase):
    pass

class MessageUpdate(BaseModel):
    sender_id: Optional[int] = None
    receiver_id: Optional[int] = None
    content: Optional[str] = None
    is_read: Optional[bool] = False

class Message(MessageBase):
    id: Optional[int] = None
    sender: UserBase
    receiver: UserBase
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserWithMessage(BaseModel):
    friend: UserBase
    messages: Optional[List[Message]]

    class Config:
        from_attributes = True       

class PostBase(BaseModel):
    owner_id: int
    image_url: str
    caption: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    image_url: Optional[str] = None
    caption: Optional[str] = None

 

class Post(PostBase):
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    owner: UserBase
    likes: List[Like] = []
    comments: List[Comment] = []

    class Config:
        from_attributes = True        



class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    profile_picture: Optional[str] = None
    cover_photo: Optional[str] = None
    bio: Optional[str] = None

class User(UserBase):
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    posts: List[Post] = []
    likes: List[Like] = []
    comments: List[Comment] = []
    notifications: List[Notification] = []
    friendships: List[Friendship] = []
    sent_messages: List[Message] = []
    received_messages: List[Message] = []

    class Config:
        from_attributes = True