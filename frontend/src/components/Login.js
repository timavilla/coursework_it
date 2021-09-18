import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



const Login = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [, setToken] = useContext(UserContext);



  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${name}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch("http://localhost:8000/token", requestOptions);
    const data = await response.json();

    
    setToken(data.access_token);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };


  return(
    <Container component="main" maxWidth="xs">
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" onClick={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            </Box>
            <Grid container>
            <Grid item>
                <Button component={Link}  to="/registration" variant="body2">
                  {"Нет аккаунта? Зарегестрируйтесь"}
                </Button>
            </Grid>
            </Grid>
          
        </Box>
        </Container>
    )
  }

export default Login;


            