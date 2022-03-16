import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


const ProfileDisplayName = ({realUser}) => {

  return (
    <>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Paper style={{ maxHeight: 'minContent', padding:"30px", backgroundColor: 'rgba(0,0,0,0.21)'}}>
          <Typography style={{fontFamily:"Avenir Next LT Pro", textTransform:"uppercase",color: "rgba(255,255,255,0.85)", textAlign: "center"}} variant="h4" >
            {realUser?.displayName ? realUser?.displayName : "Hello, please set your name"}
          </Typography>
        </Paper>
      </Grid>
    </>
  )
}

export default ProfileDisplayName