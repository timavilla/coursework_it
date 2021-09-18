import React from 'react'
import Anime from './Anime'
import Grid from '@material-ui/core/Grid';


const AnimeList = ({animes}) => {
    return (
        <Grid container spacing={3}>
            
                {animes.map((anime) => 
                    <Anime anime={anime} key={anime.id} />
                )}
            
        </Grid>
    )
}

export default AnimeList
