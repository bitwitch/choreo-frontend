export default function authReducer(state={}, action) {
  switch(action.type) {
    case 'LOGIN_USER': 
      return {...state, ...action.payload}
    case 'LOGOUT_USER': 
      return {...state, ...action.payload}
    default: 
      return state
  }
}
