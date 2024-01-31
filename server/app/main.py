from fastapi import FastAPI
from database import engine
from models import Base
from routes import users,login,posts,messages,comments,friends

app=FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"Hello": "Welcome to Link Loop backend"}

app.include_router(login.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(friends.router)
app.include_router(messages.router)
app.include_router(comments.router)