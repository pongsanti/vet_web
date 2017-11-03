import { handleActions } from 'redux-actions';
import * as ActionTypes from '../actions'

const defaultState = {
  vehicles: null,
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
  [ActionTypes.vehicle_get]: handleFetchStart,
  [ActionTypes.vehicle_post]: handleFetchStart,
  [ActionTypes.vehicle_get_recv]: (state, action) => ({
    ...state,
    is_fetching: false,
    vehicles: action.payload.vehicles,
    error: null,
  }),
  [ActionTypes.vehicle_post_recv]: handleFetchRecv,
  // [ActionTypes.doctor_del_recv]: handleFetchRecv,  
  [ActionTypes.vehicle_fail]: (state, action) => ({
    ...state,
    is_fetching: false,
    error: action.payload,
  }),
}, defaultState);

export default reducer;
