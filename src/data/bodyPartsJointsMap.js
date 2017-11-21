export const bodyMap = {
  armLeftLower: {
    start: 'handLeft',
    stop: 'elbowLeft'
  },
  armLeftUpper: {
    start: 'elbowLeft',
    stop: 'shoulderLeft'
  },
  collarLeft: {
    start: 'shoulderLeft',
    stop: 'neck'
  },
  pelvisLeft: {
    start: 'hipLeft',
    stop: 'pelvis'
  },
  legUpperLeft: {
    start: 'kneeLeft',
    stop: 'hipLeft'
  },
  legLowerLeft: {
    start: 'footLeft',
    stop: 'kneeLeft'
  },
  armRightLower: {
    start: 'handRight',
    stop: 'elbowRight'
  },
  armRightUpper: {
    start: 'elbowRight',
    stop: 'shoulderRight'
  },
  collarRight: {
    start: 'shoulderRight',
    stop: 'neck'
  },
  pelvisRight: {
    start: 'hipRight',
    stop: 'pelvis'
  },
  legUpperRight: {
    start: 'kneeRight',
    stop: 'hipRight'
  },
  legLowerRight: {
    start: 'footRight',
    stop: 'kneeRight'
  },
  head: {
    start: 'headTop', 
    stop: 'headBottom'
  },
  neck: {
    start: 'headBottom', 
    stop: 'neck'
  },
  torso: {
    start: 'neck', 
    stop: 'pelvis'
  }
}

// export function pointsFromBodyMap() {
//   return {
//     armLeftLower: []
//   }
// }

// head
// neck
// torso 

// armLeftLower
// armLeftUpper
// shoulderLeft
// pelvisLeft
// legUpperLeft
// legLowerLeft

// armRightLower
// armRightUpper
// shoulderRight
// pelvisRight
// legUpperRight
// legLowerRight


// JOINTS: 
//   headTop
//   headBottom
//   neck
//   pelvis 

//   handLeft
//   elbowLeft
//   shoulderLeft
//   hipLeft
//   kneeLeft
//   footLeft

//   handRight
//   elbowRight
//   shoulderRight
//   hipRight
//   kneeRight
//   footRight