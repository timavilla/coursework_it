import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from '../context/UserContext';



const useStyles = makeStyles({
    toolbarButtons: {
      marginLeft: 'auto',
    },
  });


const Navbar = () => {
    const [token, setToken] = useContext(UserContext);
    const handleLogout = (e) => {
        setToken(null)
    }

    const classes = useStyles()

    return (
        <AppBar position="static">
            <Toolbar>
            {!token ?
                <div className={classes.toolbarButtons}>
                    <Button styles={{flexGrow: 1}} component={Link} color="inherit" to="/about">About</Button>
                    <Button component={Link} color="inherit" to="/anime">Anime</Button>
                    <Button component={Link} color="inherit" to="/watchlist">Watchlist</Button>
                    <Button component={Link} color="inherit" to="/login">Login</Button>
                </div>
            :
                <div className={classes.toolbarButtons}>
                    <Button styles={{flexGrow: 1}} component={Link} color="inherit" to="/about">About</Button>
                    <Button component={Link} color="inherit" to="/anime">Anime</Button>
                    <Button component={Link} color="inherit" to="/watchlist">Watchlist</Button>
                    <Button onClick = {handleLogout} color="inherit" >Logout</Button>
                </div>
            }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
