import { combineReducers } from 'redux';
import tasks from './tasks';
import filter from './filter';
import messages from './messages';

const rootReducer = combineReducers({ 
  tasks, 
  filter, 
  messages
});

export default rootReducer;