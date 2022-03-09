import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import "./index.scss"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './New/Pages/Login'
import AfterLogin from './New/Pages/AfterLogin'
import Register from './New/Pages/Register'
import {onAuthStateChanged} from "firebase/auth";
import {authentication} from "./Firebase/firebase";
import Home from "./New/Pages/Home";

const App = () => {

  const [isAuth, setIsAuth] = useState(false)
  const [realUser, setRealUser] = useState({})

  onAuthStateChanged(authentication, (currentUser) => {
    setRealUser(currentUser)
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/expenses" element={<AfterLogin setIsAuth={setIsAuth} realUser={realUser}/>}/>
        </Routes>
      </Router>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"))

