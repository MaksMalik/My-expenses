import {
  Dialog,
  DialogActions,
  DialogTitle,
  ThemeProvider
} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {createTheme} from "@mui/material/styles";


const ExpensesDialogDeleteTransaction = ({ handleCloseDelete, handleDelete, openDelete}) => {

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
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{backgroundColor:"rgb(255,255,255)", color:"rgb(0,153,189)"}} id="alert-dialog-title">
            {"Do you want to delete this transaction?"}
          </DialogTitle>
          <DialogActions style={{backgroundColor:"rgb(255,255,255)", color:"#0099bd"}}>
            <Button style={{ color:"#0099bd"}} onClick={handleDelete} autoFocus>Delete</Button>
            <Button style={{color:"#0099bd"}} onClick={handleCloseDelete} autoFocus>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}
export default ExpensesDialogDeleteTransaction
