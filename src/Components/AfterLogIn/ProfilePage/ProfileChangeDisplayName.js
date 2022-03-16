import * as React from 'react';
import { updateProfile } from "firebase/auth";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Alert, Snackbar, TextField, ThemeProvider} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import {createTheme} from "@mui/material/styles";

const ProfileChangeDisplayName = ({realUser}) => {

  const [updateDisplayName, setUpdateDisplayName] = useState ("")
  const [succeedUpdateDisplayName, setSucceedUpdateDisplayName] = useState (false)
  const [failedUpdateDisplayName, setFailedUpdateDisplayName] = useState (false)


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
    setSucceedUpdateDisplayName(false);
    setFailedUpdateDisplayName(false)
  };

  const updateProfileName = () => {
    !updateDisplayName || updateDisplayName === realUser?.displayName || updateDisplayName.length < 6
      ? setFailedUpdateDisplayName(true)
      : (updateProfile(realUser, {
        displayName: updateDisplayName })
      .then(() => {
        setSucceedUpdateDisplayName(true)
      }))
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Snackbar open={succeedUpdateDisplayName === true} autoHideDuration={6000} onClose={handleClose}>
          <Alert style={{backgroundColor: 'rgb(21,128,3)', color: 'rgb(255,255,255)'}} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully changed name.
          </Alert>
        </Snackbar>

        <Snackbar open={failedUpdateDisplayName === true} autoHideDuration={6000} onClose={handleClose}>
          <Alert  style={{backgroundColor: 'rgb(164,0,0)', color: 'rgb(255,255,255)'}}  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            New name is shorter than 6 character or matches previous one
          </Alert>
        </Snackbar>


        <Paper style={{marginTop:"30px", height:"minContent", backgroundColor: 'rgba(0,0,0,0.21)'}}>
          <Box sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap', '& > :not(style)': { m: 3, width: '100%', height: 'minContent',},}}>
            <Grid item xs={12} md={12}>
              <TextField
                style={{padding:"10px", marginTop:"10px"}}
                fullWidth
                id="outlined-number"
                label="Your name"
                type="text"
                onChange={(event) =>  setUpdateDisplayName(event.target.value)}
              />
              <Button onClick={updateProfileName}>Change name</Button>
            </Grid>
          </Box>
        </Paper>

      </ThemeProvider>

    </>
  )
}

export default ProfileChangeDisplayName