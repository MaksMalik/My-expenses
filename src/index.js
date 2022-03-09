import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import "./index.scss"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './New/Pages/Login'
import AfterLogin from './New/Pages/AfterLogin'
import Register from './New/Pages/Register'
import {onAuthStateChanged } from "firebase/auth";
import {authentication} from "./Firebase/firebase";
import Home from "./New/Pages/Home";
import Expenses from "./New/Pages/Expenses";
import Statistics from "./New/Pages/Statistics";

const App = () => {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  const [realUser, setRealUser] = useState({})

  onAuthStateChanged(authentication, (currentUser) => {
    setRealUser(currentUser)
  })

  console.log(isAuth)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/expenses/expenses" element={<Expenses/>}/>
          <Route path="/expenses/statistics" element={<Statistics realUser={realUser}/>}/>
          <Route path="/expenses" element={<AfterLogin setIsAuth={setIsAuth} realUser={realUser} isAuth={isAuth}/>}/>
        </Routes>
      </Router>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"))

