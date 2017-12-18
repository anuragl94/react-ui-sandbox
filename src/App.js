import React, { Component } from 'react'
import Editor, { generateStateBindings } from './components/Editor'
import Sandbox from './components/Sandbox'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        title: 'Welcome to React UI Sandbox',
        logo_url: logo,
        rotation_speed: '20000ms'
      }
    }
    this.generateStateBindings = generateStateBindings.bind(this)
  }
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={this.state.data.logo_url} className='App-logo' alt='logo'
            style={{
              'animationDuration': this.state.data.rotation_speed
            }}
          />
          <h1 className='App-title'>{this.state.data.title}</h1>
        </header>
        <div className='App-intro'>
          <Editor {...this.generateStateBindings(['data'])} />
        </div>
        <hr />
        <h1>Demo</h1>
        <div id='demo'>
          <Sandbox />
        </div>
      </div>
    )
  }
}

export default App
