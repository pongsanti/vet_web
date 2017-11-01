import { combineReducers } from 'redux';
import noti from './noti';
import ui from './ui';
import doctor from './doctor';

const rootReducer = combineReducers({
  noti,
  ui,
  doctor,
});

export default rootReducer;
