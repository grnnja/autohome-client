import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import NavigationDrawer from './NavigationDrawer';

const useStyles = makeStyles(theme => {
  console.log('theme', theme);
  ({

})});

export default function Header(props) {
  const classes = useStyles(props);
  console.log('root class', classes);
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Header
          </Typography>
        </Toolbar>
      </AppBar>
      <NavigationDrawer />
    </div>
  );
};
