import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Expenses from "./ExpensesPage/Expenses";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Statistics from "./StatisticsPage/Statistics";
import {DashboardAppBar} from "./DashboardAppBar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import {Copyright} from "../Copyright";



const DashboardContent = ({realUser, isAuth}) => {

  const mdTheme = createTheme({
    palette: {
      secondary: {
        main: '#434343'
      },
      primary: {
        main: 'rgb(0,153,189)'
      }
    }}
  )

  const [balance, setBalance] = useState(0)
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [isStatistics, setIsStatistics] = useState(false)


  let navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <ThemeProvider  theme={mdTheme} >
      <DashboardAppBar setIsStatistics={setIsStatistics} realUser={realUser} />

      <Box  sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100%',
            overflow: 'auto',
          }}
          style={{background: "linear-gradient(180deg, rgba(50,151,186,1) 0%, rgba(121,169,186,1) 26%, rgba(254,255,255,1) 100%)", minHeight: "100vh", maxWidth:"100vw", backgroundAttachment: "fixed" }}
        >
          <Toolbar  />

          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Container maxWidth={false}>
              <Grid container spacing={4} style={{justifyContent: 'center'}}>
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

                  {!isStatistics
                    ? <Expenses transactions={transactions} income={income} setIncome={setIncome} expense={expense} setExpense={setExpense} realUser={realUser} balance={balance} setBalance={setBalance} setTransactions={setTransactions}/>
                    : <Statistics transactions={transactions} income={income} expense={expense} realUser={realUser} balance={balance} setBalance={setBalance}/>}

                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
      <Copyright/>

    </ThemeProvider>
  );
}

export default DashboardContent