const defaultState = {
  headTop: { x: 150, y: 15 },
  headBottom: { x: 150, y: 35 },
  neck: { x: 150, y: 45 },
  shoulderLeft: { x: 125, y: 47 },
  shoulderRight: { x: 175, y: 47 },
  elbowLeft: { x: 119, y: 109},
  elbowRight: { x: 181, y: 109 },
  handLeft: { x: 110, y: 170 },
  handRight: { x: 190, y: 170 },
  pelvis: { x: 150, y: 140 },
  hipLeft: { x: 125, y: 140 },
  hipRight: { x: 175, y: 140 },
  kneeLeft: { x: 135, y: 218 },
  kneeRight: { x: 165, y: 218 },
  footLeft: { x: 135, y: 285 },
  footRight: { x: 165, y: 285 }
};

export default function jointReducer(state=defaultState, action) {
  switch(action.type) {
    case 'MOVE_JOINT':
      const {name, x, y} = action.payload;
      const newJoint = { [name]: {x, y} }; 
      return {...state, ...newJoint}; 
    default: 
      return state;
  }
}
