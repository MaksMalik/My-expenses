import * as React from 'react';
import {authentication} from "../../Firebase/firebase";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import ResponsiveAppBarAfterLogin from "../ResponsiveAppBarAfterLogin";
import {useEffect, useState} from "react";
import Statistics from "./Statistics";
import Expenses from "./Expenses";

const AfterLogin = ({setIsAuth, realUser, isAuth}) => {

  const [displayStatistics, setDisplayStatistics] = useState(true)

  let navigate = useNavigate()
  
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
      <ResponsiveAppBarAfterLogin realUser={realUser} signUserOut={signUserOut} setDisplayStatistics={setDisplayStatistics}/>
      {displayStatistics ? <Expenses realUser={realUser}/> : <Statistics/>}
    </>
  )
}

export default AfterLogin