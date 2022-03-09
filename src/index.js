import React from 'react'
import ReactDOM from 'react-dom'
import "./index.scss"
import PageAfterOrBeforeLogIn from "./SignIn/PageAfterOrBeforeLogIn";


const App = () => {

  return (
    <>
      <div style={{backgroundImage: 'url("https://i.ibb.co/j89gQJQ/background.jpg")', backgroundSize: "cover", height: "100vh"}}>
        <PageAfterOrBeforeLogIn/>
      </div>
    </>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"))