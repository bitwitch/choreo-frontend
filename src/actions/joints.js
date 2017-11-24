export function moveJoint(name, x, y) {
  return {
    type: 'MOVE_JOINT',
    payload: {name, x, y}
  }
}

export function reset() {
  return {
    type: 'RESET'
  }
}
