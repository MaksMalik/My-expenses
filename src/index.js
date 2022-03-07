import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import "./index.scss"

import SignIn from "./SignIn/signin";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
    <>
      <SignIn/>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"))