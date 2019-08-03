import React, { useState } from 'react';
import { SwipeableDrawer, Typography } from '@material-ui/core';

const NavigationDrawer = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <SwipeableDrawer
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
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
