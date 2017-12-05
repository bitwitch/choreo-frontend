export default function playerReducer(state=null, action) {
  switch(action.type) {
    case 'ADD_PLAYER': 
      return action.payload
    default: 
      return state
  }
}