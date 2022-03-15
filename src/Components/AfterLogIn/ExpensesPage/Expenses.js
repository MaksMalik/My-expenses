import * as React from 'react';
import {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {db} from "../../../Firebase/firebase";
import {collection, onSnapshot, doc, deleteDoc, setDoc, updateDoc } from "firebase/firestore"
import ExpensesDialogNewTransaction from "./ExpensesDialogNewTransaction";
import ExpensesDialogEditTransaction from "./ExpensesDialogEditTransaction";
import ExpensesDialogDeleteTransaction from "./ExpensesDialogDeleteTransaction";
import {ExpensesFilter} from "./ExpensesFilter";
import {ExpensesList} from "./ExpensesList";
import {ExpensesButtonAddNewTransaction} from "./ExpensesButtonAddNewTransaction";

const Expenses = ({categories, realUser, balance, setBalance, setExpense, setIncome, transactions, setTransactions}) => {

  /// ADD NEW TRANSACTION  / DIALOG NEW TRANSACTION
  const [amount, setAmount] = useState()
  const [transactionType, setTransactionType] = useState('income')
  const [transactionCategory, setTransactionCategory] = useState('Bills')
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
      let mySnapShot = (snapshot.docs.map(childSnapshot => childSnapshot.data()))
      setTransactions((mySnapShot.sort((a, b) => {
        return a.id - b.id
      })))
      const mappedAndReducedMySnapShotIncome =
        (mySnapShot.map((snap) => snap.income).length === 0
          ? 0
          : mySnapShot.map((snap) => snap.income).reduce((acc,total) =>  acc + total))
      const mappedAndReducedMySnapShotExpense =
        (mySnapShot.map((snap) => snap.expense).length === 0
          ? 0
          : mySnapShot.map((snap) => snap.expense).reduce((acc,total) =>  acc + total))
      setIncome(mappedAndReducedMySnapShotIncome)
      setExpense(mappedAndReducedMySnapShotExpense)
      setBalance(mappedAndReducedMySnapShotIncome - mappedAndReducedMySnapShotExpense)
      const newID = (mySnapShot.sort((a, b) => {
        return a.id - b.id
      })).slice(-1).pop()?.id
      setID(!newID ? 0 : newID)
    })
    return() => sub()
  }, [realUser?.uid, setBalance, setExpense, setIncome, setTransactions ])


  /// FILTER TRANSACTION

  const [filterCategory, setFilterCategory] = useState('AllCategories')
  const [filterType, setFilterType] = useState('allTypes')
  const [filterName, setFilterName] = useState()
  const [filterAmount, setFilterAmount] = useState()

  const filterByFilterType = (filterType !== 'allTypes')
    ? transactions.filter(transaction => transaction.type === `${filterType}`)
    : transactions

  const filterByFilterCategoryAndType = (filterCategory !== 'AllCategories')
    ? filterByFilterType
    .filter(transaction => transaction.category === `${filterCategory}`)
    : filterByFilterType

  const filterByFilterCategoryAndTypeAndName = (!filterName)
    ? filterByFilterCategoryAndType
    : (filterByFilterCategoryAndType.filter(transaction => transaction.name.toLowerCase().includes(`${filterName}`)))

  const filterByFilterCategoryAndTypeAndNameAndAmount = (!filterAmount)
    ? filterByFilterCategoryAndTypeAndName
    : (filterByFilterCategoryAndTypeAndName.filter(transaction => transaction.amount.includes(`${filterAmount}`)))

  return (
    <>
      <ExpensesDialogNewTransaction categories={categories} open={open} handleClose={handleClose} setAmount={setAmount} setTransactionCategory={setTransactionCategory} setTransactionType={setTransactionType} setTransactionName={setTransactionName} handleChange={handleChange} transactionType={transactionType} transactionCategory={transactionCategory}/>
      <ExpensesDialogEditTransaction categories={categories} setEditTransaction={setEditTransaction} editTransaction={editTransaction} openEdit={openEdit} handleClose={handleCloseEdit} handleEdit={handleEdit}/>
      <ExpensesDialogDeleteTransaction openDelete={openDelete} handleOpenDelete={handleOpenDelete} deleteTransaction={deleteTransaction} handleCloseDelete={handleCloseDelete} handleDelete={handleDelete}/>

      <ExpensesButtonAddNewTransaction handleClickOpen={handleClickOpen}/>

      <Paper style={{ height:"minContent", backgroundColor: 'rgba(0,0,0,0.21)'}}>
        <Box sx={{display: 'flex',justifyContent: 'center',flexWrap: 'wrap', '& > :not(style)': { m: 3, width: '100%', height: 'minContent',},}}>
          <Grid item xs={12} md={12}>

            <ExpensesFilter setFilterName={setFilterName} setFilterAmount={setFilterAmount} setFilterCategory={setFilterCategory} filterCategory={filterCategory} filterType={filterType} setFilterType={setFilterType} categories={categories}/>

            <ExpensesList filterByFilterCategoryAndTypeAndNameAndAmount={filterByFilterCategoryAndTypeAndNameAndAmount}  handleOpenEdit={handleOpenEdit} handleOpenDelete={handleOpenDelete}/>

          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default Expenses