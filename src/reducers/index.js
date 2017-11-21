import { combineReducers } from 'redux'; 
import jointReducer from './joints';

const rootReducer = combineReducers({
  joints: jointReducer
});

export default rootReducer; 