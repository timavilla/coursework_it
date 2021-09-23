from pydantic import BaseModel
from typing import Optional

from sqlalchemy.sql.expression import false

class Anime(BaseModel):
    title_en: str
    title_ru: str
    status: str
    source: str
    episodes: int
    rating: Optional[float] = None
    description: str
    

    class Config:
        orm_mode = True  

class AnimeGet(Anime):
    id: int

    class Config:
        orm_mode = True

class WatchList(BaseModel):
    status: Optional[str] = None
    rating: Optional[int] = None
    current_episodes: Optional[int] = 0
    anime_id: int = None
    user_id: int
    
    class Config:
        orm_mode = True

class WatchListUpdate(BaseModel):
    status: Optional[str] = None
    rating: Optional[int] = None
    current_episodes: Optional[int] = 0

    class Config:
        orm_mode = True

class WatchListCreate(BaseModel):
    anime_id: int = None
     
    class Config:
        orm_mode = True

class User(BaseModel):
    name: str
    password: str
    admin: Optional[bool] = False
    class Config:
        orm_mode = True

class UserGet(BaseModel):
    name: str
    admin: Optional[bool] = False
    class Config:
        orm_mode = True

class Token(BaseModel): # Модель для response /token
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None