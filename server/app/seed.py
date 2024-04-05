from main import app
from database import SessionLocal
from sqlalchemy.orm import Session
from models import User,Post,Message,Comment,Friendship,Like,Notification
import random
from faker import Faker
from dependencies import get_password_hash

fake = Faker()

def delete_existing_data(db: Session):
    db.query(User).delete()
    db.query(Post).delete()
    db.query(Message).delete()
    db.query(Comment).delete()
    db.query(Friendship).delete()
    db.query(Like).delete()
    db.query(Notification).delete()
    db.commit()



profile_picture_urls=["https://i.pinimg.com/236x/9a/dd/9e/9add9e992ea4ceff5beaf6bc3ecede1e.jpg",
                         "https://i.pinimg.com/236x/9e/19/5f/9e195f071e0c2d18cc61d903d8043669.jpg",
                         "https://i.pinimg.com/236x/a0/33/21/a03321ad0f9020ed6f0ff389548bbcc0.jpg",
                         "https://i.pinimg.com/236x/cd/df/aa/cddfaac6e5243036f2e250f7c4938bb0.jpg",
                         "https://i.pinimg.com/236x/58/e1/eb/58e1ebff225cff925604b62c7e4392c3.jpg",
                         ]
post_pics=["https://i.pinimg.com/236x/5d/86/cf/5d86cf1e68a1d4c30b17fb032c53ec59.jpg",
               "https://i.pinimg.com/236x/22/b8/4e/22b84ea0eb65f205e60d3aa452dc756f.jpg",
               "https://i.pinimg.com/236x/04/b7/29/04b72915e049e50811f986e56206aef5.jpg",
               "https://i.pinimg.com/236x/5b/be/f5/5bbef54093ec2aa22be380b96618b094.jpg",
               "https://i.pinimg.com/474x/6a/e6/69/6ae66913b48ddc94c6042707c4eb0125.jpg",
               "https://i.pinimg.com/236x/bd/b5/5e/bdb55e274fe338147f3d5d00d96ba542.jpg",
               "https://i.pinimg.com/236x/8f/11/c7/8f11c7f638e9f15937010cc13cd46ea0.jpg",
               "https://i.pinimg.com/236x/79/4e/40/794e40bee360043cea6b485209d64fc7.jpg",
               "https://i.pinimg.com/236x/dd/dc/13/dddc130b293b9a1710f8e03e825d73a6.jpg",
               "https://i.pinimg.com/236x/b7/6a/33/b76a331b45f5988282e5427f903b056d.jpg",
               "https://i.pinimg.com/236x/a4/13/6f/a4136f527e1997b3567f99a603ed2ce4.jpg",
               "https://i.pinimg.com/236x/db/ab/ed/dbabed33fa4894be42dcb6d43403101e.jpg",
               "https://i.pinimg.com/236x/c6/85/cb/c685cb268668ba6781ec28cd82059db8.jpg",
               "https://i.pinimg.com/236x/21/9a/a6/219aa678f0d86677711d80a986d76df4.jpg",
               "https://i.pinimg.com/236x/66/67/76/66677699c8b040dbf10132a2d8158fcb.jpg",
               "https://i.pinimg.com/236x/45/8d/47/458d47d3ff5e1943f7cc7fb06b37d654.jpg",
               "https://i.pinimg.com/236x/35/8f/35/358f35aae9a4e34b0d23fcbabb496f15.jpg",
               "https://i.pinimg.com/236x/0d/a8/0b/0da80bcf14e94b148a6746766039328c.jpg",
               "https://i.pinimg.com/236x/78/1a/d2/781ad214237f7d4c6e4742037628c183.jpg",
               "https://i.pinimg.com/236x/77/36/3b/77363bdc9cb02d775bbaba7e409010fe.jpg",
               "https://i.pinimg.com/236x/32/eb/ca/32ebcaf2f4a5d73a10cda655ae19817e.jpg",
               "https://i.pinimg.com/236x/1e/7f/ac/1e7facee7cb729e1542ed69e144e6e57.jpg",
               "https://i.pinimg.com/236x/91/33/ca/9133cad615af0dd04b515c6e3b90d00a.jpg",
               "https://i.pinimg.com/236x/b7/d5/4c/b7d54cbc102493c40a279a5902eeae5a.jpg",
               "https://i.pinimg.com/236x/97/bf/53/97bf53601f15310119ebf93662845a83.jpg"]
    

usernames=["houstin","herbo","mr.plug","nicole" , "peter","john","mary","terry"]


        
def create_users(db:Session):    
    print("seeding Users")
    for username in usernames:
        new_user = User(
            username=username,
            password=get_password_hash("password"), 
            profile_picture=random.choice(profile_picture_urls),
            email=f'{username}@mail.com',
            bio=fake.sentence()
        )
        db.add(new_user)
    db.commit()

def create_friendships(db:Session): 
    print("seeding Friendship")
    users = db.query(User).all()
    for user in users:
        for friend in users:
            friendship=Friendship(
                follower_id=user.id,
                following_id=friend.id
            )
            db.add(friendship)
    db.commit()        
 
    
def create_posts(db:Session):     
    print("seeding posts")
    for user in db.query(User).all():
        for post in post_pics:
            new_post=Post(
                caption=fake.sentence(),
                image_url=post,
                owner_id=user.id
            )
            db.add(new_post)
    db.commit()  

  
def create_likes(db:Session):     
    print("seeding Likes")
    for post in db.query(Post).all():
        for user in db.query(User).all():
            new_like=Like(
                liker_id=user.id,
                post_id=post.id
            )
            db.add(new_like)
    db.commit()        

  
def create_comments(db:Session):         
    print("seeding comments")
    for post in db.query(Post).all():
        for user in db.query(User).all():
            new_comment=Comment(
                content=fake.sentence(),
                post_id=post.id,
                commenter_id=user.id
            )
            db.add(new_comment)
        db.commit()  

def create_messages(db:Session):
    print("seeding messages")     
    for user in db.query(User).all():
        for recipient in db.query(User).all():
            new_message=Message(
                content=fake.sentence(),
                sender_id=user.id,
                receiver_id=recipient.id
            )
            db.add(new_message)
        db.commit()

   
def create_notifications(db:Session):         
    print("seeding notifications")
    for user in db.query(User).all():
        new_notification=Notification(
            receiver_id=user.id,
            content=fake.text()
        ) 
        db.add(new_notification)
    db.commit()              

if __name__ == "__main__":
    db = SessionLocal()

    delete_existing_data(db)
    create_users(db)
    create_friendships(db)
    create_posts(db)
    create_comments(db)
    create_likes(db)
    create_notifications(db)
    create_messages(db)

    db.close()

print("seeded")    