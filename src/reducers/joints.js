const defaultState = {
  handLeft: { x: 50 , y: 150 },
  elbowLeft: { x: 60, y: 100}
};

export default function jointReducer(state=defaultState, action) {
  
  switch(action.type) {
    case 'MOVE_JOINT':
      const {name, x, y} = action.payload;
      return {...state, [name]: {x, y}}
    default: 
      return state; 
  }
}

// JOINTS: 
// headTop
// headBottom
// neck
// pelvis 

// handLeft
// elbowLeft
// shoulderLeft
// hipLeft
// kneeLeft
// footLeft

// handRight
// elbowRight
// shoulderRight
// hipRight
// kneeRight
// footRight
