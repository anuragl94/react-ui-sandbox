import React, { Component } from 'react'

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
      string: JSON.stringify(props.state, 2, 2)
    }
    this.handleChange = this.handleChange.bind(this)
  }
  // componentWillReceiveProps (props) {
  //   this.setState({
  //     string: JSON.stringify(props.state, 2, 2)
  //   })
  // }
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

export function changeHandler ({ keys, value }) {
  if (!keys) {
    // If keys are specified, the state update is selectively nested
    this.setState(value)
  }
}
