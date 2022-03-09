import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {authentication} from "../Firebase/firebase";


export default function SignIn({setIsRegistered, setFailedLogIn, loginEmail, loginPassword, setLoginEmail, SignWithFirebase, failedLogIn, setLoginPassword  }) {



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
      .then(() => setFailedLogIn(false))
      console.log(user)
    } catch (error) {
      setFailedLogIn(true)
    }
  };

  return (
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
  )
}