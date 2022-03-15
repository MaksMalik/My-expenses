// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField, ThemeProvider
// } from "@mui/material";
// import Button from "@mui/material/Button";
// import * as React from "react";
// import {createTheme} from "@mui/material/styles";
// import {useState} from "react";
//
//
//  const DialogNewCategory = ({openNewCategory, setCategories, handleCloseNewCategory}) => {
//
//   const theme = createTheme({
//     palette: {
//       secondary: {
//         main: '#0098bc'
//       },
//       primary: {
//         main: 'rgb(0,153,189)'
//       }
//     }}
//   )
//
//   const [newCategoryState, setNewCategoryState] = useState()
//   const handleAddNewCategory = () => {
//     setCategories((categories) => ([...categories, newCategoryState]))
//     handleCloseNewCategory()
//   }
//
//
//   return (
//     <ThemeProvider theme={theme}>
//       <div>
//         <Dialog
//           open={openNewCategory}
//           onClose={handleCloseNewCategory}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle style={{backgroundColor:"rgb(255,255,255)", color:"rgb(0,153,189)"}} id="alert-dialog-title">
//             {"Add new category"}
//           </DialogTitle>
//           <DialogContent style={{backgroundColor:"rgb(255,255,255)", marginTop: "10px"}}>
//
//             <TextField
//               style={{padding:"10px"}}
//               fullWidth
//               id="outlined-password-input"
//               label="New category"
//               onChange={(event) => setNewCategoryState(event.target.value)}
//             />
//
//           </DialogContent >
//           <DialogActions style={{backgroundColor:"rgb(255,255,255)", color:"#0099bd"}}>
//             <Button style={{ color:"#0099bd"}} onClick={handleAddNewCategory} autoFocus>Add</Button>
//             <Button style={{color:"#0099bd"}} onClick={handleCloseNewCategory} >Cancel</Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </ThemeProvider>
//   )
// }
// export default DialogNewCategory
