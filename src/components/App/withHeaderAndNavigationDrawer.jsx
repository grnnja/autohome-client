import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import NavigationDrawer from './NavigationDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    background: ((theme.palette.type === 'light') ? theme.palette.primary.main : theme.palette.background.paper),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
  button: {
    marginRight: theme.spacing(2),
    color: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.primary.main,
  },
  typography: {
    color: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.primary.main,
  },
  drawerHeaderTopMargin: {
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    display: 'flex',
  },
  inputComponent: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.drawerWidth,
      flexGrow: 1,
    },
  }
}));

export default function withHeaderAndNavigationBar(InputComponent) {
  return ((props) => {
    const classes = useStyles(props);
    const [open, setOpen] = useState(false);
    const handleNavigationDrawerOpen = () => setOpen(true);
    const handleNavigationDrawerClose = () => setOpen(false);
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.button}
              aria-label="open drawer"
              onClick={handleNavigationDrawerOpen}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.typography}>
              Header
            </Typography>
          </Toolbar>
        </AppBar>
        <NavigationDrawer
          onOpen={handleNavigationDrawerOpen}
          onClose={handleNavigationDrawerClose}
          open={open}
        />
        <div className={classes.drawerHeaderTopMargin} />
        <div className={classes.inputComponent}>
          <InputComponent className={classes.inputComponent} />
        </div>
      </div>
    );
  });
}
