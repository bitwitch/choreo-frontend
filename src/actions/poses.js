import uuid from 'uuid';  

export function addPose(lines) {
  const newPose = {lines, id: uuid()}
  return {
    type: 'ADD_POSE',
    payload: newPose 
  }
}

export function removePose(poseId) {
  return {
    type: 'REMOVE_POSE',
    payload: poseId
  }
}

export function resetPoses() {
  return { type: 'RESET_POSES' }
}

export function setCurrentPose(lines) {
  return {
    type: 'SET_CURRENT_POSE',
    payload: lines
  }
}

export function movePose(oldIndex, newIndex) {
  return {
    type: 'MOVE_POSE',
    payload: {oldIndex, newIndex}
  }
}
