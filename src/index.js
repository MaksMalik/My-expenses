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

ReactDOM.render(<App/>, document.getElementById("app"))