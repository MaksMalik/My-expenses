import React from 'react'
import Dashboard from "./DashBoard";
import {signOut} from "firebase/auth";
import {authentication} from "../Firebase/firebase";

const AfterSignIn = ({data}) => {

  const LogOut = () => {
    signOut(authentication)
    .then(() => {
      console.log("Logged out")
    })
    .catch(error => {
      console.log(error)
    })
  }


  return (
    <>
      <Dashboard data={data} LogOut={LogOut}/>
    </>
  )
}

export default AfterSignIn