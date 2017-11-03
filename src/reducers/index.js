import { combineReducers } from 'redux';
import noti from './noti';
import ui from './ui';
import doctor from './doctor';
import vehicle from './vehicle';

const rootReducer = combineReducers({
  noti,
  ui,
  doctor,
  vehicle,
});

export default rootReducer;
