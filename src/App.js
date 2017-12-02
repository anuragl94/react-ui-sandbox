import React, { Component } from 'react'
import Editor, { changeHandler } from './lib/Editor'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Welcome to React UI Sandbox',
      logo_url: logo,
      rotation_speed: '20000ms'
    }
  }
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={this.state.logo_url} className='App-logo' alt='logo'
            style={{
              'animationDuration': this.state.rotation_speed
            }}
          />
          <h1 className='App-title'>{this.state.title}</h1>
        </header>
        <div className='App-intro'>
          <Editor state={this.state} onChange={changeHandler.bind(this)} />
        </div>
      </div>
    )
  }
}

export default App
