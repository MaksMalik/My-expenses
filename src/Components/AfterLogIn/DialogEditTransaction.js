import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField, ThemeProvider
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import * as React from "react";
import {createTheme} from "@mui/material/styles";


const DialogEditTransaction = ({editTransaction, open, handleClose, setAmount, setTransactionName, setTransactionType, setTransactionCategory, handleEdit, transactionCategory, transactionType}) => {

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#0098bc'
      },
      primary: {
        main: 'rgb(0,153,189)'
      }
    }}
  )


  return (
    <ThemeProvider theme={theme}>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{backgroundColor:"rgb(255,255,255)", color:"rgb(0,153,189)"}} id="alert-dialog-title">
            {"Edit transaction"}
          </DialogTitle>
          <DialogContent style={{backgroundColor:"rgb(255,255,255)", marginTop: "10px"}}>
            <TextField
              style={{padding:"10px", marginTop:"10px"}}
              fullWidth
              id="outlined-number"
              label="Amount"
              type="number"
              value={editTransaction.amount}

              onChange={(event) =>  setAmount(event.target.value)}
            />
            <TextField
              style={{padding:"10px"}}
              fullWidth
              id="outlined-password-input"
              label="Purpose"
              value={editTransaction.name}
              onChange={(event) => setTransactionName(event.target.value)}
            />
            <FormControl fullWidth style={{padding:"10px"}}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editTransaction.type}
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
                value={editTransaction.category}
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
          <DialogActions style={{backgroundColor:"rgb(255,255,255)", color:"#0099bd"}}>
            <Button style={{ color:"#0099bd"}} onClick={handleEdit} autoFocus>Edit</Button>
            <Button style={{color:"#0099bd"}} onClick={handleClose} autoFocus>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
export default DialogEditTransaction
