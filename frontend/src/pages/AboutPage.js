import React from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const AboutPage = () => {
    return (
        <Box mt="2rem">
        <Container fixed>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <Typography variant="h2">Обо мне</Typography>
                    <Typography variant="body1">Студент М3О-424Б-18</Typography>
                    <Typography variant="body1">Пантюк Тимофей Александрович</Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography variant="h2">О приложении</Typography>
                    <Typography variant="body1">Приложение для просмотра информации об аниме и ведения списка просмотренных</Typography>
                </Grid>
            </Grid>
        </Container> 
        </Box>
    )
}

export default AboutPage
