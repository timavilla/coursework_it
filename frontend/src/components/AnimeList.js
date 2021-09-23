import { useContext, useState } from 'react'
import Anime from './Anime'
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AnimeEdit from './AnimeEdit';
import { AdminContext } from '../context/AdminContext';



const AnimeList = ({animes, flag}) => {
    const [admin] = useContext(AdminContext)
    let empty = false
    
    return (
        <Grid container spacing={3}>
            
                {animes.map((anime) => 
                    <Anime anime={anime} key={anime.id} flag={flag} empty={empty} />
                )}
                { admin && 
                    
                    <IconButton>
                        
                                <AnimeEdit anime={{}} flag={flag} empty={empty=true}/>
                        
                    </IconButton>
                    
                }
            
        </Grid>
    )
}

export default AnimeList
