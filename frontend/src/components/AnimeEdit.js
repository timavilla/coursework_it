import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../context/UserContext"
import axios from 'axios'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';



const AnimeEdit = ({anime, flag, empty}) => {
    const [token] = useContext(UserContext);
    const [info, setInfo] = useState(
        {
         status: anime.status,
         source: anime.source,
         title_en: anime.title_en,
         title_ru: anime.title_ru,
         episodes: anime.episodes,
         rating: anime.rating,
         description: anime.description
        }
    )
    
    
    const [open, setOpen] = useState(false);
   
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
   

    let axiosConfig = {
        headers: {Authorization: `Bearer ${token}`}
    }
    
    async function updateAnime(anime) {
      await axios.put('http://localhost:8000/anime/' + anime.id, info, axiosConfig)
      
    }

    async function createAnime() {
      await axios.post('http://localhost:8000/anime/', info, axiosConfig)
    }

    async function removeAnime(anime) {
        await axios.delete('http://localhost:8000/anime/' + anime.id, { headers: { Authorization: `Bearer ${token}` } })
    }

    async function uploadImage(anime, data) {
      axios.post(`http://localhost:8000/anime/${anime.id}/image`, data, axiosConfig)
    }

    const handleChange = (e, field) => {
        
        setInfo({...info, [field]: e.target.value})
        
    }

    const handleSave = () => {
       if (empty == true) {
        
        createAnime()
       }
       else {
        updateAnime(anime)
       }
        flag()
    }

    const handleRemove = () => {
        removeAnime(anime)
    }


    const handleUpload = (e) => {
      let formdata = new FormData()
      formdata.append('file', e.target.files[0])
      uploadImage(anime, formdata)
      flag()
    }

    const useStyles = makeStyles((theme) => ({
      input: {
        display: 'none',
      },
    }));

    const classes = useStyles();
    
    return (
        <div>
        {empty ? (
          <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
            <AddIcon/>
          </IconButton>) : 
          (<IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
            <EditIcon/>
           </IconButton>
            
          )
          }
          
        
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Редактирование</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <FormControl>
                    <Select value= {anime.status} onChange = {e => handleChange(e, 'status')}> 
                        
                        <MenuItem value="Онгоинг">Онгоинг</MenuItem>
                        <MenuItem value="Вышло">Вышло</MenuItem>
                        <MenuItem value="Анонсировано">Анонсировано</MenuItem> 
                    </Select>
                <FormHelperText>Статус</FormHelperText>
            </FormControl>
            <DialogContentText>
            
          </DialogContentText>
            <FormControl>
                    <Select value= {anime.source} onChange = {e => handleChange(e, 'source')}> 
                        
                        <MenuItem value="Манга">Манга</MenuItem>
                        <MenuItem value="Ранобэ">Ранобэ</MenuItem>
                        <MenuItem value="Игра">Игра</MenuItem>
                        <MenuItem value="Оригинал">Оригинал</MenuItem>
                    </Select>
                <FormHelperText>Источник</FormHelperText>
            </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="title_en"
            defaultValue={anime.title_en}
            onChange = {e => handleChange(e, 'title_en')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="title_ru"
            defaultValue={anime.title_ru}
            onChange = {e => handleChange(e, 'title_ru')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="episodes"
            defaultValue={anime.episodes}
            onChange = {e => handleChange(e, 'episodes')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="rating"
            defaultValue={anime.rating}
            onChange = {e => handleChange(e, 'rating')}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="description"
            multiline
            defaultValue={anime.description}
            onChange = {e => handleChange(e, 'description')}
            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleRemove}> 
            <DeleteIcon/> 
          </IconButton>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange = {e => handleUpload(e)}
          />
          <label htmlFor="contained-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <Button onClick={handleClose} color="primary">
            Назад
          </Button>
          <Button onClick={handleSave} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
}

export default AnimeEdit
