import { combineReducers } from 'redux'; 
import jointReducer from './joints';
import poseReducer from './poses';

const rootReducer = combineReducers({
  joints: jointReducer,
  poses: poseReducer
});

export default rootReducer; 