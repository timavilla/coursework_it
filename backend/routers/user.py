from fastapi import Depends, status, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import schemas, models
from sqlalchemy.orm import Session
from dependencies import get_db, authenticate_user, get_current_user,  get_user, create_access_token, create_user

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 30

@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
        Проверяет правильность логина и пароля и в случае успеха возвращает токен с установленным временем истечения срока действия,
        иначе вернёт 401 UNAUTHORIZED
    """
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/users/", response_model=schemas.User)
def make_user(user: schemas.User, db: Session = Depends(get_db)):
    db_user = get_user(username=user.name, db=db)
    if db_user:
        raise HTTPException(status_code=400, detail="Name already registered")
    return create_user(user=user, db=db)


@router.get("/users/me", response_model=schemas.UserGet)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user