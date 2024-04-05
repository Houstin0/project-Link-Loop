from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db,get_current_user
from typing import List
from models import Comment
from schemas import Comment as CommentSchema, CommentUpdate,CommentCreate

router = APIRouter()


# Create new Comment
@router.post("/comments", response_model=CommentCreate, tags=["comments"],dependencies=[Depends(get_current_user)])
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    new_comment = Comment(**comment.dict())

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment

#Get all comments
@router.get("/comments",response_model=List[CommentSchema],tags=["comments"],dependencies=[Depends(get_current_user)])
def read_all_comments(db: Session = Depends(get_db)):
    comments = db.query(Comment).all()
    return comments

# Get comment by Id
@router.get("/comments/{comment_id}",response_model=CommentSchema,tags=["comments"],dependencies=[Depends(get_current_user)])
def read_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

#  Update comment
@router.put("/comments/{comment_id}", response_model=CommentUpdate, tags=["comments"],dependencies=[Depends(get_current_user)])
def update_comment(comment_id: int, comment_update: CommentUpdate, db: Session = Depends(get_db)):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")

    for field, value in comment_update.dict().items():
        if value is not None:
            setattr(db_comment, field, value)

    db.commit()
    db.refresh(db_comment)
    return db_comment

# Delete comment
@router.delete("/comments/{comment_id}",tags=["comments"],dependencies=[Depends(get_current_user)])
def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")

    db.delete(db_comment)
    db.commit()

    return {"message": "Comment deleted"}