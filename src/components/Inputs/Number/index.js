import React from 'react'

export default function Number (props) {
  return (
    <input type='number'
      value={props.value}
      onChange={e => { props.onChange && props.onChange(e.target.value) }}
    />
  )
}
