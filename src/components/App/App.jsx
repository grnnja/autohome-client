import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import axios from 'axios';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';

import Header from '../Common/Header';

export default function App() {
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
  let theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#272727',
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
    },
  });
  theme = responsiveFontSizes(theme);
  console.log('theme in app', theme)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
      </Router>
    </ThemeProvider>
  );
}
// }
