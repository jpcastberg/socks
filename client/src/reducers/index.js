import { combineReducers } from 'redux';
import authReducers from './authReducers.js';
import errorReducers from './errorReducers.js';

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
});
