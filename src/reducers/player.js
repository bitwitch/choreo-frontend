export default function playerReducer(state={instance: null, playing: false}, action) {
  switch(action.type) {
    case 'ADD_PLAYER': 
      return {...state, instance: action.payload}

    case 'PLAY':
      return {...state, playing: true}

    case 'STOP':
      return {...state, playing: false}
      
    default: 
      return state
  }
}