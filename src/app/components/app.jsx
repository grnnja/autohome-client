import React, { Component } from 'react'
import axios from 'axios';
import './app.css'
import Slider from '@material-ui/lab/Slider'
import Button from '@material-ui/core/Button'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 1000, button: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
  }

  handleChange(event, value) {
    this.setState({...this.state, value })
  }

  handleEnd() {
    const { value } = this.state
    axios.get(`http://192.168.1.82:3000/interval/${JSON.stringify(value)}`)
  }

  handleButton(){
    this.setState(button)
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <div className="red-background">
          test
          12345
          <br />
          {JSON.stringify(value)}
          <br />
          <Slider className="slider" min={500} max={2500} value={value} onChange={this.handleChange} step={50} onDragEnd={this.handleEnd} />
        </div>
        <Button variant="outlined">
          toggle
        </Button>
      </div>
    )
  }
}

export default App
