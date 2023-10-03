from app import app
from models import db,User,Post,Message,Comment
import random
from faker import Faker

fake = Faker()

with app.app_context():

    User.query.delete()
    Post.query.delete()
    Message.query.delete()
    Comment.query.delete()


    for user in range(20):
        new_user=User(
            username=fake.unique.first_name(),
            password=fake.word()
        )
        new_user.email = f'{new_user.username}@mail.com'
        db.session.add(new_user)
    db.session.commit()    

    for user in User.query.all():
        for i in range(5):
            new_message=Message(
                text=fake.sentence(),
                sender_id=user.id
            )
            db.session.add(new_message)
        db.session.commit()  

    for user in User.query.all():
        for i in range(2):
            new_post=Post(
                caption=fake.sentence(),
                image_url=fake.image_url(),
                likes=random.randint(1,90),
                user_id=user.id
            )
            db.session.add(new_post)
        db.session.commit()   

    for post in Post.query.all():
        for user in User.query.all():
            new_comment=Comment(
                text=fake.sentence(),
                post_id=post.id,
                user_id=user.id
            )
            db.session.add(new_comment)
        db.session.commit()    