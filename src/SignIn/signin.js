import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {authentication} from "../Firebase/firebase";

export default function SignIn() {

  const theme = createTheme();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [realUser, setRealUser] = useState({})
  const [failedLogIn, setFailedLogIn] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  onAuthStateChanged(authentication, (currentUser) => {
    setRealUser(currentUser)
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    setLoginEmail(data.get('email'))
    setLoginPassword(data.get('password'))

    try {
      const user = await signInWithEmailAndPassword (
        authentication,
        loginEmail,
        loginPassword)
      .then(() => setIsLoggedIn(true))
      .then(() => setFailedLogIn(false))

      console.log(user)
    } catch (error) {
      setFailedLogIn(true)
    }
  };

  const provider = new GoogleAuthProvider()

  const SignWithFirebase = () => {
    signInWithPopup(authentication, provider)
    .then(res => {
      console.log("Logged id")
      console.log(res.user)
    })
    .then(() => setIsLoggedIn(true))
    .then(() => setFailedLogIn(false))

    .catch(error => {
      console.log(error)
    })
  }

  const LogOut = () => {
    signOut(authentication)
    .then(() => {
      console.log("Logged out")
    })
    .then(() => setIsLoggedIn(false))
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      {!isLoggedIn && (
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
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={SignWithFirebase}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 0, mb: 2 }}
                >
                  Sign In with Google
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
      {isLoggedIn && (
        <>
          <Container  maxWidth="xs">
            <h1 style={{textAlign: "center", paddingTop: "20px", paddingBottom: "20px"}}>Welcome {realUser?.displayName}</h1>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              onClick={LogOut}>Logout
            </Button>
          </Container>
        </>
      )}
    </>
  );
}
