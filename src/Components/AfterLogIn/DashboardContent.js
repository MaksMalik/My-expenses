import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Expenses from "./Expenses";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Statistics from "./Statistics";
import {AppBarAfterLogin} from "./AppBarAfterLogin";



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
      <AppBarAfterLogin setIsStatistics={setIsStatistics} realUser={realUser} />

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



          {!isStatistics
            ? <Expenses transactions={transactions} income={income} setIncome={setIncome} expense={expense} setExpense={setExpense} realUser={realUser} balance={balance} setBalance={setBalance} setTransactions={setTransactions}/>
            : <Statistics transactions={transactions} income={income} expense={expense} realUser={realUser} balance={balance} setBalance={setBalance}/>}

            </Box>
      </Box>
    </ThemeProvider>

  );
}

export default DashboardContent