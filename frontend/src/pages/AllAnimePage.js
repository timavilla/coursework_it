import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AnimeList from '../components/AnimeList'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { AdminContext } from '../context/AdminContext';


const AllAnimePage = () => {
  
  const [animes, setAnimes] = useState([])
  const [flag, setFlag] = useState(false)
  const [admin] = useContext(AdminContext)
    
    useEffect(() => {
      fetchAnimes()
    }, [flag, admin])
  
    
    const flagSwap = () => {
      setFlag(!flag)
    }
  
    async function fetchAnimes() {
      const res = await axios.get('http://localhost:8000/anime')
      setAnimes(res.data)
    }
  
    
  
    return (
      <Box mt="2rem">
      <Container fixed>
        <AnimeList animes={animes} flag={flagSwap}/>
      </Container> 
      </Box>
    );
  }
  
  
  
  export default AllAnimePage;