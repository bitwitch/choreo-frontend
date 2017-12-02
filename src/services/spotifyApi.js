export function fetchSpotifySearch(term, token) {
  const queryTerm = term.split(' ').join('%20')
  return fetch(`https://api.spotify.com/v1/search?q=${queryTerm}&type=track&market=from_token`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
}

export function getAudioFeatures(id, token) {
  return fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
}