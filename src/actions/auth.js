export function login_user(user) {
  return {
    type: 'LOGIN_USER', 
    payload: {loggedIn: true, user: user}
  }
}

export function logout_user() {
  return {
    type: 'LOGOUT_USER',
    payload: {loggedIn: false, user: {}}
  }
}


