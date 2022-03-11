import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import "./index.scss"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './New/Pages/Login'
import Register from './New/Pages/Register'
import {onAuthStateChanged, signOut} from "firebase/auth";
import {authentication} from "./Firebase/firebase";
import Home from "./New/Pages/Home";
import ForgotPassword from "./New/Pages/ForgotPassword";
import DashboardContent from "./New/Pages/DashboardContent";

const App = () => {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  const [realUser, setRealUser] = useState({})


  const signUserOut = () => {
    signOut(authentication)
    .then(() => {
      localStorage.clear();
      setIsAuth(false)
      window.location.href="/login"
    })
  }

  useEffect(() => {
    onAuthStateChanged(authentication, (currentUser) => {
      setRealUser(currentUser)
    })
  }, [])


  return (
    <>
      <div  style={{background: "radial-gradient(circle, rgba(16,94,89,1) 0%, rgba(4,22,19,1) 100%)", minHeight: "100vh"}}>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
            <Route path="/dashboard" element={<DashboardContent setIsAuth={setIsAuth} signUserOut={signUserOut} isAuth={isAuth} realUser={realUser}/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"))

