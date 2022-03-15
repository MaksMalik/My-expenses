import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Expenses from "./ExpensesPage/Expenses";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Statistics from "./StatisticsPage/Statistics";
import {DashboardAppBar} from "./Dashboard/DashboardAppBar";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {Copyright} from "../Copyright";
import {DashboardIncomeExpenses} from "./Dashboard/DashboardIncomeExpenses";
import {DashboardBalance} from "./Dashboard/DashboardBalance";

const Dashboard = ({realUser, isAuth}) => {

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
  const categories = ["Bills", "Gift", "Food", "Travel", "Car"]

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
        <Box component="main" sx={{ flexGrow: 1,  height: '100%',  overflow: 'auto'}}
             style={{background: "linear-gradient(180deg, rgba(50,151,186,1) 0%, rgba(121,169,186,1) 26%, rgba(254,255,255,1) 100%)", minHeight: "100vh", maxWidth:"100vw", backgroundAttachment: "fixed" }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <Container maxWidth={false}>
              <Grid container spacing={4} style={{justifyContent: 'center'}}>

                <DashboardBalance balance={balance} realUser={realUser}/>

                <Grid item lg={7} sm={12} xl={7} xs={12}>
                  <DashboardIncomeExpenses income={income} expense={expense}/>
                </Grid>

                <Grid item lg={7} sm={12} xl={7} xs={12}>
                  {!isStatistics
                    ? <Expenses categories={categories} transactions={transactions} income={income} setIncome={setIncome} expense={expense} setExpense={setExpense} realUser={realUser} balance={balance} setBalance={setBalance} setTransactions={setTransactions}/>
                    : <Statistics categories={categories} transactions={transactions} income={income} expense={expense} realUser={realUser} balance={balance} setBalance={setBalance}/>}
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

export default Dashboard