import { combineReducers } from 'redux';
import search from './search';
import fetch from './fetch';

const rootReducer = combineReducers({
  search,
  fetch
});

export default rootReducer;
