const baseURL = 'http://localhost:3000/api/v1'

export function saveChoreography(user_id, name, choreo) {
  const body = {user_id: user_id, name: name, poses_json: JSON.stringify(choreo)};
  return fetch(`${baseURL}/choreographies`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers()
  }).then(res => res.json()); 
}

export function fetchChoreography(id) {
  return fetch(`${baseURL}/choreographies/${id}`, {
    headers: headers()
  }).then(res => res.json())
}

export function fetchFriend(id) {
  return fetch(`${baseURL}/users/${id}`, {
    headers: headers() 
  }).then(res => res.json())
}

export class AuthAdapter {
  static login(loginParams) {
    return fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static signUp(signUpParams) {
    return fetch(`${baseURL}/users`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(signUpParams)
    }).then(res => res.json())
  }

  static currentUser() {
    return fetch(`${baseURL}/current_user`, {
      headers: headers()
    }).then(res => res.json())
  }
}

function headers() {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  }
}