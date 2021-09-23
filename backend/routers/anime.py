from fastapi import Depends, status, HTTPException, APIRouter, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import schemas, models
from dependencies import get_db
import os
import shutil


router = APIRouter()

dest = r"C:\Users\Timavilla\Documents\myapp\coursework_it\backend\anime_image"


@router.post('/anime', status_code=status.HTTP_201_CREATED)
def create(request: schemas.Anime, db : Session = Depends(get_db)):
    new_anime = models.AnimeInDB(**request.dict())
    db.add(new_anime)
    db.commit()
    db.refresh(new_anime)
    return(new_anime)
     
@router.get('/anime', response_model=list[schemas.AnimeGet])
def show_all(db : Session = Depends(get_db)):
    animes = db.query(models.AnimeInDB).all()
    return animes

@router.get('/anime/{id}', response_model=schemas.AnimeGet)
def show(id, db : Session = Depends(get_db)):
    anime = db.query(models.AnimeInDB).filter(models.AnimeInDB.id == id).first()
    if not anime:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = 'not found')
    return anime

@router.get('/anime/{id}/image')
def get_image(id):
    return FileResponse(f"anime_image/{id}.jpg", media_type="image/jpeg")


@router.delete('/anime/{id}', status_code=status.HTTP_204_NO_CONTENT)
def delete(id, db : Session = Depends(get_db)):
    db.query(models.AnimeInDB).filter(models.AnimeInDB.id == id).delete(synchronize_session=False)
    db.commit()
    return {f'blog №{id} is deleted'}

@router.put('/anime/{id}')
def update(id, request: schemas.Anime, db : Session = Depends(get_db)):
    anime = db.query(models.AnimeInDB).filter(models.AnimeInDB.id == id)
    if not anime.first():
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = 'not found')
    anime.update(request.dict(), synchronize_session=False)
    db.commit()
    return {'updated'}

@router.post('/anime/{id}/image')
def upload_image( id, file: UploadFile = File(...)):
    with open(f"{id}.jpg", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    full_dest = os.path.join(dest, f"{id}.jpg")
    shutil.move(buffer.name, full_dest)
    return {"filename": f"{id}.jpg"}