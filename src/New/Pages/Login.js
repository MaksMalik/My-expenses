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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const theme = createTheme({
  palette: {
    secondary: {
      main: '#093531'
    },
    primary: {
      main: 'rgba(7,38,35,0.79)'
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
        <AppBar position="relative">
          <Toolbar style={{display: 'flex', justifyContent: 'center'}}>
            <Typography  variant="h5" color="inherit" noWrap>
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
              {failedLogIn && (<div style={{color: 'rgba(255,0,0,0.57)', textAlign: 'center', paddingTop:"10px"}}>Wrong e-mail or password</div>)}
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
            <Alert  style={{backgroundColor: 'rgba(255,0,0,0.2)', color: 'rgba(255,255,255,0.55)'}}  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Wrong e-mail or password. Try again
            </Alert>
          </Snackbar>

          <Button
            onClick={SignInWithGoogle}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            style={{backgroundColor: 'rgba(40,58,211,0.22)', color: 'rgb(255,255,255)'}}
          >
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <nav>
                <Link to='/ForgotPassword' style={{color: 'rgba(255,255,255,0.68)'}}>
                  Forgot password?
                </Link>
              </nav>
            </Grid>
            <Grid item>
              <Link to='/register' style={{color: 'rgba(255,255,255,0.68)'}}>
                Don't have an account?
              </Link>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login