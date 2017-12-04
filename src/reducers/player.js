export default function (state=null, action) {
  switch(action.type) {
    case 'ADD_PLAYER': 
      return action.payload
    default: 
      return state
  }
}