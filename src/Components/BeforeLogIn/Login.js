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
import {authentication, provider} from "../../Firebase/firebase";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {useState} from "react";
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

const Login = ({setIsAuth}) => {

  const [loginEmail, setLoginEmail] = useState()
  const [loginPassword, setLoginPassword] = useState()
  const [failedLogIn, setFailedLogIn] = useState(false)

  let navigate = useNavigate()


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailedLogIn(false);
  };

  const SubmitLogin =  (event) => {
    event.preventDefault();
    try {
      signInWithEmailAndPassword (
        authentication,
        loginEmail,
        loginPassword
      )
      .then(() => setFailedLogIn(false))
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/dashboard")
      })
      .catch(() => {
        setFailedLogIn(true)
      })
    } catch (error) {
      console.log(error)
      setFailedLogIn(true)
    }
  };

  const SignInWithGoogle = () => {
    signInWithPopup(authentication, provider)
    .then(() => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/dashboard")
    })
  }

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
              justifyContent: 'center',
              alignContent:"center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon style={{color:"rgb(0,153,189)"}} />
            </Avatar>
            <Typography style={{color:"#434343"}} component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={SubmitLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(event) => setLoginEmail(event.target.value)}
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
                onChange={(event) => setLoginPassword(event.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {failedLogIn && (<div style={{color: 'rgb(255,0,0)', textAlign: 'center', paddingTop:"10px"}}>Wrong e-mail or password</div>)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>

          <Snackbar open={failedLogIn} autoHideDuration={6000} onClose={handleClose}>
            <Alert  style={{backgroundColor: 'rgb(164,0,0)', color: 'rgb(255,255,255)'}}  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Wrong e-mail or password. Try again
            </Alert>
          </Snackbar>

          <Button
            onClick={SignInWithGoogle}
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/ForgotPassword' style={{color: 'rgb(67,67,67)'}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' style={{color: 'rgb(67,67,67))'}}>
                Don't have an account?
              </Link>
            </Grid>
          </Grid>
        </Container>
        <Copyright/>
      </ThemeProvider>
    </>
  );
}

export default Login