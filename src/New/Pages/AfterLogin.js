import * as React from 'react';
import {authentication, db} from "../../Firebase/firebase";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBarAfterLogin from "../ResponsiveAppBarAfterLogin";
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {addDoc, collection} from 'firebase/firestore'

const AfterLogin = ({setIsAuth, realUser, isAuth}) => {


  let navigate = useNavigate()
  const [title, setTitle] = useState("")
  const createCollection = collection(db, "Expenses")


  const create = async () => {
    await addDoc(createCollection, {
      title,
      author: {name: realUser.email, id: realUser.uid}
    })
  }
  
  useEffect(() => {
    if (!isAuth) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const signUserOut = () => {
    signOut(authentication)
    .then(() => {
      localStorage.clear();
      setIsAuth(false)
      navigate('/login')
    })
  }

  return (
    <>
      <ResponsiveAppBarAfterLogin realUser={realUser} signUserOut={signUserOut}/>
      <TextField id="outlined-basic" label="Expenses" variant="outlined" onChange={(event) => {setTitle(event.target.value)}}/>
      <button onClick={create}>Send</button>
      <TextField id="outlined-basic" label="Income" variant="outlined" />
    </>
  )
}

export default AfterLogin