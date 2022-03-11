import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Expenses from "./Expenses";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {signOut} from "firebase/auth";
import {authentication} from "../../Firebase/firebase";
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const drawerWidth = 240;


const DashboardContent = ({realUser, isAuth, setIsAuth}) => {

  const mdTheme = createTheme({
    palette: {
      secondary: {
        main: '#093531'
      },
      primary: {
        main: '#072623'
      }
    }}
  )


  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signUserOut = () => {
    signOut(authentication)
    .then(() => {
      localStorage.clear();
      navigate('/')
      setIsAuth(false)
    })
  }

  let navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <ThemeProvider  theme={mdTheme} >
      <Box  sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar  position="absolute" >

          <Toolbar
            sx={{
              pr: '123px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: '36px',
              }}
            >
              <MenuIcon />

            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              My Expenses
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip  title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={realUser?.photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={signUserOut}>
                  <Typography textAlign="center">Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
          style={{background: "radial-gradient(circle, rgba(16,94,89,1) 0%, rgba(4,22,19,1) 100%)", minHeight: "100vh", maxWidth:"100vw"}}
        >
          <Toolbar  />
          <Container sx={{ mt: 0, mb: 0 }}>
            <Expenses realUser={realUser}/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardContent