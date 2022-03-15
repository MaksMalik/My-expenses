import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";

export const ExpensesButtonAddNewTransaction = ({handleClickOpen}) => {

  return (
    <Box style={{display:"flex", justifyContent: 'center'}}>
      <Grid item lg={7} sm={7} xl={7} xs={12}>
        <Button style={{color:"#2a7891", width:"100%", padding:"10px", marginBottom:"30px", backgroundColor:"rgba(255,255,255,0.75)"}} variant="contained" onClick={handleClickOpen}>
          Add new transaction
        </Button>
      </Grid>
    </Box>
  )
}

