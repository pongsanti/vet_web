import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  is_fetching: false,
  apps: [],
  error: null,
}

const handleFetchStart = (state, action) => ({
  ...state,
  is_fetching: true,
  error: null
})

const handleFetchRecv = (state, action) => ({
  ...state,
  is_fetching: false,
  error: null,
})

const reducer = handleActions({
  [ActionTypes.v_app_get]: handleFetchStart,
  [ActionTypes.v_app_post]: handleFetchStart,
  [ActionTypes.v_app_del]: handleFetchStart,
  [ActionTypes.v_app_get_recv]: (state, action) => ({
    ...state,
    is_fetching: false,
    apps: action.payload.apps,
    error: null,
  }),
  [ActionTypes.v_app_post_recv]: handleFetchRecv,
  [ActionTypes.v_app_del_recv]: handleFetchRecv,  
  [ActionTypes.v_app_fail]: (state, action) => ({
    ...state,
    is_fetching: false,
    error: action.payload,
  }),
}, defaultState);

export default reducer;
