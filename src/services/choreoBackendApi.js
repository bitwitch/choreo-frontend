export function login(params) {
  return fetch('https://localhost:3000/login', {
    method: 'POST', 
    body: JSON.stringify(params),
  }).then(res => res.json())
}

