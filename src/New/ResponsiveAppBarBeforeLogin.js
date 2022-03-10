import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: '#093531'
    },
    primary: {
      main: '#072623'
    }
  }}
)

const ResponsiveAppBarBeforeLogin = () => {

  return (
    <AppBar theme={theme} position="static">
      <Container maxWidth="m">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            My Expenses
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            My Expenses
          </Typography>


        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBarBeforeLogin;