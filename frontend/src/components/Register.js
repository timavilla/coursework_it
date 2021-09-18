import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "../context/UserContext";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const Register = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [, setToken] = useContext(UserContext)

    const submitRegistration = async () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, password: password }),
        };
    
        const response = await fetch("http://localhost:8000/users", requestOptions)
        const data = await response.json()
        console.log(data)
    
        setToken(data.access_token)
        
      }

    const handleSubmit = (e) => {
    e.preventDefault()
    submitRegistration();
    }

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
            Регистрация
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
                <Button component={Link}  to="/login" variant="body2">
                  {"Есть аккаунт? Войдите"}
                </Button>
              </Grid>
            </Grid>
          
        </Box>
        </Container>
      )
      }
export default Register;

