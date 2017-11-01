import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  load: false,
}

const reducer = handleActions({
  [ActionTypes.ui_load]: (state, action) => ({
    ...state,
    load: true
  }),
  [ActionTypes.ui_load_close]: (state, action) => (defaultState),
}, defaultState);

export default reducer;
