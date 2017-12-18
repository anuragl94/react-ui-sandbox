import React, { Component } from 'react'
import { getNestedState, updateStateRecursively } from './stateManagement'

import './style.css'

function JSONfromString (str) {
  try {
    var o = JSON.parse(str)
    if (o && typeof o === 'object') {
      return o
    }
  } catch (e) { }
  return false
};

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      string: JSON.stringify(props.value, 2, 2)
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (e) {
    e.preventDefault()
    let { props } = this
    this.setState({
      string: e.target.value
    })
    let state = JSONfromString(e.target.value)
    if (state && props.onChange) {
      props.onChange({
        value: state
      })
    }
  }
  componentWillReceiveProps (newProps) {
    newProps.value && this.setState({
      string: JSON.stringify(newProps.value, 2, 2)
    })
  }
  render () {
    return (
      <div className='Editor'>
        <div className='container'>
          <textarea
            value={this.state.string}
            onChange={this.handleChange}
            onKeyDown={e => {
              if (e.keyCode === 9) {
                e.preventDefault()
              }
            }}
          />
          <pre className='ghost'>
            {this.state.string}
          </pre>
        </div>
      </div>
    )
  }
}

export default Editor

function generateStateBindings (keys = []) {
  // The context must be bound to the component that uses it
  return {
    value: getNestedState.call(this, keys),
    onChange: (value) => { updateStateRecursively.call(this, keys, value) }
  }
}

export {
  generateStateBindings
}
