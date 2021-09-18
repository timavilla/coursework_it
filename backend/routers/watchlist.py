from models import AnimeInDB
from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
import schemas, models
from dependencies import get_db, get_current_user


router = APIRouter()

@router.delete('/watchlist/{id}')
def delete(id, db : Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    db.query(models.WatchListInDB).filter(models.WatchListInDB.user_id == current_user.id, models.WatchListInDB.id == id).delete(synchronize_session=False)
    db.commit()
    return {}

@router.post('/watchlist')
def create(request: schemas.WatchListCreate, db : Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    new_anime = models.WatchListInDB(**request.dict(), user_id = current_user.id)
    db.add(new_anime)
    db.commit()
    db.refresh(new_anime)
    return(new_anime)
    
@router.get('/watchlist')
def show_all(db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    animes = db.query(models.WatchListInDB, models.AnimeInDB.title_en).join(AnimeInDB).filter(models.WatchListInDB.user_id == current_user.id).all()
    return animes

@router.put('/watchlist/{id}')
def update(id, request: schemas.WatchListUpdate, db : Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    anime = db.query(models.WatchListInDB).filter(models.WatchListInDB.user_id == current_user.id, models.WatchListInDB.id == id)
    if not anime.first():
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = f'not found')
    anime.update(request.dict(), synchronize_session=False)
    db.commit()