const baseURL = 'http://localhost:3000/api/v1'

export function login(params) {
  return fetch(`${baseURL}/login`, {
    method: 'POST', 
    body: JSON.stringify(params),
  }).then(res => res.json())
}

export function saveChoreography(id, choreo) {
  const body = {user_id: id, poses_json: JSON.stringify(choreo)};

  return fetch(`${baseURL}/choreographies`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accepts: 'application/json',
      'Content-Type': 'application/json'
    }
    // JWT TOKEN / AUTH INFO 
  }).then(res => res.json())
  .then(json => console.log(json)); 
}

