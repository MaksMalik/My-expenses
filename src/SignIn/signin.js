import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {authentication} from "../Firebase/firebase";
import AfterLogin from "./afterlogin";
import ResponsiveAppBarBeforeLogin from "./ResponsiveAppBarBeforeLogin";

export default function SignIn() {

  const provider = new GoogleAuthProvider()
  const theme = createTheme();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [realUser, setRealUser] = useState({})

  const [failedLogIn, setFailedLogIn] = useState(false)
  const [failedRegister, setFailedRegister] = useState(false)
  const [succeedRegistered, setSucceedRegistered] = useState(false)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const [isRegistered, setIsRegistered] = useState(true)

  onAuthStateChanged(authentication, (currentUser) => {
    setRealUser(currentUser)
  })

  const MoveToLogin = (event) => {
    event.preventDefault();
    setIsRegistered(true)
  }

  const MoveToRegister = (event) => {
    event.preventDefault();
    setIsRegistered(false)
    setFailedLogIn(false)
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
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

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword (
        authentication,
        registerEmail,
        registerPassword)
      console.log(user)
      setFailedRegister(false)
      setSucceedRegistered(true)
      setTimeout(() => {
        setIsRegistered(true)
      }, 3000)
      setTimeout(() => {
        setSucceedRegistered(false)
      }, 3000)


    } catch (error) {
      setFailedRegister(true)
    }
  };

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

      {!isLoggedIn && <>
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
              {isRegistered && (
                <>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmitLogin} noValidate sx={{mt: 1}}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={(event) => setLoginEmail(event.target.value)}

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
                      onChange={(event) => setLoginPassword(event.target.value)}
                    />
                    {failedLogIn && (<div style={{color: 'red'}}>Wrong e-mail or password</div>)}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{mt: 3, mb: 2}}
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={SignWithFirebase}
                      fullWidth
                      variant="contained"
                      sx={{mt: 0, mb: 2}}
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
                        <Link style={{cursor: "pointer"}} variant="body2" onClick={MoveToRegister}>
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

              {!isRegistered && (
                <>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box component="form" onSubmit={handleSubmitRegister} noValidate sx={{mt: 1}}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={(event) => setRegisterEmail(event.target.value)}
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
                      onChange={(event) => setRegisterPassword(event.target.value)}

                    />
                    {failedRegister && (<div style={{color: 'red'}}>Wrong e-mail or password</div>)}
                    {succeedRegistered && (<div style={{color: 'green'}}>Successfully registered. Please sign in.</div>)}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{mt: 3, mb: 2}}
                    >
                      Sign up
                    </Button>
                    <Button
                      onClick={SignWithFirebase}
                      fullWidth
                      variant="contained"
                      sx={{mt: 0, mb: 2}}
                    >
                      Sign In with Google
                    </Button>
                    <Grid container>
                      <Grid item xs>

                      </Grid>
                      <Grid item>
                        <Link style={{cursor: "pointer"}} variant="body2" onClick={MoveToLogin}>
                          {"Already have an account"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

            </Box>
          </Container>
        </ThemeProvider>
      </>
      }

      {isLoggedIn && (
        <>
          <AfterLogin data={realUser} LogOut={LogOut}/>
        </>
      )}
    </>
  );
}
