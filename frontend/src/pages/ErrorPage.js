import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import React from 'react'

const ErrorPage = () => {
    return (
        <Box mt="2rem">
            <Container fixed>
                <Typography align="center">Страница не найдена!</Typography>
            </Container> 
        </Box>
    )
}

export default ErrorPage
