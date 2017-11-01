import { noti_add, noti_clear } from './noti';
import Noti from '../helpers/noti';
import { extract_string } from '../helpers/error';
import {ui_load, ui_load_close} from './ui';

const fetchErrorMessageHandler = (dispatch, action, error) => {
  const err_text = extract_string(error);
  dispatch(action(err_text));
  dispatch(noti_clear());
  dispatch(ui_load_close());
  dispatch(noti_add(Noti.notiError(err_text)));
  return Promise.reject(error);
}

const dispatchWithLoadingSpinner = (dispatch, action) => {
  dispatch(action);
  dispatch(ui_load());
};

const dispatchWithLoadingSpinnerOff = (dispatch, action) => {
  dispatch(action);
  dispatch(ui_load_close());
};

export {fetchErrorMessageHandler,
  dispatchWithLoadingSpinner,
  dispatchWithLoadingSpinnerOff};
