import * as React from 'react';
import {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  Dialog, DialogActions,
  DialogContent, DialogTitle,
  FormControl,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Select,
  TextField
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {db} from "../../Firebase/firebase";
import {collection, addDoc, onSnapshot, updateDoc, doc, deleteField, deleteDoc } from "firebase/firestore"
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Divider from "@mui/material/Divider";




const Expenses = ({realUser,}) => {
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState()
  const [transactionType, setTransactionType] = useState('income')
  const [transactionCategory, setTransactionCategory] = useState('bills')
  const [transactionName, setTransactionName] = useState()
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)


  const transactionCollection = collection(db, 'Transactions/users/' + realUser?.uid)

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange =  async () => {
    if (transactionType && transactionName && amount && transactionCategory) {
      await addDoc(transactionCollection, {
        id: (transactions.length === 0 ? 1 : transactions.slice(-1).pop().id + 1),
        name: transactionName,
        type: transactionType,
        amount: amount,
        category: transactionCategory,
        income: (transactionType === 'income' ? income + parseFloat(amount) : income),
        expense: (transactionType === 'expense' ? expense + parseFloat(amount) : expense),
        user_id: `${realUser?.uid}`,
        balance: (transactionType === 'income' ? balance + parseFloat(amount) : balance - parseFloat(amount))
      })
      setOpen(false)
    }
  }

  useEffect(() => {
    const sub = onSnapshot(collection(db, "Transactions/users/" + realUser?.uid), (snapshot) => {
      let mySnapShot = (snapshot.docs.map(doc => doc.data()))
      setTransactions((mySnapShot.sort((a, b) => {
        return a.id - b.id
      })))
      const newBalance = (mySnapShot.sort((a, b) => {
        return a.id - b.id
      })).slice(-1).pop()?.balance
      setBalance(!newBalance ? 0 : newBalance)

      const newIncome = (mySnapShot.sort((a, b) => {
        return a.id - b.id
      })).slice(-1).pop()?.income
      setIncome(!newIncome ? 0 : newIncome)

      const newExpense = (mySnapShot.sort((a, b) => {
        return a.id - b.id
      })).slice(-1).pop()?.expense
      setExpense(!newExpense ? 0 : newExpense)
    })
    return() => sub()
  }, [realUser?.uid])


  const handleDelete = async (transaction) => {
    const docRef = doc(db, "Transactions/users/" + realUser?.uid + "/" + transaction.id)
    console.log(docRef.id)
    await deleteDoc(docRef)
    .then(() => {
      console.log("teded")
    })
  }

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
            <Grid
              item
              lg={8}
              sm={12}
              xl={8}
              xs={12}
            >
              <Paper style={{ maxHeight: 'minContent', padding:"30px", backgroundColor: 'rgba(0,0,0,0.21)'}}>
                <Typography style={{textTransform:"uppercase",color: "rgba(255,255,255,0.85)", textAlign: "center"}} variant="h4" >
                  {realUser?.displayName ? <>{realUser.displayName} <Divider /> Balance:</> : ("Your" +
                    " balance:")} {balance} zł
                </Typography>
              </Paper>
            </Grid>



            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle style={{backgroundColor:"rgba(12,55,52,1)", color:"#fff"}} id="alert-dialog-title">
                  {"Add new transaction"}
                </DialogTitle>
                <DialogContent style={{background: "linear-gradient(180deg, rgba(12,55,52,1) 0%, rgb(5,28,24) 100%)"}}>
                  <TextField
                    style={{padding:"10px"}}
                    fullWidth
                    id="outlined-number"
                    label="Amount"
                    type="number"
                    onChange={(event) =>  setAmount(event.target.value)}
                  />

                  <TextField
                    style={{padding:"10px"}}
                    fullWidth
                    id="outlined-password-input"
                    label="Purpose"
                    onChange={(event) => setTransactionName(event.target.value)}
                  />

                  <FormControl fullWidth style={{padding:"10px"}}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={transactionType}
                      label="Type"
                      onChange={(event) => setTransactionType(event.target.value)}
                    >
                      <MenuItem value="expense">Expense</MenuItem>
                      <MenuItem value="income">Income</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{padding:"10px"}}
                  >
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={transactionCategory}
                      label="Category"
                      onChange={(event) => setTransactionCategory(event.target.value)}
                    >
                      <MenuItem value="bills">Bills</MenuItem>
                      <MenuItem value="food">Food</MenuItem>
                      <MenuItem value="car">Car</MenuItem>
                      <MenuItem value="travel">Travel</MenuItem>
                      <MenuItem value="gift">Gift</MenuItem>
                    </Select>
                  </FormControl>

                </DialogContent >
                <DialogActions style={{backgroundColor:"rgb(5,28,24)", color:"#fff"}}>
                  <Button style={{ color:"#fff"}} onClick={handleChange} autoFocus>Add</Button>
                  <Button style={{color:"#fff"}} onClick={handleClose} autoFocus>Cancel</Button>
                </DialogActions>
              </Dialog>
            </div>




            <Grid
              item
              lg={7}
              sm={12}
              xl={7}
              xs={12}
            >
              <Box display="flex" style={{paddingBottom:"30px", justifyContent: 'center'}}>
                <Grid
                  item
                  lg={4}
                  sm={12}
                  xl={4}
                  xs={10}
                >
                  <Paper style={{ height:"minContent", marginLeft:"20px", marginRight:"10px", backgroundColor: 'rgb(13,77,44)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">INCOME</Typography>

                    <Typography style={{paddingBottom:"15px"}} variant="h4">{income} zł</Typography>

                  </Paper>
                </Grid>
                <Grid
                  item
                  lg={4}
                  sm={12}
                  xl={4}
                  xs={10}
                >
                  <Paper style={{ height:"minContent", marginRight:"20px", marginLeft:"10px", backgroundColor: 'rgba(93,19,15,0.46)', color:"#fff", textAlign: 'center', paddingTop:"20px"}}>
                    <Typography variant="h7">EXPENSES</Typography>
                    <Typography style={{paddingBottom:"15px"}} variant="h4">{expense} zł</Typography>

                  </Paper>
                </Grid>
              </Box>


              <Paper style={{ height:"minContent", backgroundColor: 'rgba(0,0,0,0.21)'}}>
                <Box sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap', '& > :not(style)': { m: 3, width: '100%', height: 'minContent',},}}>
                  <Grid item xs={12} md={12}>

                    <Button style={{color:"#fff"}} variant="outlined" onClick={handleClickOpen}>
                      Add new transaction
                    </Button>


                    <TextField
                      fullWidth
                      id="outlined-password-input"
                      label="Search"
                      onChange={() => console.log("Hejka")}
                    />

                    <List>
                      {transactions.map((transaction, index) => (
                        <div key={index}>
                          <Divider/>
                          <ListItem
                            style={{backgroundColor:`${transaction.type === "income" ? "rgba(25,145,21,0.25)" : "rgba(145,21,21,0.35)"}`}}
                            secondaryAction={
                            <IconButton edge="end" onClick={() => handleDelete(transaction)}>
                              <DeleteIcon style={{color: "#fff"}} />
                            </IconButton>
                          }
                          >
                            <ListItemAvatar>
                              {(transaction.category === 'food') &&
                                <RestaurantIcon style={{color: "#fff"}} />
                              }
                              {(transaction.category === 'car') &&
                                <DirectionsCarIcon style={{color: "#fff"}} />
                              }
                              {(transaction.category === 'bills') &&
                                <FlightIcon style={{color: "#fff"}} />
                              }
                              {(transaction.category === 'travel') &&
                                <FlightIcon style={{color: "#fff"}} />
                              }
                              {(transaction.category === 'gift') &&
                                <CardGiftcardIcon style={{color: "#fff"}} />
                              }
                            </ListItemAvatar>
                            <ListItemText
                              primary={<div style={{textTransform: 'uppercase', color:"#fff"}}>{transaction.name}</div>}
                              secondary={transaction.type === "income" ?
                                (<span style={{color:"#fff"}}>+ {transaction.amount} zł</span>) :
                                (<span style={{color:"#fff"}}>- {transaction.amount} zł</span>)}
                            />
                          </ListItem>
                        </div>
                      ))}
                    </List>
                  </Grid>



                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Expenses