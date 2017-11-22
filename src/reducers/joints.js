const defaultState = {
  handLeft: { x: 100, y: 138 },
  elbowLeft: { x: 111, y: 99 },
  shoulderLeft: { x: 118, y: 53 },
  hipLeft: { x: 130, y: 137 },
  kneeLeft: { x: 118, y: 192 },
  footLeft: { x: 117, y: 246 },
  handRight: { x: 207, y: 138 },
  elbowRight: { x: 193, y: 95 },
  shoulderRight: { x: 193, y: 54 },
  hipRight: { x: 178, y: 137 },
  kneeRight: { x: 197, y: 192 },
  footRight: { x: 199, y: 249 },
  headTop: { x: 155, y: 12 },
  headBottom: { x: 155, y: 42 },
  neck: { x: 155, y: 50 },
  pelvis: { x: 153, y: 137 }
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
