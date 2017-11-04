import { combineReducers } from 'redux';
import noti from './noti';
import ui from './ui';
import doctor from './doctor';
import vehicle from './vehicle';
import doctor_app from './doctor_app';

const rootReducer = combineReducers({
  noti,
  ui,
  doctor,
  vehicle,
  doctor_app,
});

export default rootReducer;
