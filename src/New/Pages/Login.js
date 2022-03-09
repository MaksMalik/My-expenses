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
import ResponsiveAppBarBeforeLogin from "../ResponsiveAppBarBeforeLogin";

const theme = createTheme();

const Login = ({setIsAuth}) => {

  const [loginEmail, setLoginEmail] = useState()
  const [loginPassword, setLoginPassword] = useState()
  const [failedLogIn, setFailedLogIn] = useState(false)

  let navigate = useNavigate()

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
        navigate("/expenses")
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
      navigate("/expenses")
    })
  }

  return (
    <>
      <ResponsiveAppBarBeforeLogin/>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
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
              {failedLogIn && (<div style={{color: 'red'}}>Wrong e-mail or password</div>)}
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
          <Button
            onClick={SignInWithGoogle}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <nav>
                <Link to='/register'>
                  Forgot password?
                </Link>
              </nav>
            </Grid>
            <Grid item>
              <Link to='/register'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login