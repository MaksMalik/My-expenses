import React from 'react'
// import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "./ResponsiveAppBar";

const AfterLogin = ({data, LogOut}) => {
  return (
    <>
      <ResponsiveAppBar data={data} LogOut={LogOut}/>)
      <Container  maxWidth="xs">
        <h1 style={{textAlign: "center", paddingTop: "20px", paddingBottom: "20px"}}>Welcome {data?.displayName}</h1>
      </Container>
    </>
  )
}


export default AfterLogin