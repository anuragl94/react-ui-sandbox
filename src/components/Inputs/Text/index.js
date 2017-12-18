import React from 'react'

export default function Text (props) {
  return (
    <input type='text'
      value={props.value}
      onChange={e => { props.onChange && props.onChange(e.target.value) }}
    />
  )
}
