import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  is_fetching: false,
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
  [ActionTypes.d_app_get]: handleFetchStart,
  [ActionTypes.d_app_post]: handleFetchStart,
  // [ActionTypes.doctor_del]: handleFetchStart,
  // [ActionTypes.doctor_get_recv]: (state, action) => ({
  //   ...state,
  //   is_fetching: false,
  //   doctors: action.payload.doctors,
  //   error: null,
  // }),
  [ActionTypes.d_app_post_recv]: handleFetchRecv,
  // [ActionTypes.doctor_del_recv]: handleFetchRecv,  
  [ActionTypes.d_app_fail]: (state, action) => ({
    ...state,
    is_fetching: false,
    error: action.payload,
  }),
}, defaultState);

export default reducer;
