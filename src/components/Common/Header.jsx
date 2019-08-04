import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import NavigationDrawer from './NavigationDrawer';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Header(props) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const handleNavigationDrawerOpen = () => setOpen(true);
  const handleNavigationDrawerClose = () => setOpen(false);
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" className={classes.button} aria-label="open menu" onClick={handleNavigationDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Header
          </Typography>
        </Toolbar>
      </AppBar>
      <NavigationDrawer onOpen={handleNavigationDrawerOpen} onClose={handleNavigationDrawerClose} open={open}/>
    </div>
  );
}
