import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import TemperatureInput from './TemperatureInput';
import FanToggle from './FanToggle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  gridContainer: {
    container: true,
    spacing: 2,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <h1>
          env
        </h1>
        {process.env.SERVER_ADDRESS}
        <Grid
          container
          spacing={3}
          direction="column"
        >
          <Grid item xs>
            <TemperatureInput />
          </Grid>
          <Grid item xs>
            <FanToggle />
          </Grid>
        </Grid>
      </div>
      dashboard content dashboard contentdashboard contentdashboard c
      ontentdashboard contentdashboard contentdashboard contentdashbo
      ard contentdashboard contentdashboard content
    </>
  );
};

export default Dashboard;
