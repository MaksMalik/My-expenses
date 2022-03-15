import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import "./styles/index.scss"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './Components/BeforeLogIn/Login'
import Register from './Components/BeforeLogIn/Register'
import {onAuthStateChanged, signOut} from "firebase/auth";
import {authentication} from "./Firebase/firebase";
import Home from "./Components/BeforeLogIn/Home";
import ForgotPassword from "./Components/BeforeLogIn/ForgotPassword";
import Dashboard from "./Components/AfterLogIn/Dashboard";

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
    const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
      setRealUser(currentUser)
    })
    return () => {unsubscribe()}
  }, [])

  return (
    <>
      <div  style={{background: "linear-gradient(180deg, rgba(50,151,186,1) 0%, rgba(121,169,186,1) 26%, rgba(254,255,255,1) 100%)", minHeight: "100vh", backgroundAttachment: "fixed"}}>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
            <Route path="/dashboard" element={<Dashboard setIsAuth={setIsAuth} signUserOut={signUserOut} isAuth={isAuth} realUser={realUser}/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"))

