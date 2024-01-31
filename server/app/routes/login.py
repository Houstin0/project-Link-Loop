from fastapi import APIRouter, Depends, HTTPException,status
from app.models import User
from app.schemas import User as UserSchema,Token
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app.database import SessionLocal
from app.dependencies import authenticate_user,create_access_token,get_current_user

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 6000

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(SessionLocal(), form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer",
            "userData": user}    

# User login
@router.post("/login")
def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(SessionLocal(), form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer", 
        "userData": user}

# Get current user
@router.get("/users/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user   