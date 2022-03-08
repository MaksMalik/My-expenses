import React from 'react'
import Container from "@mui/material/Container";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Box from "@mui/material/Box";

const AfterLogin = ({data, LogOut}) => {
  return (
    <>
      <ResponsiveAppBar data={data} LogOut={LogOut}/>
      <Container  maxWidth="xs">
        <Box>

        </Box>

      </Container>
    </>
  )
}

export default AfterLogin