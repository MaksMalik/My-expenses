import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Expenses from "./Expenses";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Statistics from "./Statistics";
import {AppBarAfterLogin} from "./AppBarAfterLogin";




const DashboardContent = ({realUser, isAuth}) => {

  const mdTheme = createTheme({
    palette: {
      secondary: {
        main: '#434343'
      },
      primary: {
        main: 'rgb(0,153,189)'
      }
    }}
  )

  const [isStatistics, setIsStatistics] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <ThemeProvider  theme={mdTheme} >
      <AppBarAfterLogin setIsStatistics={setIsStatistics} realUser={realUser} />

      <Box  sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100%',
            overflow: 'auto',
          }}
          style={{background: "linear-gradient(180deg, rgba(57,80,85,1) 0%, rgba(43,99,111,1) 31%, rgba(0,153,189,1) 67%, rgba(141,184,194,1) 100%)", minHeight: "100vh", maxWidth:"100vw", backgroundAttachment: "fixed" }}
        >
          <Toolbar  />


          {!isStatistics ? <Expenses realUser={realUser}/> : <Statistics realUser={realUser}/>}

            </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardContent