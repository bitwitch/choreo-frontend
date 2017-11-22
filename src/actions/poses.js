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

export function setCurrentPose(lines) {
  return {
    type: 'SET_CURRENT_POSE',
    payload: lines
  }
}
