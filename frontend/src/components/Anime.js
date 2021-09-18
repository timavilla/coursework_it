import React from "react";
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const Anime = ({anime}) => {
    
    const router = useHistory()

 
    
    return (
        <Grid item md={3}>
        <Card>
            <CardMedia component="img"  image={`http://localhost:8000/anime/${anime.id}/image`}>
                
            </CardMedia>
            <CardContent>
                <Typography>
                    {anime.title_ru}
                </Typography>
                <Typography variant="body2">
                    
                    {anime.rating}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick ={() => router.push(`/anime/${anime.id}`)} size="small">Learn More</Button>
            </CardActions>
        </Card>
        </Grid>
    )
}

export default Anime
