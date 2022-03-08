import React from 'react'
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const AfterLogin = ({data, LogOut}) => {
  return (
    <Container  maxWidth="xs">
      <h1 style={{textAlign: "center", paddingTop: "20px", paddingBottom: "20px"}}>Welcome {data?.displayName}</h1>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 0, mb: 2 }}
        onClick={LogOut}>Logout
      </Button>
    </Container>
  )
}


export default AfterLogin