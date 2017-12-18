import React, { Component } from 'react'
import Editor, { generateStateBindings } from '../Editor'
import { Text, Number } from '../Inputs'

import './style.css'

const mapping = {
  1: Text,
  2: Number
}

const sampleData = {
  name: 'Anurag',
  age: 23
}

const sampleUI = {
  name: 1,
  age: 2
}

class Sandbox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {...sampleData},
      ui: {...sampleUI}
    }
    this.generateStateBindings = generateStateBindings.bind(this)
  }
  render () {
    return (
      <div className='Sandbox'>
        <div className='flex-container'>
          <div className='state-view'>
            <h3>State</h3>
            <Editor {...this.generateStateBindings(['data'])} />
          </div>
          <div className='state-view'>
            <h3>UI components</h3>
            {/* <pre className='json-block'>{JSON.stringify(this.state.ui, 2, 2)}</pre> */}
            <Editor {...this.generateStateBindings(['ui'])} />
          </div>
        </div>
        <div className='mockup-area'>
          {Object.keys(this.state.ui).map((key, index) => {
            let Input = mapping[this.state.ui[key]]
            return (
              <div className='input-wrap' key={index}>
                <Input {...this.generateStateBindings(['data', key])} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Sandbox
