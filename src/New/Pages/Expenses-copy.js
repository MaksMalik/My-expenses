import * as React from 'react';
import {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {db} from "../../Firebase/firebase";
import {collection, addDoc, onSnapshot } from "firebase/firestore"
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";


const Expenses = ({realUser}) => {
  const [newExpense, setNewExpense] = useState(
    {
      transactions: [],
      balance: 0,
      transactionName: "",
      transactionType: "",
      amount: "",
      currentUID: realUser?.uid,
    })

  const transactionCollection = collection(db, 'Transactions/users/' + realUser?.uid)

  let navigate = useNavigate()

  const handleChange = async () => {
    if (newExpense.transactionType && newExpense.transactionName && newExpense.amount) {
      const BackUpState = newExpense.transactions
      BackUpState.push({
        id: BackUpState.length + 1,
        name: newExpense.transactionName,
        type: newExpense.transactionType,
        amount: newExpense.amount,
        user_id: newExpense.currentUID
      })
      try {addDoc(transactionCollection, {
        id: BackUpState.length + 1,
        name: newExpense.transactionName,
        type: newExpense.transactionType,
        amount: newExpense.amount,
        user_id: newExpense.currentUID,
        balance: newExpense.transactionType === 'income' ? newExpense.balance + parseFloat(newExpense.amount) : newExpense.balance - parseFloat(newExpense.amount)
      })
      .then(() =>{
        console.log("Successfully added")
        setNewExpense({...newExpense, transactionType: "", transactionName: "", amount: "", balance: newExpense.transactionType === 'income' ? newExpense.balance + parseFloat(newExpense.amount) : newExpense.balance - parseFloat(newExpense.amount)})
      })}
      catch (error) {
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    const BackUpState = newExpense.transactions
    let totalMoney = newExpense.amount

    onSnapshot(collection(db, "Transactions/users/" + realUser?.uid), (snapshot) => {
      const transactions = (snapshot.docs.map(doc => doc.data()))
      transactions.forEach(transaction => {
        newExpense.balance = transaction.type === 'income' ?
          Number(transaction.amount) + newExpense.balance :
          newExpense.balance - Number(transaction.amount)
      })

    })
  }, [realUser, newExpense])

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <Paper style={{ maxHeight: 'minContent', padding:"30px", backgroundColor: 'rgba(0,0,0,0.21)'}}>
                <Typography style={{color: "rgba(255,255,255,0.85)", textAlign: "center"}} variant="h5" >
                  {realUser?.displayName ? <>{realUser.displayName}, your balance:</> : ("Your balance:")} {newExpense?.balance} zł
                </Typography>
              </Paper>
            </Grid>

            <Grid
              item
              lg={3}
              sm={5}
              xl={3}
              xs={12}
            >
              <Paper style={{ height: '400px', maxHeight: '600px', backgroundColor: 'rgba(0,0,0,0.21)'}}>
                <Box sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap', '& > :not(style)': { m: 3, width: '100%', height: 'minContent',},}}>
                  <TextField
                    id="outlined-number"
                    label="Amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(event) => setNewExpense({...newExpense, amount: event.target.value})}
                  />
                  <TextField
                    id="outlined-password-input"
                    label="Purpose"
                    onChange={(event) => setNewExpense({...newExpense, transactionName: event.target.value})}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={newExpense.transactionType}
                      label="Type"
                      onChange={(event) => setNewExpense({...newExpense, transactionType: event.target.value})}
                    >
                      <MenuItem value="expense">Expense</MenuItem>
                      <MenuItem value="income">Income</MenuItem>
                    </Select>
                  </FormControl>
                  <button onClick={handleChange}>Dodaj</button>
                </Box>
              </Paper>
            </Grid>

            <Grid
              item
              lg={9}
              sm={7}
              xl={9}
              xs={12}
            >
              <Paper style={{ height: '400px', maxHeight: '600px',backgroundColor: 'rgba(0,0,0,0)'}}>
                <ul> Latest Transactions
                  {newExpense.transactions.map((transaction, index) => (
                    <li key={index}>
                      <div>{transaction.name}</div>
                      <div>{transaction.transactionType === "income" ?
                        (<span className="deposit">+ {transaction.amount}</span>) :
                        (<span className="income">- {transaction.amount}</span>)}
                      </div>
                    </li>
                    )
                  )}

                </ul>

              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Expenses