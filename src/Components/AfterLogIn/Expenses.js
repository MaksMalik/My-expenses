import * as React from 'react';
import {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, ListItem, ListItemAvatar,ListItemText, Select} from "@mui/material";
import {db} from "../../Firebase/firebase";
import {collection, onSnapshot, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore"
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Divider from "@mui/material/Divider";
import DialogNewTransaction from "./DialogNewTransaction";
import {Copyright} from "../Copyright";
import DialogEditTransaction from "./DialogEditTransaction";
import DialogDeleteTransaction from "./DialogDeleteTransaction";
import MenuItem from "@mui/material/MenuItem";

const Expenses = ({realUser, balance, setBalance, expense, setExpense, income, setIncome, transactions, setTransactions}) => {

  /// ADD NEW TRANSACTION  / DIALOG NEW TRANSACTION

  const [amount, setAmount] = useState()
  const [transactionType, setTransactionType] = useState('income')
  const [transactionCategory, setTransactionCategory] = useState('bills')
  const [transactionName, setTransactionName] = useState()
  const [ID, setID] = useState(1)

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange =  async () => {
    if (transactionType && transactionName && amount && transactionCategory) {
      await setDoc(doc(db, `Transactions/users/${realUser?.uid}/${ID + 1}`), {
        id: (transactions.length === 0 ? 1 : transactions.slice(-1).pop().id + 1),
        name: transactionName,
        type: transactionType,
        amount: amount,
        category: transactionCategory,
        income: (transactionType === 'income' ? parseFloat(amount) : 0),
        expense: (transactionType === 'expense' ? parseFloat(amount) : 0),
        user_id: `${realUser?.uid}`,
        balance: (transactionType === 'income' ? balance + parseFloat(amount) : balance - parseFloat(amount))
      })
      setOpen(false)
      setTransactionName("")
      setAmount("")
    }
  }

  /// EDIT TRANSACTION  / DIALOG EDIT TRANSACTION

  const [editTransaction, setEditTransaction] = useState({})

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit =  (transaction) => {
    setOpenEdit(true);
    setEditTransaction(transaction)
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = () => {
    if (editTransaction.type && editTransaction.name && editTransaction.amount && editTransaction.category) {
      updateDoc(doc(db, `Transactions/users/${realUser?.uid}/${editTransaction.id}`), {
        id: editTransaction.id,
        name: editTransaction.name,
        type: editTransaction.type,
        amount: editTransaction.amount,
        category: editTransaction.category,
        income: (editTransaction.type === 'income' ? parseFloat(editTransaction.amount) : 0),
        expense: (editTransaction.type === 'expense' ? parseFloat(editTransaction.amount) : 0),
        user_id: `${realUser?.uid}`,
        balance: (editTransaction.type === 'income' ? balance + parseFloat(editTransaction.amount) : balance - parseFloat(editTransaction.amount))
      })
      .then(() => {
        setOpenEdit(false)
        setTransactionName("")
        setAmount("")
      })
    }
  }

  /// DELETE TRANSACTION  / DIALOG DELETE TRANSACTION

  const [deleteTransaction, setDeleteTransaction] = useState()

  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenDelete = (transaction) => {
    setOpenDelete(true)
    setDeleteTransaction(transaction.id)
  }

  const handleDelete = async () => {
    const docRef = doc(db, `Transactions/users/${realUser?.uid}/${deleteTransaction}`)
    await deleteDoc(docRef)
    setOpenDelete(false)
  }

  useEffect(() => {
    const sub = onSnapshot(collection(db, "Transactions/users/" + realUser?.uid), (snapshot) => {
      let mySnapShot = (snapshot.docs.map(doc => doc.data()))
      setTransactions((mySnapShot.sort((a, b) => {
        return a.id - b.id
      })))
      setIncome((mySnapShot.length === 0)
        ? 0
        : (mySnapShot.length === 1 ? mySnapShot.map((snap) => snap.income) : (mySnapShot.map((snap) => snap.income)).reduce((acc,total) =>  acc + total)))
      setExpense(
        (mySnapShot.length === 0)
          ? 0
          : (mySnapShot.length === 1 ? mySnapShot.map((snap) => snap.expense) : (mySnapShot.map((snap) => snap.expense)).reduce((acc,total) =>  acc + total)))
      setBalance(
        ((mySnapShot.length === 0)
          ? 0
          : (mySnapShot.length === 1 ? mySnapShot.map((snap) => snap.income) : (mySnapShot.map((snap) => snap.income)).reduce((acc,total) =>  acc + total))) -
        ((mySnapShot.length === 0)
          ? 0
          : (mySnapShot.length === 1 ? mySnapShot.map((snap) => snap.expense) : (mySnapShot.map((snap) => snap.expense)).reduce((acc,total) =>  acc + total)))
      )
      const newID = (mySnapShot.sort((a, b) => {
        return a.id - b.id
      })).slice(-1).pop()?.id
      setID(!newID ? 0 : newID)
    })
    return() => sub()
  }, [realUser?.uid, setBalance, setExpense, setIncome, setTransactions ])

  const [filterCategory, setFilterCategory] = useState('allCategories')
  const [filterType, setFilterType] = useState('allTypes')

  return (
    <>
      <DialogNewTransaction open={open} handleClose={handleClose} setAmount={setAmount} setTransactionCategory={setTransactionCategory} setTransactionType={setTransactionType} setTransactionName={setTransactionName} handleChange={handleChange} transactionType={transactionType} transactionCategory={transactionCategory}/>
      <DialogEditTransaction setEditTransaction={setEditTransaction} editTransaction={editTransaction} openEdit={openEdit} handleClose={handleCloseEdit} handleEdit={handleEdit}/>
      <DialogDeleteTransaction openDelete={openDelete} handleOpenDelete={handleOpenDelete} deleteTransaction={deleteTransaction} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete}/>

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

              <Box style={{display:"flex", justifyContent: 'center'}}>
                <Grid item lg={7} sm={7} xl={7} xs={12}>
                  <Button style={{color:"#2a7891", width:"100%", padding:"10px", marginBottom:"30px", backgroundColor:"rgba(255,255,255,0.75)"}} variant="contained" onClick={handleClickOpen}>
                    Add new transaction
                  </Button>
                </Grid>
              </Box>

              <Paper style={{ height:"minContent", backgroundColor: 'rgba(0,0,0,0.21)'}}>
                <Box sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap', '& > :not(style)': { m: 3, width: '100%', height: 'minContent',},}}>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth style={{padding:"10px"}}>
                      <InputLabel id="demo-simple-select-label">Type of transaction</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type of transaction"
                        value={filterType}
                        onChange={(event) => setFilterType(event.target.value)}
                      >
                        <MenuItem value="allTypes">All types of transaction</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth style={{padding:"10px"}}>
                      <InputLabel id="demo-simple-select-label">Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        value={filterCategory}
                        onChange={(event) => setFilterCategory(event.target.value)}
                      >
                        <MenuItem value="allCategories">All categories</MenuItem>
                        <MenuItem value="bills">Bills</MenuItem>
                        <MenuItem value="food">Food</MenuItem>
                        <MenuItem value="car">Car</MenuItem>
                        <MenuItem value="travel">Travel</MenuItem>
                        <MenuItem value="gift">Gift</MenuItem>
                      </Select>
                    </FormControl>

                    <List>
                      {((filterCategory !== 'allCategories') ? (((filterType !== 'allTypes') ? transactions.filter(transactionType => transactionType.type === `${filterType}`) : (transactions)).filter(transaction => transaction.category === `${filterCategory}`)) : ((filterType !== 'allTypes') ? transactions.filter(transactionType => transactionType.type === `${filterType}`) : (transactions))).map((transaction, index) => (
                        <div key={index}>
                          <Divider/>
                          <ListItem
                            style={{backgroundColor:`${transaction.type === "income" ? "rgb(60,151,184)" : 'rgb(67,67,67)'}`}}
                            secondaryAction={
                              <>
                                <IconButton edge="end" onClick={() => handleOpenEdit(transaction)}>
                                  <EditIcon style={{color: "rgba(255,255,255,0.84)"}} />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleOpenDelete(transaction)}>
                                  <DeleteIcon style={{color: "rgba(255,255,255,0.84)"}} />
                                </IconButton>
                              </>
                            }
                          >
                            <ListItemAvatar>
                              {(transaction.category === 'food') && <RestaurantIcon style={{color: "#fff"}} />}
                              {(transaction.category === 'car') && <DirectionsCarIcon style={{color: "#fff"}} />}
                              {(transaction.category === 'bills') && <ReceiptIcon style={{color: "#fff"}} />}
                              {(transaction.category === 'travel') && <FlightIcon style={{color: "#fff"}} />}
                              {(transaction.category === 'gift') && <CardGiftcardIcon style={{color: "#fff"}} />}
                            </ListItemAvatar>
                            <ListItemText
                              primary={<div style={{textTransform: 'uppercase', color:"#fff"}}>{transaction.name}</div>}
                              secondary={transaction.type === "income"
                                ? (<span className="income" style={{color:"#fff"}}>+ {transaction.amount} zł</span>) :
                                (<span className="expense" style={{color:"#fff"}}>- {transaction.amount} zł</span>)}
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
          <Copyright/>
        </Container>
      </Box>
    </>
  )
}

export default Expenses