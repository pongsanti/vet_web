import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  noti: null,
  clear: false
}

const reducer = handleActions({
  [ActionTypes.noti_add]: (state, action) => ({
    ...state,
    noti: action.payload
  }),
  [ActionTypes.noti_reset]: (state, action) => (defaultState),
  [ActionTypes.noti_clear]: (state, action) => ({
    noti: defaultState.noti,
    clear: true,
  }),
}, defaultState);

export default reducer;
