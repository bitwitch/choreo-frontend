import { combineReducers } from 'redux'
import jointReducer from './joints'
import poseReducer from './poses'
import authReducer from './auth'
import choreographiesReducer from './choreographies'
import playerReducer from './player'

const rootReducer = combineReducers({
  joints: jointReducer,
  poses: poseReducer,
  auth: authReducer,
  allChoreographies: choreographiesReducer,
  player: playerReducer
});

export default rootReducer; 
