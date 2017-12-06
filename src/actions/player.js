export function addPlayer(player) {
  return {
    type: 'ADD_PLAYER',
    payload: player
  }
}

export function play() {
  return {
    type: 'PLAY'
  }
}

export function stop() {
  return {
    type: 'STOP'
  }
}