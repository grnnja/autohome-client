import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
  },
}));

const NavigationDrawerContent = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.drawer}>
      <Typography>
        content
      </Typography>
    </div>
  );
};

export default NavigationDrawerContent;
