
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from routers import anime, watchlist, user


import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



models.Base.metadata.create_all(engine)

app.include_router(anime.router)
app.include_router(watchlist.router)
app.include_router(user.router)







