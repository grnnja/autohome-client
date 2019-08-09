import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import NavigationDrawerContent from './NavigationDrawerContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
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
          ModalProps={{
            keepMounted: true,
          }}
        >
          <NavigationDrawerContent />
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          variant="persistent"
          anchor="left"
          open
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
