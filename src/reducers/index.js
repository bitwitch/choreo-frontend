import { combineReducers } from 'redux'; 
import jointReducer from './joints';
import poseReducer from './poses';
import authReducer from './auth'; 

const rootReducer = combineReducers({
  joints: jointReducer,
  poses: poseReducer,
  auth: authReducer
});

export default rootReducer; 
