import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
  slider: {
    paddingLeft: 1,
  },
});

export default function TemperatureInput() {
  const minTemperature = 0;
  const maxTemperature = 40;
  const classes = useStyles();
  const [value, setValue] = React.useState(30);


  const sendTemperatureChangeRequest = (temperature) => {
    axios.post(`http://${process.env.SERVER_ADDRESS}/heater/goalTemperature`, {
      goalTemperature: temperature,
    });
  };
  const handleSliderChange = (event, newValue) => {
    // TODO: add debouncing so that the server doesnt get spammed with requests
    setValue(newValue);
    sendTemperatureChangeRequest(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    sendTemperatureChangeRequest(event.target.value);
  };

  const handleBlur = () => {
    if (value < minTemperature) {
      setValue(minTemperature);
    } else if (value > maxTemperature) {
      setValue(maxTemperature);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Temperature
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            min={minTemperature}
            max={maxTemperature}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            className={classes.slider}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: minTemperature,
              max: maxTemperature,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}