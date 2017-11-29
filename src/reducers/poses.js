export default function poseReducer(state={list: [], currentPose: []}, action) {
  switch(action.type) {
    case 'ADD_POSE': 
      return {...state, list: [...state.list, action.payload]};

    case 'REMOVE_POSE':
      return {...state, list: state.list.filter(pose => pose.id !== action.payload) };

    case 'SET_CURRENT_POSE':
      return {...state, currentPose: action.payload}

    case 'MOVE_POSE':
      const { oldIndex, newIndex } = action.payload
      const newList = [] 
      for (let i=0; i<state.list.length; i++) {
        if (i === newIndex) {
          newList.push(state.list[oldIndex]) 
        } else if (i === oldIndex) {
          newList.push(state.list[newIndex])
        } else {
          newList.push(state.list[i])
        }
      }
      return {...state, list: newList}

    case 'RESET_POSES': 
      return {list: [], currentPose: []}

    default: 
      return state; 
  }
}
