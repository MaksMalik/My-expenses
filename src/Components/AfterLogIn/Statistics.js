import * as React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";


const Statistics = ({realUser, income, balance, expense, transactions }) => {
  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center'}}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={4}
            style={{justifyContent: 'center'}}
          >
            <Grid item lg={6} sm={12} xl={6} xs={12}>
              <Paper style={{ maxHeight: 'minContent', padding:"30px", backgroundColor: 'rgba(0,0,0,0.21)'}}>
                <Typography style={{fontFamily:"Avenir Next LT Pro", textTransform:"uppercase",color: "rgba(255,255,255,0.85)", textAlign: "center"}} variant="h4" >
                  {realUser?.displayName ? <>{realUser.displayName} <Divider /> Balance:</> : ("Your" +
                    " balance:")} {balance} zł
                </Typography>
              </Paper>
            </Grid>

            <Grid item lg={7} sm={12} xl={7} xs={12}>
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



              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Paper style={{ height:"minContent", backgroundColor: 'rgba(0,0,0,0.24)', color:"#fff", textAlign: 'center', padding:"20px 0 20px 0"}}>
                  <Typography variant="h7">GIFTS</Typography>
                </Paper>
              </Grid>
              <Box display="flex" style={{paddingBottom:"30px", justifyContent: 'center'}}>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(60,152,185)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">INCOME</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'gift')).map(transaction => transaction.income)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'gift')).map(transaction => transaction.income)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(67,67,67)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">EXPENSES</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'gift')).map(transaction => transaction.expense)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'gift')).map(transaction => transaction.expense)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
              </Box>



              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Paper style={{ height:"minContent", backgroundColor: 'rgba(0,0,0,0.24)', color:"#fff", textAlign: 'center', padding:"20px 0 20px 0"}}>
                  <Typography variant="h7">FOOD</Typography>
                </Paper>
              </Grid>
              <Box display="flex" style={{paddingBottom:"30px", justifyContent: 'center'}}>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(60,152,185)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">INCOME</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'food')).map(transaction => transaction.income)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'food')).map(transaction => transaction.income)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(67,67,67)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">EXPENSES</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'food')).map(transaction => transaction.expense)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'food')).map(transaction => transaction.expense)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
              </Box>



              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Paper style={{ height:"minContent", backgroundColor: 'rgba(0,0,0,0.24)', color:"#fff", textAlign: 'center', padding:"20px 0 20px 0"}}>
                  <Typography variant="h7">TRAVEL</Typography>
                </Paper>
              </Grid>
              <Box display="flex" style={{paddingBottom:"30px", justifyContent: 'center'}}>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(60,152,185)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">INCOME</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'travel')).map(transaction => transaction.income)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'travel')).map(transaction => transaction.income)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(67,67,67)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">EXPENSES</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'travel')).map(transaction => transaction.expense)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'travel')).map(transaction => transaction.expense)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
              </Box>



              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Paper style={{ height:"minContent", backgroundColor: 'rgba(0,0,0,0.24)', color:"#fff", textAlign: 'center', padding:"20px 0 20px 0"}}>
                  <Typography variant="h7">CAR</Typography>
                </Paper>
              </Grid>
              <Box display="flex" style={{paddingBottom:"30px", justifyContent: 'center'}}>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(60,152,185)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">INCOME</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'car')).map(transaction => transaction.income)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'car')).map(transaction => transaction.income)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(67,67,67)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">EXPENSES</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'car')).map(transaction => transaction.expense)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'car')).map(transaction => transaction.expense)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
              </Box>


              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Paper style={{ height:"minContent", backgroundColor: 'rgba(0,0,0,0.24)', color:"#fff", textAlign: 'center', padding:"20px 0 20px 0"}}>
                  <Typography variant="h7">BILLS</Typography>
                </Paper>
              </Grid>
              <Box display="flex" style={{paddingBottom:"30px", justifyContent: 'center'}}>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(60,152,185)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">INCOME</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'bills')).map(transaction => transaction.income)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'bills')).map(transaction => transaction.income)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
                <Grid item lg={6} sm={12} xl={6} xs={10}>
                  <Paper style={{ height:"minContent", backgroundColor: 'rgb(67,67,67)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">EXPENSES</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{((transactions.filter(transaction => transaction.category === 'bills')).map(transaction => transaction.expense)).length === 0 ? 0  : ((transactions.filter(transaction => transaction.category === 'bills')).map(transaction => transaction.expense)).reduce((acc, transaction) => {return acc + transaction})}zł</Typography>
                  </Paper>
                </Grid>
              </Box>



            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Statistics