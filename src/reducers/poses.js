export default function poseReducer(state={list: [], currentPose: []}, action) {
  switch(action.type) {
    case 'ADD_POSE': 
      return {...state, list: [...state.list, action.payload]};

    case 'REMOVE_POSE':
      return {...state, list: state.list.filter(pose => pose.id !== action.payload) };

    case 'SET_CURRENT_POSE':
      return {...state, currentPose: action.payload}

    default: 
      return state; 
  }
}
