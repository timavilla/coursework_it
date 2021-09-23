from typing import Text
from sqlalchemy.sql import expression

from sqlalchemy.sql.sqltypes import Float
from sqlalchemy.types import Text
from database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

class AnimeInDB(Base):
    __tablename__ = "anime"
    id = Column(Integer, primary_key=True, index=True)
    title_en = Column(String)
    title_ru = Column(String)
    status = Column(String)
    source = Column(String)
    episodes = Column(Integer)
    rating = Column(Float)
    description = Column(Text)
    

class WatchListInDB(Base):
    __tablename__ = "watchlists"
    id = Column(Integer, primary_key=True, index=True)
    status = Column(String)
    rating = Column(Integer)
    current_episodes = Column(Integer)
    anime_id = Column(Integer, ForeignKey('anime.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    
    anime = relationship("AnimeInDB")
    user = relationship("UserInDB")
    



class UserInDB(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    password = Column(String)
    admin = Column(Boolean, default=True)
