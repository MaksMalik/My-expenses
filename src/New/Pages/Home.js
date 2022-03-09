import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://my-expenses-final.netlify.app/">
        My expenses
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();




export default function Home() {

  let navigate = useNavigate()

  const MoveToLogin = () => {
    navigate('/login')
  }

  const MoveToRegister = () => {
    navigate('/register')
  }

  return (
    <>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              My Expenses
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Box
            sx={{
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Welcome to<br></br>My Expenses
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non dignissim leo, egestas suscipit dolor. Aenean turpis lectus, elementum id sagittis nec, malesuada ac neque. Nullam luctus vulputate ipsum. Mauris nec arcu convallis, varius tortor vel, egestas neque. Donec sollicitudin congue eros sed tincidunt.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={MoveToLogin}>Sign In</Button>
                <Button variant="outlined" onClick={MoveToRegister}>Sign Up</Button>
              </Stack>
            </Container>
          </Box>

        </main>
        <Box sx={{ p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
          </Typography>
          <Copyright />
        </Box>
      </ThemeProvider>
    </>
  );
}