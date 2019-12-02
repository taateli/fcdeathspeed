import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import players from './players';

export default combineReducers({
  auth,
  alert,
  players
});
