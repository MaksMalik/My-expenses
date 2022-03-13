import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {Copyright} from "../Copyright";
import {AppBarBeforeLogIn} from "./AppBarBeforeLogIn";
import Divider from "@mui/material/Divider";


const theme = createTheme({
  palette: {
    secondary: {
      main: '#434343'
    },
    primary: {
      main: 'rgb(0,153,189)'
    }
  }}
)


export default function Home() {

  let navigate = useNavigate()

  const MoveToLogin = () => {
    navigate('/login')
  }

  const MoveToRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBarBeforeLogIn/>
        <Container component="main" maxWidth="md" style={{marginTop:"80px",backgroundColor: "rgba(255,255,255,0.9)", boxShadow:"0px" +
            " 0px 10px rgb(0,153,189)", padding: "40px 30px" +
            " 40px 30px", width:"100%", }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent:"center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
              style={{color:"rgb(67,67,67)", fontFamily:"Avenir Next LT Pro"}}
            >
              welcome to
            </Typography>
            <img style={{width:"60%"}}  src="https://i.ibb.co/H48VngT/IMG-0073.png" alt="My Expenses"/>

            <Divider style={{marginBottom:"20px", marginTop:"20px", backgroundColor:"rgb(0,152,188)", width:"60%", height:"1px", boxShadow:"0px" +
                " 0px 10px 1px rgb(0,153,189)"}}/>

            <Typography style={{color:"rgb(67,67,67)", fontFamily:"Avenir Next LT Pro"}} variant="h5" align="center" color="text.secondary" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non dignissim leo, egestas suscipit dolor. Aenean turpis lectus, elementum id sagittis nec, malesuada ac neque. Nullam luctus vulputate ipsum. Mauris nec arcu convallis, varius tortor vel, egestas neque. Donec sollicitudin congue eros sed tincidunt.
            </Typography>
            <Divider style={{marginBottom:"20px", marginTop:"20px", backgroundColor:"rgb(0,152,188)", width:"60%", height:"1px", boxShadow:"0px" +
                " 0px 10px 1px rgb(0,153,189)"}}/>
          </Box>
          <Stack
            sx={{ pt: 2 }}
            direction="row"
            spacing={6}
            justifyContent="center"
          >
            <Button variant="outlined" onClick={MoveToLogin}>Sign In</Button>
            <Button variant="contained" onClick={MoveToRegister}>Sign Up</Button>
          </Stack>

        </Container>
        <Copyright/>
      </ThemeProvider>
    </>
  );
}