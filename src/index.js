import React from 'react'
import ReactDOM from 'react-dom'
import "./index.scss"

import SignIn from "./SignIn/signin";

const App = () => {

  return (
    <>
      <SignIn/>

    </>
  )
}
// style={{backgroundImage: 'url("https://i.ibb.co/R6q5MK7/vecteezybackground-white-hs0821-generated.jpg")', backgroundSize: "cover"}}

ReactDOM.render(<App/>, document.getElementById("app"))