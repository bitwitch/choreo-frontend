export default function choreographiesReducer(state=[], action) {
  switch(action.type) {
    case 'STORE_CHOREOGRAPHIES': 
      return action.payload
    default: 
      return state
  }
}