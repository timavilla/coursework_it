import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from "../context/UserContext";
import Button from '@material-ui/core/Button';

const AddToWl = ({anime}) => {
    const [token] = useContext(UserContext);

    
    let postData = {
        anime_id: anime.id
    }

    let axiosConfig = {
        headers: {Authorization: `Bearer ${token}`}
    }
    
    console.log(anime.id)
      
    async function AddToWatchList() {
    await axios.post('http://localhost:8000/watchlist/', postData, axiosConfig)
    console.log(anime.id)
    }

    const handleClick = (e) => {
    e.preventDefault();
    AddToWatchList();
    };
    
    
    return (
            <Button variant="contained" color="secondary" onClick={handleClick}>Добавить в список</Button>
    )
}

export default AddToWl
