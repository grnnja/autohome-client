import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import NavigationDrawerContent from './NavigationDrawerContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: 240,
  },
}));

const NavigationDrawer = (props) => {
  const { onClose, onOpen, open } = props;
  const classes = useStyles(props);
  return (
    <div>
      <Hidden mdUp>
        <SwipeableDrawer
          onClose={onClose}
          onOpen={onOpen}
          open={open}
        >
          <NavigationDrawerContent />
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          onClose={onClose}
          onOpen={onOpen}
          open={open}
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
