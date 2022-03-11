import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {authentication} from "../../Firebase/firebase";
import {Alert, Snackbar} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DashboardSidebar from "./DashboardSidebar";

const theme = createTheme({
  palette: {
    secondary: {
      main: 'rgba(0,0,0,0.21)'
    },
    primary: {
      main: 'rgba(0,0,0,0.21)'
    }
  }}
)

const Register = () => {

  const [registerEmail, setRegisterEmail] = useState()
  const [registerPassword, setRegisterPassword] = useState()
  const [failedRegister, setFailedRegister] = useState(false)
  const [succeededRegister, setSucceededRegister] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSucceededRegister(false);
    setFailedRegister(false);
  };

  let navigate = useNavigate()

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    try {
      createUserWithEmailAndPassword (
        authentication,
        registerEmail,
        registerPassword)
      .then(() =>{
        setFailedRegister(false)
        setSucceededRegister(true)
        setTimeout(()=> {
          navigate("/login")
        }, 3000)
        }
      ).catch(() => {
        setFailedRegister(true)
        setSucceededRegister(false)
      })
    }catch (error) {
      setFailedRegister(true)
      setSucceededRegister(false)
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="relative">
          <Toolbar style={{display: 'flex', justifyContent: 'center'}}>
            <DashboardSidebar/>

            <Typography   variant="h5" color="inherit" noWrap>
              My Expenses
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="xs" style={{backgroundColor: "rgba(0,0,0,0.21)", boxShadow:"1px" +
            " 2px 5px black", borderRadius:"5px", marginTop:"100px", padding: "40px 30px" +
            " 40px 30px", width:"100%"}}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography style={{color:"#fff"}} component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmitRegister} noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(event) => setRegisterEmail(event.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(event) => setRegisterPassword(event.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {failedRegister && (<div style={{color: 'rgba(255,0,0,0.57)', textAlign: 'center', paddingTop:"10px"}}>Wrong e-mail or password</div>)}
              {succeededRegister && (<div style={{color: 'rgba(47,255,0,0.2)'}}>Successfully registered. Redirecting to login page.</div>)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Sign up
              </Button>

              <Snackbar open={succeededRegister} autoHideDuration={6000} onClose={handleClose}>
                <Alert style={{backgroundColor: 'rgba(47,255,0,0.13)', color: 'rgba(255,255,255,0.55)'}} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  Successfully registered. Redirecting to login page.
                </Alert>
              </Snackbar>

              <Snackbar open={failedRegister} autoHideDuration={6000} onClose={handleClose}>
                <Alert style={{backgroundColor: 'rgba(255,0,0,0.2)', color: 'rgba(255,255,255,0.55)'}} onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Wrong e-mail or password. Try again
                </Alert>
              </Snackbar>


              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link to='/login' style={{color: 'rgba(255,255,255,0.68)'}}>
                    Already have and account
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Register