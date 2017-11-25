const baseURL = 'http://localhost:3000/api/v1'

export function login(params) {
  return fetch(`${baseURL}/login`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    }).then(res => res.json()).then(json => console.log(json));
}

export function saveChoreography(id, choreo) {
  const body = {user_id: id, poses_json: JSON.stringify(choreo)};

  return fetch(`${baseURL}/choreographies`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    }
    // JWT TOKEN / AUTH INFO 
  }).then(res => res.json())
  .then(json => console.log(json)); 
}

