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
};

export const jointChildren = {
  headTop: [],
  headBottom: ['headTop'],
  neck: ['headTop', 'headBottom', 'shoulderLeft', 'shoulderRight', 'elbowLeft', 'elbowRight', 'handLeft', 'handRight'],
  shoulderLeft: ['elbowLeft', 'handLeft'],
  shoulderRight: ['elbowRight', 'handRight'],
  elbowLeft: ['handLeft'],
  elbowRight: ['handRight'],
  handLeft: [],
  handRight: [],
  pelvis: ['headTop', 'headBottom', 'neck', 'handLeft', 'elbowLeft', 'shoulderLeft', 'hipLeft', 'kneeLeft', 'footLeft', 'handRight', 'elbowRight', 'shoulderRight', 'hipRight', 'kneeRight', 'footRight'],
  hipLeft: ['kneeLeft', 'footLeft'],
  hipRight: ['kneeRight', 'footRight'],
  kneeLeft: ['footLeft'],
  kneeRight: ['footRight'],
  footLeft: [],
  footRight: []
};

export const pivotMap = {
  headTop: {pivot: 'headBottom', radius: 20},
  headBottom: {pivot: 'neck', radius: 10},
  neck: {pivot: 'pelvis', radius: 95},
  shoulderLeft: {pivot: 'neck', radius: 24},
  shoulderRight: {pivot: 'neck', radius: 24},
  elbowLeft: {pivot: 'shoulderLeft', radius: 62},
  elbowRight: {pivot: 'shoulderRight', radius: 62},
  handLeft: {pivot: 'elbowLeft', radius: 62},
  handRight: {pivot: 'elbowRight', radius: 62},
  hipLeft: {pivot: 'pelvis', radius: 25},
  hipRight: {pivot: 'pelvis', radius: 25},
  kneeLeft: {pivot: 'hipLeft', radius: 79},
  kneeRight: {pivot: 'hipRight', radius: 79},
  footLeft: {pivot: 'kneeLeft', radius: 67},
  footRight: {pivot: 'kneeRight', radius: 67}
}

