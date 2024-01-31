from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db,get_current_user
from typing import List
from models import Message
from schemas import Message as MessageSchema, MessageUpdate,MessageCreate

router = APIRouter()


# Create new message
@router.post("/messages", response_model=MessageCreate, tags=["messages"],dependencies=[Depends(get_current_user)])
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    new_message = Message(**message.dict())

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message

#Get all messages
@router.get("/messages",response_model=List[MessageSchema],tags=["messages"],dependencies=[Depends(get_current_user)])
def read_all_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).order_by(Message.created_at).all()
    return messages

# Get message by Id
@router.get("/messages/{message_id}",response_model=MessageSchema,tags=["messages"],dependencies=[Depends(get_current_user)])
def read_message(message_id: int, db: Session = Depends(get_db)):
    message = db.query(Message).filter(Message.id == message_id).first()
    if message is None:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

#  Update message
@router.put("/messages/{message_id}", response_model=MessageUpdate, tags=["messages"],dependencies=[Depends(get_current_user)])
def update_message(message_id: int, message_update: MessageUpdate, db: Session = Depends(get_db)):
    db_message = db.query(Message).filter(Message.id ==message_id).first()
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")

    for field, value in message_update.dict().items():
        if value is not None:
            setattr(db_message, field, value)

    db.commit()
    db.refresh(db_message)
    return db_message

# Delete message
@router.delete("/messages/{message_id}",tags=["messages"],dependencies=[Depends(get_current_user)])
def delete_message(message_id: int, db: Session = Depends(get_db)):
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if db_message is None:
        raise HTTPException(status_code=404, detail="Message not found")

    db.delete(db_message)
    db.commit()

    return {"message": "Message deleted"}