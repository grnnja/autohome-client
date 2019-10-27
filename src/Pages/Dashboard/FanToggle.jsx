import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';

const useStyles = makeStyles({
  switch: {
  },
});

export default function FanToggle() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const sendFanChangeRequest = (control) => {
    axios.post(`http://${process.env.SERVER_ADDRESS}/heater/fan/control`, {
      status: control ? 1 : 0,
    });
  };

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
    sendFanChangeRequest(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Fan
      </Typography>
      <Switch
        checked={checked}
        onChange={handleSwitchChange}
        className={classes.switch}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}