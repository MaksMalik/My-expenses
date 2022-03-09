import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState} from "react";
import {GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {authentication} from "../Firebase/firebase";
import AfterSignIn from "./AfterSignIn";
import ResponsiveAppBarBeforeLogin from "../New/ResponsiveAppBarBeforeLogin";
import Register from "./Register";
import SignIn from "./SignIn";

export default function PageAfterOrBeforeLogIn() {

  const provider = new GoogleAuthProvider()
  const theme = createTheme();

  const [realUser, setRealUser] = useState({})

  const [failedLogIn, setFailedLogIn] = useState(false)

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [isRegistered, setIsRegistered] = useState(true)


  const SignWithFirebase = () => {
    signInWithPopup(authentication, provider)
    .then(res => {
      console.log("Logged id")
      console.log(res.user)
    })
    .then(() => setFailedLogIn(false))
    .catch(error => {
      console.log(error)
    })
  }

  onAuthStateChanged(authentication, (currentUser) => {
    setRealUser(currentUser)
  })

  return (
    <>
      {!realUser ?
        (<>
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
                  <SignIn setIsRegistered={setIsRegistered} setFailedLogIn={setFailedLogIn} loginEmail={loginEmail} loginPassword={loginPassword}
                          setLoginEmail={setLoginEmail} SignWithFirebase={SignWithFirebase} failedLogIn={failedLogIn} setLoginPassword={setLoginPassword} />
                )}
                {!isRegistered && (
                  <Register SignWithFirebase={SignWithFirebase} setIsRegistered={setIsRegistered}/>
                )}
              </Box>
            </Container>
          </ThemeProvider>
        </>) :
        (<>
          <AfterSignIn data={realUser}/>
        </>)}
    </>
  )
}