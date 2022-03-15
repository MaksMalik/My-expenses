import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Statistics = ({transactions}) => {

  const categories = ["bills", "gift", "food", "travel", "car"]

  return (
    <>
      {categories.map((category, index) => {
        return (<div key={index}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Paper style={{borderRadius:"4px 4px 0 0", height:"minContent", backgroundColor: 'rgba(0,0,0,0.24)', color:"#fff", textAlign: 'center', padding:"20px 0 20px 0"}}>
              <Typography variant="h7" style={{textTransform: 'uppercase'}}>{category}</Typography>
            </Paper>
          </Grid>
          <Box display="flex" style={{paddingBottom:"30px", justifyContent: 'center'}}>
            <Grid item lg={6} sm={12} xl={6} xs={10}>
              <Paper style={{ borderRadius:"0 0 0 4px", height:"minContent", backgroundColor: 'rgb(60,152,185)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                <Typography variant="h7">INCOME</Typography>
                <Typography style={{paddingBottom:"15px"}} variant="h4">
                  {((transactions
                  .filter(transaction => transaction.category === `${category}`))
                  .map(transaction => transaction.income)).length === 0
                    ? 0
                    : ((transactions
                    .filter(transaction => transaction.category === `${category}`))
                    .map(transaction => transaction.income))
                    .reduce((acc, transaction) => {return acc + transaction})}
                  zł
                </Typography>
              </Paper>
            </Grid>
            <Grid item lg={6} sm={12} xl={6} xs={10}>
              <Paper style={{borderRadius:"0 0 4px 0", height:"minContent", backgroundColor: 'rgb(67,67,67)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                <Typography variant="h7">EXPENSES</Typography>
                <Typography style={{paddingBottom:"15px"}} variant="h4">
                  {((transactions
                  .filter(transaction => transaction.category === `${category}`))
                  .map(transaction => transaction.expense)).length === 0
                    ? 0
                    : ((transactions
                    .filter(transaction => transaction.category === `${category}`))
                    .map(transaction => transaction.expense))
                    .reduce((acc, transaction) => {return acc + transaction})}
                  zł
                </Typography>
              </Paper>
            </Grid>
          </Box>
        </div>)
      })}
    </>
  )
}

export default Statistics