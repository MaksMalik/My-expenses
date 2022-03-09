import * as React from 'react';
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {authentication} from "../Firebase/firebase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const Register = ({SignWithFirebase, setIsRegistered}) => {

  const [failedRegister, setFailedRegister] = useState(false)
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const MoveToLogin = (event) => {
    event.preventDefault();
    setFailedRegister(false)
    setIsRegistered(true)
  }

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword (
        authentication,
        registerEmail,
        registerPassword)
      console.log(user)
      setFailedRegister(false)
      setTimeout(() => {
        setIsRegistered(true)
      }, 3000)
    } catch (error) {
      setFailedRegister(true)
    }
  };

  return (
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
  )
}



export default Register