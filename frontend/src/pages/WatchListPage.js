import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from "../context/UserContext";
import WatchList from '../components/WatchList';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';



const WatchListPage = () => {
    
    const [token] = useContext(UserContext);
    
    const [watchlist, setWatchList] = useState([])
    const [flag, setFlag] = useState(false)
    
    useEffect(() => {
        fetchWatchList()
      }, [flag])

    const flagSwap = () => {
      setFlag(!flag)
    } 



    async function removeWatchList(entry) {
    await axios.delete('http://localhost:8000/watchlist/' + entry.WatchListInDB.id, { headers: { Authorization: `Bearer ${token}` } })
    setWatchList(watchlist.filter(p => p.WatchListInDB.id !== entry.WatchListInDB.id))
    
      }
    
    async function fetchWatchList() {
      const res = await axios.get('http://localhost:8000/watchlist/', { headers: { Authorization: `Bearer ${token}` } })
      setWatchList(res.data)
    }
      
      
    
    return (
      <Box mt="2rem">
        <Container fixed>
            <WatchList entries={watchlist} remove={removeWatchList} flag={flagSwap}/>
        </Container> 
      </Box>
    )
}

export default WatchListPage
