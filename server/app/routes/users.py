from fastapi import APIRouter, Depends, HTTPException,status
from sqlalchemy.orm import Session
from app.dependencies import get_db,get_password_hash,get_current_user
from app.models import User
from app.schemas import User as UserSchema,UserUpdate ,UserCreate
from typing import List

router = APIRouter()
    
# User registration
@router.post("/register", response_model=UserCreate)
def register_user(user: UserCreate, db: Session = Depends(get_db)):

    # Check if username already exists
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    # Check if email already exists
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    

    # Create a new user
    new_user = User(
        username=user.username,
        email=user.email,
        profile_picture=user.profile_picture
    )
    new_user.password=get_password_hash(user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# Get all users
@router.get("/users", response_model=List[UserSchema], tags=["users"])
def read_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

# Get user by ID
@router.get("/users/{user_id}", response_model=UserSchema, tags=["users"],dependencies=[Depends(get_current_user)])
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

#   Update user
@router.put("/users/{user_id}", response_model=UserUpdate, tags=["users"],dependencies=[Depends(get_current_user)])
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    for field, value in user.dict().items():
        if field == "password" and value is not None:
            hashed_password = get_password_hash(user.password)
            setattr(db_user, field, hashed_password)
        elif value is not None:
            setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

# Delete user
@router.delete("/users/{user_id}", tags=["users"],dependencies=[Depends(get_current_user)])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted"} 