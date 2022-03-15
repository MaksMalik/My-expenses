import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import DashboardSidebar from "./DashboardSidebar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {signOut} from "firebase/auth";
import {authentication} from "../../../Firebase/firebase";
import {useNavigate} from "react-router-dom";

const theme = createTheme({
  palette: {
    secondary: {
      main: '#434343'
    },
    primary: {
      main: 'rgb(67,67,67)'
    }
  }}
)

export const DashboardAppBar = ({realUser, setIsStatistics, setIsProfile}) => {

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let navigate = useNavigate()

  const signUserOut = () => {
    signOut(authentication)
    .then(() => {
      localStorage.clear();
      navigate('/')
    })
  }


  return (
    <>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar style={{display: 'flex', justifyContent: 'space-between', backgroundColor:"rgb(67,67,67)" }}>
            <DashboardSidebar setIsProfile={setIsProfile} setIsStatistics={setIsStatistics}/><img style={{height:"30px"}} src="https://i.ibb.co/091ZV3C/White.png" alt="My Expenses"/><Box sx={{ flexGrow: 0 }}>
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
              <MenuItem onClick={()=> setIsProfile(true)} >
                <Typography textAlign="center">Profile
                </Typography>
              </MenuItem>
              <MenuItem onClick={signUserOut}>
                <Typography textAlign="center">Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box></Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
}