import * as React from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import {authentication} from "../../Firebase/firebase";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
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

const ForgotPassword = () => {

  const [resetPasswordEmail, setResetPasswordEmail] = useState()
  const [resetPasswordEmailUpdated, setResetPasswordEmailUpdated] = useState()
  const [succeedResetPasswordEmail, setSucceedResetPasswordEmail] = useState(false)

  useEffect(() => {
    if (!resetPasswordEmailUpdated) return false
    sendPasswordResetEmail(authentication, resetPasswordEmailUpdated)
    .then(() => {
      console.log("Sending password reset email")
      setSucceedResetPasswordEmail(true)
      window.location.href="/"
    })
    .catch((error) => {
      console.log(error)
    });
  }, [resetPasswordEmailUpdated])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSucceedResetPasswordEmail(false);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    setResetPasswordEmailUpdated(resetPasswordEmail)
  }

  return (
    <>
      <ThemeProvider theme={theme}>

        <AppBarBeforeLogIn/>
        <Container component="main" maxWidth="xs" style={{marginTop:"40px",backgroundColor: "rgba(255,255,255,0.9)", boxShadow:"0px" +
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography style={{color:"#434343"}} component="h1" variant="h5">
              Reset password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(event) => setResetPasswordEmail(event.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={handleResetPassword}
              >
                Reset password
              </Button>
            </Box>
          </Box>

          <Snackbar open={succeedResetPasswordEmail} autoHideDuration={6000} onClose={handleClose}>
            <Alert style={{backgroundColor: 'rgba(30,168,0,0.58)', color: 'rgb(255,255,255)'}} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              E-mail sent successfully. Redirecting to main page.
            </Alert>
          </Snackbar>

          <Grid container>
            <Grid item xs>
              <nav>
                <Link to='/login' style={{color: 'rgb(67,67,67)'}}>
                  Sign In
                </Link>
              </nav>
            </Grid>
            <Grid item>
              <Link to='/register' style={{color: 'rgb(67,67,67)'}}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Container>
        <Copyright/>
      </ThemeProvider>
    </>
  )
}

export default ForgotPassword