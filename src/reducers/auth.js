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
  },
  tokens : {
    access: null, 
    refresh: null
  }
} 

export default function authReducer(state=defaultState, action) {
  switch(action.type) {
    case 'LOGIN_USER': 
      return {...state, ...action.payload}
    case 'LOGOUT_USER': 
      return {...state, ...action.payload}
    case 'SET_ACCESS_TOKENS':
      return {...state, tokens: {access: action.payload.access, refresh: action.payload.refresh} }
    default: 
      return state
  }
}
