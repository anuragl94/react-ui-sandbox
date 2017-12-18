/* State change bindings */
// When using these methods, bind them to component's own context
const getNestedState = function (keys) {
  keys = [...keys]
  let stateReference = this.state
  while (keys.length) {
    if (stateReference && (['boolean', 'string', 'number'].indexOf(typeof stateReference[keys[0]]) > -1)) {
      return stateReference[keys[0]]
    } else if (stateReference && (stateReference[keys[0]] || stateReference[keys[0]] === '')) {
      stateReference = stateReference[keys.shift()]
    } else {
      return null
    }
  }
  return stateReference
}

const updateStateRecursively = function (keys, value) {
  /*
    Just a method that can be used to update deeply nested state as well
    For example
    this.state['variants']['0']['price'] = value
    can be written as
    updateStateRecursively(['variants', 0, 'price'], value)
  */
  keys = [...keys.reverse()]
  this.setState(function (prevState) {
    let newState = Object.assign({}, prevState)
    let propertyToChange = newState
    while (keys.length) {
      if (keys.length === 1) {
        let lastKey = keys.pop()
        propertyToChange[lastKey] = value
        break
      } else {
        let key = keys.pop()
        // If the next key doesn't exist in the object, create an empty obj/arr
        let nextKey = keys.slice(-1).shift()
        if (nextKey !== undefined && propertyToChange[key] === undefined) {
          if (typeof nextKey === 'number') {
            propertyToChange[key] = []
          } else {
            propertyToChange[key] = {}
          }
        }
        propertyToChange = propertyToChange[key]
      }
    }
    console.info(JSON.parse(JSON.stringify(newState)))
    return newState
  })
}
/* End of state change bindings */

export {
  getNestedState,
  updateStateRecursively
}
