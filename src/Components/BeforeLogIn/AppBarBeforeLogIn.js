import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

const theme = createTheme({
  palette: {
    secondary: {
      main: '#434343'
    },
    primary: {
      main: 'rgb(67,67,67)'
    }
  }}
)

export const AppBarBeforeLogIn = () => {

  let navigate = useNavigate()

  const MoveToMainPage = () => {
    navigate('/')
  }

  return (
    <>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <AppBar position="relative">
          <Box display="flex" style={{justifyContent: 'left'}}>
            <Toolbar>
              <img onClick={MoveToMainPage} style={{height:"50px", cursor:"pointer"}} src="https://i.ibb.co/091ZV3C/White.png" alt="My Expenses"/>
            </Toolbar>
          </Box>
        </AppBar>
      </ThemeProvider>
    </>
  );
}