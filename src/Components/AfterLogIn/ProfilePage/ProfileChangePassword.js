import * as React from 'react';
import { updatePassword } from "firebase/auth";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Alert, Snackbar, TextField, ThemeProvider} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import {createTheme} from "@mui/material/styles";

const ProfileChangePassword = ({realUser}) => {

  const [updatePasswordNew, setUpdatePasswordNew] = useState ()
  const [succeedUpdatePassword, setSucceedUpdatePassword] = useState (false)
  const [failedUpdatePassword, setFailedUpdatePassword] = useState (false)


  const theme = createTheme({
    palette: {
      secondary: {
        main: '#434343'
      },
      primary: {
        main: 'rgb(255,255,255)'
      }
    }}
  )


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSucceedUpdatePassword(false);
    setFailedUpdatePassword(false)
  };

  const updateProfileName = () => {
    updatePassword(realUser, updatePasswordNew)
    .then(() => {
      setSucceedUpdatePassword(true)
      setFailedUpdatePassword(false)
    })
    .catch(() => {
      setFailedUpdatePassword(true)

    })
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Snackbar open={succeedUpdatePassword === true} autoHideDuration={6000} onClose={handleClose}>
          <Alert style={{backgroundColor: 'rgb(21,128,3)', color: 'rgb(255,255,255)'}} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully changed password.
          </Alert>
        </Snackbar>

        <Snackbar open={failedUpdatePassword === true} autoHideDuration={6000} onClose={handleClose}>
          <Alert  style={{backgroundColor: 'rgb(164,0,0)', color: 'rgb(255,255,255)'}}  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Wrong password. Try again
          </Alert>
        </Snackbar>



        <Paper style={{marginTop:"30px", height:"minContent", backgroundColor: 'rgba(0,0,0,0.21)'}}>
          <Box sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap', '& > :not(style)': { m: 3, width: '100%', height: 'minContent',},}}>
            <Grid item xs={12} md={12}>
              <TextField
                style={{padding:"10px", marginTop:"10px"}}
                fullWidth
                id="outlined-number"
                label="Your new password"
                type="text"
                onChange={(event) =>  setUpdatePasswordNew(event.target.value)}
              />
              <Button onClick={updateProfileName}>Change password</Button>
            </Grid>
          </Box>
        </Paper>

      </ThemeProvider>

    </>
  )
}

export default ProfileChangePassword