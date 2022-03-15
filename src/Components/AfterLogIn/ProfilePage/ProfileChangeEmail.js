import * as React from 'react';
import { updateEmail  } from "firebase/auth";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Alert, Snackbar, TextField, ThemeProvider} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import {createTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const ProfileChangeEmail = ({realUser}) => {

  const [updateEmailNew, setUpdateEmailNew] = useState ()
  const [succeedUpdateEmail, setSucceedUpdateEmail] = useState (false)

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
    setSucceedUpdateEmail(false);
  };

  const updateProfileEmail = () => {
    updateEmail(realUser, `${updateEmailNew}`)
    .then(() => setSucceedUpdateEmail(true))
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Snackbar open={succeedUpdateEmail === true} autoHideDuration={6000} onClose={handleClose}>
          <Alert style={{backgroundColor: 'rgb(21,128,3)', color: 'rgb(255,255,255)'}} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully changed e-mail.
          </Alert>
        </Snackbar>


        <Paper style={{marginTop:"30px", height:"minContent", backgroundColor: 'rgba(0,0,0,0.21)'}}>
          <Box sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap', '& > :not(style)': { m: 3, width: '100%', height: 'minContent',},}}>
            <Grid item xs={12} md={12}>
              <Typography>
                Your current e-mail: {realUser?.email}
              </Typography>
              <TextField
                style={{padding:"10px", marginTop:"10px"}}
                fullWidth
                id="outlined-number"
                label="Your new e-mail"
                type="text"
                onChange={(event) =>  setUpdateEmailNew(event.target.value)}
              />
              <Button onClick={updateProfileEmail}>Change e-mail</Button>
            </Grid>
          </Box>
        </Paper>

      </ThemeProvider>

    </>
  )
}

export default ProfileChangeEmail