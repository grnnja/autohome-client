import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import teal from '@material-ui/core/colors/teal';

import './App.css';
import HeaderAndNavigationDrawer from './HeaderAndNavigationDrawer';
import Settings from '../Pages/Settings/Settings';
import Dashboard from '../Pages/Dashboard/Dashboard';

const drawerWidth = 240;

const App = () => {
  const viewportIsBiggerThanSmall = useMediaQuery('(min-width:600px)');
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 1000,
  //     buttonState: false,
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleEnd = this.handleEnd.bind(this);
  //   this.handleButton = this.handleButton.bind(this);
  //   this.webSocket = new WebSocket(`ws://${process.env.CLIENT_IP}:1920`);
  // }
  // // console.log('client ip:', process.env.CLIENT_IP);

  // handleChange(event, value) {
  //   this.setState({ value });
  // }

  // handleEnd() {
  //   const { value } = this.state;
  //   axios.get(`http://${process.env.SERVER_IP}:3000/interval/${JSON.stringify(value)}`);
  // }

  // handleButton() {
  //   const { buttonState } = this.state;
  //   this.setState({ buttonState: !buttonState });
  // }

  // render() {
  //   const { value, buttonState } = this.state;
  //   return (
  //     <div>
  //       <div className="red-background">
  //         test
  //         12345
  //         <br />
  //         websocket state:
  //         {this.webSocket.readyState}
  //         <br />
  //         {JSON.stringify(value)}
  //         <br />
  //         <Slider className="slider" min={500} max={2500} value={value} onChange={this.handleChange} step={50} onDragEnd={this.handleEnd} />
  //       </div>
  //       <Button variant="outlined" onClick={this.handleButton}>
  //         toggle
  //       </Button>
  //       <br />
  //       Button state:
  //       {' '}
  //       {JSON.stringify(buttonState)}
  //     </div>
  //   );
  let darkTheme = createMuiTheme({
    drawerWidth,
    palette: {
      type: 'dark',
      primary: {
        main: teal['200'],
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      background: {
        default: '#121212',
        paper: '#1d1d1d',
      },
      typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true,
      },
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);
  let lightTheme = createMuiTheme({
    drawerWidth,
    palette: {
      type: 'light',
      primary: {
        main: teal['400'],
      },
      secondary: {
        light: '#0066ff',
        main: '#0044ff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true,
      },
      background: {
        default: '#FFF',
      },
    },
  });
  lightTheme = responsiveFontSizes(lightTheme);
  console.log('dark theme: ', darkTheme);
  return (
    <ThemeProvider theme={'dark' === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <div>
        <Router>
          <HeaderAndNavigationDrawer />
          <div className={viewportIsBiggerThanSmall ? 'router' : ''}>
            <Switch>
              <Route path="/settings" component={Settings} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
};
// }

export default App;
