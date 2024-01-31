from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, aliased
from sqlalchemy import desc
from typing import List
from dependencies import get_db, get_current_user
from models import Friendship,Message, User
from schemas import User as UserSchema, UserWithMessage ,FriendshipCreate

router = APIRouter()

# Create new frienddhip
@router.post("/friends", response_model=FriendshipCreate, tags=["friends"],dependencies=[Depends(get_current_user)])
def create_friend(friend: FriendshipCreate, db: Session = Depends(get_db)):
    new_friend = Friendship(**friend.dict())

    db.add(new_friend)
    db.commit()
    db.refresh(new_friend)

    return new_friend



# friends with messages
@router.get("/friends/{user_id}", response_model=List[UserWithMessage], tags=["friends"], dependencies=[Depends(get_current_user)])
def get_user_friends_with_messages(user_id: int, db: Session = Depends(get_db)):
    # Check if the user with the given ID exists
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Retrieve friends from Friendship table
    friends = db.query(User).join(Friendship, Friendship.follower_id == User.id).filter(Friendship.following_id == user_id).all()
    followers = db.query(User).join(Friendship, Friendship.following_id == User.id).filter(Friendship.follower_id == user_id).all()

    # Combine both lists and remove duplicates to get all friends
    all_friends_set = set(friends + followers)
    all_friends = list(all_friends_set)

    # Get all messages for each friend from the logged-in user
    friends_with_messages = []
    for friend in all_friends:
        alias_sender = aliased(User)
        alias_receiver = aliased(User)
        messages = (
            db.query(Message)
            .join(alias_sender, Message.sender_id == alias_sender.id)
            .join(alias_receiver, Message.receiver_id == alias_receiver.id)
            .filter(
                (
                    (Message.sender_id == user_id) & (Message.receiver_id == friend.id)
                )
                | (
                    (Message.sender_id == friend.id) & (Message.receiver_id == user_id)
                )
            )
            .order_by(Message.created_at)
            .all()
        )
        friends_with_messages.append({"friend": friend, "messages": messages})

        # Sort friends based on the updated_at of their latest message
        friends_with_messages_sorted = sorted(
            friends_with_messages,
            key=lambda friend_with_messages: (
                max(
                    (msg.created_at or msg.updated_at for msg in friend_with_messages["messages"] if msg.receiver_id == friend_with_messages["friend"].id),
                    default=None,
                )
            ),
            reverse=True,
        )


    return friends_with_messages_sorted


# Delete Friendship
@router.delete("/friends/{friendship_id}", tags=["friends"],dependencies=[Depends(get_current_user)])
def delete_friendship(friendship_id: int, db: Session = Depends(get_db)):
    db_friendship = db.query(Friendship).filter(Friendship.id == friendship_id).first()
    if db_friendship is None:
        raise HTTPException(status_code=404, detail="Friendship not found")
    db.delete(db_friendship)
    db.commit()
    return {"message": "Friendship deleted"}



# add later 
#    #  Retrieve friends from Friendship table
#     friends = db.query(User).join(Friendship, Friendship.follower_id == User.id).filter(Friendship.following_id == user_id).all()
#     # friends = db.query(User).join(Friendship, Friendship.follower_id == User.id).filter(Friendship.following_id == user_id, Friendship.status == 'accepted').all()

#     # You can also include users who are following the logged-in user
#     followers = db.query(User).join(Friendship, Friendship.following_id == User.id).filter(Friendship.follower_id == user_id).all()
#     #followers = db.query(User).join(Friendship, Friendship.following_id == User.id).filter(Friendship.follower_id == user_id, Friendship.status == 'accepted').all()