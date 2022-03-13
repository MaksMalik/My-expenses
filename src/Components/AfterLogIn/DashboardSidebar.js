import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import {useState} from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function DashboardSidebar({setIsStatistics}) {
  const [state, setState] = useState({
    left: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };



  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{overflow: 'hidden'}}
    >
      <List style={{backgroundColor:"#434343", minHeight:"100vh", color:'#fff'}}>
        <ListItem button  onClick={() => setIsStatistics(false)}>
          <ListItemIcon style={{color:'#fff'}} >
            <DashboardIcon style={{color: "rgb(0,153,189)"}} />
          </ListItemIcon>
          <ListItemText primary="Expenses" />
        </ListItem>

        <ListItem button  onClick={() => setIsStatistics(true)}>
          <ListItemIcon style={{color:'#fff'}} >
            <BarChartIcon style={{color: "rgb(0,153,189)"}}/>
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>

      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button style={{color: 'white'}} onClick={toggleDrawer('left', true)}>
        <MenuIcon />
      </Button>
      <SwipeableDrawer
        anchor='left'
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list('left')}
      </SwipeableDrawer>
    </div>
  );
}