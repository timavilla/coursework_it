import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import AddToWl from '../components/AddToWl'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const AnimePage = () => {
    const params = useParams()
    const [anime, setAnime] = useState([])
    
    
    useEffect(() => {
        console.log("я работаю")
        fetchAnime(params.id)
      }, [])
    
    
    
    async function fetchAnime(id) {
      const res = await axios.get('http://localhost:8000/anime/' + id)
      setAnime(res.data)
    }


    
    return (
      <Box mt="2rem">
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Typography variant="h2">{anime.title_ru}</Typography>
          </Grid>
          <Grid item md={4}>
            
              <img height="400" src={`http://localhost:8000/anime/${anime.id}/image`} />
            
          </Grid>
         
          <Grid item md={4}>
               <Box bgcolor="warning.main">
                  <Typography variant="h4">Информация</Typography>
               </Box>
               <List>
                 <ListItem>
                    <ListItemText primary={`По-английски: ${anime.title_en}`}/>
                 </ListItem>
                 <Divider />
                 <ListItem>
                    <ListItemText primary={`Статус: ${anime.status}`}/>
                 </ListItem>
                 <Divider />
                 <ListItem>
                    <ListItemText primary={`Источник: ${anime.source}`}/>
                 </ListItem>
                 <Divider />
                 <ListItem>
                    <ListItemText primary={`Количество эпизодов: ${anime.episodes}`}/>
                 </ListItem>
                 <Divider />
                 <ListItem>
                    <ListItemText primary={`Рейтинг: ${anime.rating}`}/>
                 </ListItem>
                 <Divider />
                 <ListItem>
                    <ListItemText primary={`Описание: 
                    ${anime.description}`}/>
                 </ListItem> 
               </List>
              
          </Grid>
          <Grid item md={4}>
            <AddToWl anime={anime}/>
          </Grid>
          </Grid>
        </Container> 
      </Box>
    )
}

export default AnimePage
