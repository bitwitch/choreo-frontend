const defaultState = {
  user: {
    info: {
      photo: {url: null},
      name: null,
      age: null, 
      location: null
    },
    friends: [],
    likes: [], 
    choreographies: []
  }
} 

export default function authReducer(state=defaultState, action) {
  switch(action.type) {
    case 'LOGIN_USER': 
      return {...state, ...action.payload}
    case 'LOGOUT_USER': 
      return {...state, ...action.payload}
    default: 
      return state
  }
}
