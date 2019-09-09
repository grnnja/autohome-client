import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import NavigationDrawerContent from './NavigationDrawerContent';

const useStyles = makeStyles(theme => ({
  root: {
  },
  drawer: {
  },
  drawerPaper: {
    width: theme.drawerWidth,
  },
}));

const NavigationDrawer = (props) => {
  const { onClose, onOpen, open } = props;
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Hidden smUp>
        <SwipeableDrawer
          disableDiscovery
          onClose={onClose}
          onOpen={onOpen}
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <NavigationDrawerContent />
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>
        {/* I have not idea why and it wasnt in the material ui documentation but if you dont put
        classes={{
          paper: classes.drawerPaper
        }}
        with classes.drawerpaper styled with width: 240 (or however big the drawe is), the scrollbar
        on the drawer goes over the size of the drawer and obscures text
        this was in the example drawer from material ui but not mentioned in any of the documentation
        i could find. I've never used this classes thing so idk why it is used here */}
        <Drawer
          variant="persistent"
          anchor="left"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <NavigationDrawerContent />
        </Drawer>
      </Hidden>
    </div>
  );
};

NavigationDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default NavigationDrawer;
