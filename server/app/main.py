from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routes import users,login,posts,messages,comments,friends

app = FastAPI(docs_url="/")

Base.metadata.create_all(bind=engine)

# @app.get("/")
# def read_root():
#     return {"Hello": "Welcome to Link Loop backend"}

app.include_router(login.router)
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(friends.router)
app.include_router(messages.router)
app.include_router(comments.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=True)