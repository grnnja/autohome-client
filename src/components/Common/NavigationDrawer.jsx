import React from 'react';
import { SwipeableDrawer, Typography } from '@material-ui/core';

const NavigationDrawer = (props) => {
  const { onClose, onOpen, open } = props;
  return (
    <div>
      <SwipeableDrawer
        onClose={onClose}
        onOpen={onOpen}
        open={open}
      >
        <Typography color="inherit">
          NavigationDrawer
        </Typography>
      </SwipeableDrawer>
    </div>
  );
};

export default NavigationDrawer;
