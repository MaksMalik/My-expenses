import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import {ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Divider from "@mui/material/Divider";

export const ExpensesList = ({filterByFilterCategoryAndTypeAndNameAndAmount, handleOpenEdit, handleOpenDelete}) => {



  return (
    <List>
      {filterByFilterCategoryAndTypeAndNameAndAmount.map((transaction, index) => (
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
              {(transaction.category === 'Food') && <RestaurantIcon style={{color: "#fff"}} />}
              {(transaction.category === 'Car') && <DirectionsCarIcon style={{color: "#fff"}} />}
              {(transaction.category === 'Bills') && <ReceiptIcon style={{color: "#fff"}} />}
              {(transaction.category === 'Travel') && <FlightIcon style={{color: "#fff"}} />}
              {(transaction.category === 'Gift') && <CardGiftcardIcon style={{color: "#fff"}} />}
            </ListItemAvatar>
            <ListItemText
              primary={<div style={{textTransform: 'uppercase', color:"#fff"}}>{transaction.name}</div>}
              secondary={transaction.type === "income"
                ? (<span className="income" style={{color:"#fff"}}>+ {transaction.amount} zł</span>)
                : (<span className="expense" style={{color:"#fff"}}>- {transaction.amount} zł</span>)}
            />
          </ListItem>
        </div>
      ))}
    </List>
  )
}
