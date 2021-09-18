import { useState, useEffect } from 'react'
import axios from 'axios'
import AnimeList from '../components/AnimeList'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


const AllAnimePage = () => {
  
  const [animes, setAnimes] = useState([])
    
    useEffect(() => {
      fetchAnimes()
    }, [])
  
  
  
    async function fetchAnimes() {
      const res = await axios.get('http://localhost:8000/anime')
      setAnimes(res.data)
    }
  
    
  
    return (
      <Box mt="2rem">
      <Container fixed>
        <AnimeList animes={animes}/>
      </Container> 
      </Box>
    );
  }
  
  
  
  export default AllAnimePage;