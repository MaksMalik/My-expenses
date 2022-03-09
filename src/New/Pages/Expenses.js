import * as React from 'react';
import {TextField} from "@mui/material";
import {useState} from "react";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../Firebase/firebase";

const Expenses = ({realUser}) => {

  const [title, setTitle] = useState("")
  const createCollection = collection(db, "Expenses")


  const create = async () => {
    await addDoc(createCollection, {
      title,
      author: {name: realUser.email, id: realUser.uid}
    })
  }

  return (
    <>
      <TextField id="outlined-basic" label="Expenses" variant="outlined" onChange={(event) => {setTitle(event.target.value)}}/>
      <button onClick={create}>Send</button>
      <TextField id="outlined-basic" label="Income" variant="outlined" />
    </>
  )
}

export default Expenses