import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";

export const DashboardIncomeExpenses = ({income, expense, }) => {

  return (
    <Box display="flex" style={{paddingBottom:"30px", justifyContent: 'center'}}>
      <Grid item lg={4} sm={12} xl={4} xs={10}>
        <Paper style={{ height:"minContent", marginLeft:"20px", marginRight:"10px", backgroundColor: 'rgb(60,152,185)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
          <Typography variant="h7">INCOME</Typography>
          <Typography style={{paddingBottom:"15px"}} variant="h4">{income} zł</Typography>
        </Paper>
      </Grid>
      <Grid item lg={4} sm={12} xl={4} xs={10}>
        <Paper style={{ height:"minContent", marginRight:"20px", marginLeft:"10px", backgroundColor: 'rgb(67,67,67)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
          <Typography variant="h7">EXPENSES</Typography>
          <Typography style={{paddingBottom:"15px"}} variant="h4">{expense} zł</Typography>
        </Paper>
      </Grid>
    </Box>
  )
}