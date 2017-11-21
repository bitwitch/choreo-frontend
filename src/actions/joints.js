export default function moveJoint(name, x, y) {
  return {
    type: 'MOVE_JOINT',
    payload: {name, x, y}
  }
}
