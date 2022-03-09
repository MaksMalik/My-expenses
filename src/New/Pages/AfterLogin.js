import * as React from 'react';
import {authentication} from "../../Firebase/firebase";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBarAfterLogin from "../ResponsiveAppBarAfterLogin";

const AfterLogin = ({setIsAuth, realUser}) => {


  let navigate = useNavigate()

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

    </>
  )
}

export default AfterLogin