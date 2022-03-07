import React from 'react'
import ReactDOM from 'react-dom'
import "./index.scss"

import SignIn from "./SignIn/signin";

const App = () => {

  return (
    <>
      <header style={{
        backgroundImage: 'url("https://i.ibb.co/R6q5MK7/vecteezybackground-white-hs0821-generated.jpg")', backgroundSize: "cover"
      }}>
        <h1 style={{textAlign: "center", paddingTop: "60px", fontWeight: "bold", fontSize: "40px"}}>MY EXPENSES</h1>
        <SignIn/>

      </header>

    </>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"))