from database import SessionLocal
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import schemas, models
from sqlalchemy.orm import Session


def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally: db.close()





oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "929f94911e934c03365d1129b52f7d2174fda056735b789938cbf58222241317"
ALGORITHM = "HS256"


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(username: str, db: Session = Depends(get_db)):
    user = db.query(models.UserInDB).filter(models.UserInDB.name == username).first()
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """ Создаёт jwt токен где в полезной информации находятся имя пользователя и время истечения срока действия """ 

    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print(encoded_jwt)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """ 
        функция получает токен, декодирует его, проверяет и возвращает текущего пользователя в случае успеха, иначе вернет HTTP исключение
        token: str = Depends(oauth2_scheme) - эта зависимость обеспечит строку, которой присваевается параметр token рута
        она посмотрит в заголовок Authorization запроса, и если значение = bearer + token, она вернёт token в качестве строки,
        иначе если такого заголовка нет или значение не bearer + token вернёт 401 UNAUTHORIZED
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(token_data.username, db)
    if user is None:
        raise credentials_exception
    return user

def create_user(db: Session, user: schemas.User):
    hashed_password = get_password_hash(user.password)
    db_user = models.UserInDB(name=user.name, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
    


def authenticate_user(username: str, password: str, db: Session = Depends(get_db)):
    """ Проверяет соответствие имени и пароля с базой данных """

    user = get_user(username, db)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


