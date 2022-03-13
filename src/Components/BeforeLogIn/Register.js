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
import {Copyright} from "../Copyright";
import {AppBarBeforeLogIn} from "./AppBarBeforeLogIn";

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

        <AppBarBeforeLogIn/>
        <Container component="main" maxWidth="xs" style={{marginTop:"80px",backgroundColor: "rgba(255,255,255,0.9)", boxShadow:"0px" +
            " 0px 10px rgb(0,153,189)", padding: "40px 30px" +
            " 40px 30px", width:"100%", }}>

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
              <LockOutlinedIcon style={{color:"rgb(0,153,189)"}}  />
            </Avatar>
            <Typography style={{color:"#434343"}} component="h1" variant="h5">
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
              {failedRegister && (<div style={{color: 'rgb(255,0,0)', textAlign: 'center', paddingTop:"10px"}}>Wrong e-mail or password</div>)}
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
                <Alert style={{backgroundColor: 'rgb(164,0,0)', color: 'rgb(255,255,255)'}} onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Wrong e-mail or password. Try again
                </Alert>
              </Snackbar>


              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link to='/login' style={{color: 'rgb(67,67,67)'}}>
                    Already have and account
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Copyright/>
      </ThemeProvider>
    </>
  );
}

export default Register