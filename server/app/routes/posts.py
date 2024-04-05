from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from dependencies import get_db,get_current_user
from typing import List
from models import Post
from schemas import Post as PostSchema, PostUpdate,PostCreate
from sqlalchemy import desc
import shutil

router = APIRouter()


# Create new post
# @router.post("/posts", response_model=PostCreate, tags=["posts"],dependencies=[Depends(get_current_user)])
# def create_post(post: PostCreate,file: UploadFile = File(...), db: Session = Depends(get_db)):
#     # Save the uploaded file to a location on the server
#     file_path = f"uploads/{file.filename}"
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)
 
#     # Create a new post with the file path
#     new_post = Post(**post.dict(), image_url=file_path)

#     db.add(new_post)
#     db.commit()
#     db.refresh(new_post)

#     return new_post

@router.post("/posts", response_model=PostCreate, tags=["posts"],dependencies=[Depends(get_current_user)])
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    new_post = Post(**post.dict())

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post

#Get all posts
@router.get("/posts",response_model=List[PostSchema],tags=["posts"],dependencies=[Depends(get_current_user)])
def read_all_posts(db: Session = Depends(get_db)):
    posts = db.query(Post).order_by(desc(Post.created_at)).all()
    return posts

# Get post by Id
@router.get("/posts/{post_id}",response_model=PostSchema,tags=["posts"],dependencies=[Depends(get_current_user)])
def read_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

#  Update post
@router.put("/posts/{post_id}", response_model=PostUpdate, tags=["posts"],dependencies=[Depends(get_current_user)])
def update_post(post_id: int, post_update: PostUpdate, db: Session = Depends(get_db)):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    for field, value in post_update.dict().items():
        if value is not None:
            setattr(db_post, field, value)

    db.commit()
    db.refresh(db_post)
    return db_post

# Delete post
@router.delete("/posts/{post_id}",tags=["posts"],dependencies=[Depends(get_current_user)])
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")

    db.delete(db_post)
    db.commit()

    return {"message": "Post deleted"}