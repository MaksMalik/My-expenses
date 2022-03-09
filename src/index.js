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

const App = () => {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  const [realUser, setRealUser] = useState({})

  onAuthStateChanged(authentication, (currentUser) => {
    setRealUser(currentUser)
  })


  console.log(isAuth)

  return (
    <>
      <div style={{backgroundImage: 'url("https://i.ibb.co/8DRKvkg/background.jpg")', backgroundSize:"cover", minHeight: "100vh"}}>

        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
            <Route path="/register" element={<Register/>}/>
            {/*<Route path="/statistics/" element={<Statistics realUser={realUser}/>}/>*/}
            <Route path="/expenses" element={<AfterLogin setIsAuth={setIsAuth} realUser={realUser} isAuth={isAuth}/>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"))

