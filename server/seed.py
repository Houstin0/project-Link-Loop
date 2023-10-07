from app import app
from models import db,User,Post,Message,Comment
import random
from faker import Faker

fake = Faker()

with app.app_context():

    # User.query.delete()
    Post.query.delete()
    Message.query.delete()
    Comment.query.delete()
    db.session.commit()


    profile_picture_urls=["https://i.pinimg.com/236x/9a/dd/9e/9add9e992ea4ceff5beaf6bc3ecede1e.jpg",
                         "https://i.pinimg.com/236x/9e/19/5f/9e195f071e0c2d18cc61d903d8043669.jpg",
                         "https://i.pinimg.com/236x/a0/33/21/a03321ad0f9020ed6f0ff389548bbcc0.jpg",
                         "https://i.pinimg.com/236x/cd/df/aa/cddfaac6e5243036f2e250f7c4938bb0.jpg",
                         "https://i.pinimg.com/236x/58/e1/eb/58e1ebff225cff925604b62c7e4392c3.jpg",

                         "https://i.pinimg.com/236x/d6/f0/88/d6f08822c415c51f13d967f7ab5343e9.jpg",
                         "https://i.pinimg.com/236x/d5/e9/0f/d5e90ff56f7e3db5ddea648b26647d2d.jpg",
                         "https://i.pinimg.com/236x/bf/a4/7f/bfa47f703fbdd16b2ce2d7013b07371b.jpg",
                         "https://i.pinimg.com/236x/4a/4a/4a/4a4a4a7f4faa32b85cbc4e9f60700c30.jpg",
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
    
    passwords=["killcode"]


    # for picture in profile_picture_urls:
    #     new_user=User(
    #         username=fake.unique.first_name(),
    #         password=random.choice(passwords),
    #         profile_picture_url=picture

    #     )
    #     new_user.email = f'{new_user.username}@mail.com'
    #     db.session.add(new_user)
    # db.session.commit()  

    for user in User.query.all():
        for recipient in User.query.all():
            new_message=Message(
                text=fake.sentence(),
                sender_id=user.id,
                recipient_id=recipient.id
            )
            db.session.add(new_message)
        db.session.commit() 
        


    for user in User.query.all():
        for post in post_pics:
            new_post=Post(
                caption=fake.sentence(),
                image_url=post,
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