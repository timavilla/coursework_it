import { useHistory } from "react-router-dom"
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../context/UserContext"
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';





const WatchListEdit = ({entry, remove, flag}) => {
    const router = useHistory()
    const [token] = useContext(UserContext);
    const [info, setInfo] = useState(
        {
         status: entry.WatchListInDB.status,
         rating: entry.WatchListInDB.rating,
         current_episodes: entry.WatchListInDB.current_episodes
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
    
    async function updateWatchList(entry) {
      await axios.put('http://localhost:8000/watchlist/' + entry.WatchListInDB.id, info, axiosConfig)
      
    }

    const handleSave = () => {
        updateWatchList(entry)
        flag()
    }

    const handleChangeStatus = (new_status) => {
        setInfo({...info, status: new_status})
        console.log(new_status)
         }

    const handleChangeEpisodes = (e) => {
        setInfo({...info, current_episodes: e.target.value})
        
    }

    const handleChangeRating = (e) => {
        setInfo({...info, rating: e.target.value})
        
    }

    



    return (
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ??????????????????????????
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{entry.title_en}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <FormControl>
                    <Select value= {entry.WatchListInDB.status} onChange = {e => handleChangeStatus(e.target.value)}> 
                        
                        <MenuItem value="??????????????????????????">??????????????????????????</MenuItem>
                        <MenuItem value="????????????">????????????</MenuItem>
                        <MenuItem value="??????????????????????">??????????????????????</MenuItem>
                        <MenuItem value="??????????????">??????????????</MenuItem> 
                    </Select>
                <FormHelperText>????????????</FormHelperText>
            </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="current_episodes"
            defaultValue={entry.WatchListInDB.current_episodes}
            onChange = {e => handleChangeEpisodes(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="rating"
            defaultValue={entry.WatchListInDB.rating}
            onChange = {e => handleChangeRating(e)}
            fullWidth
          />
          <Button onClick={() => remove(entry)}>??????????????</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ??????????
          </Button>
          <Button onClick={handleSave} color="primary">
            ??????????????????
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    )
}

export default WatchListEdit

