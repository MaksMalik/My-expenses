import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import * as React from "react";

export const DashboardBalance = ({balance, realUser}) => {

  return (
    <Grid item lg={6} sm={12} xl={6} xs={12}>
      <Paper style={{ maxHeight: 'minContent', padding:"30px", backgroundColor: 'rgba(0,0,0,0.21)'}}>
        <Typography style={{fontFamily:"Avenir Next LT Pro", textTransform:"uppercase",color: "rgba(255,255,255,0.85)", textAlign: "center"}} variant="h4" >
          {realUser?.displayName ? <>{realUser.displayName} <Divider /> Balance:</> : ("Your" +
            " balance:")} {balance} zł
        </Typography>
      </Paper>
    </Grid>
  )
}