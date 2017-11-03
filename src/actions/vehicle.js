import { createAction } from 'redux-actions';
import config from '../config'
import { fetchHeader, fetchOption, postOption,
  patchOption,
  fetchPromise } from './helper';
import {fetchErrorMessageHandler, dispatchWithLoadingSpinner, dispatchWithLoadingSpinnerOff} from './common';

export const vehicle_get = createAction('VEHICLE_GET');
export const vehicle_get_recv = createAction('VEHICLE_GET_RECV');
export const vehicle_fail = createAction('VEHICLE_FAIL');

export const vehicle_post = createAction('VEHICLE_POST');
export const vehicle_post_recv = createAction('VEHICLE_POST_RECV');

export const vehicle_del = createAction('VEHICLE_DEL');
export const vehicle_del_recv = createAction('VEHICLE_DEL_RECV');

export const vehicleGet = () => {
  return (dispatch, getState) => {
    const {user} = getState();

    dispatchWithLoadingSpinner(dispatch, vehicle_get());
    return fetchPromise(`${config.URL}/vehicles`, fetchOption(fetchHeader(), 'GET'))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, vehicle_get_recv(json));
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, vehicle_fail)
    );
  }
}

export const vehiclePost = (postData) => {
  return (dispatch, getState) => {

    dispatchWithLoadingSpinner(dispatch, vehicle_post());
    return fetchPromise(`${config.URL}/vehicles`, postOption(fetchHeader(), JSON.stringify(postData)))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, vehicle_post_recv(json));
      // dispatch route
      // history.push('/users');
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, vehicle_fail)
    );
  }
}

export const vehicleDelete = (id) => {
  return (dispatch, getState) => {

    dispatchWithLoadingSpinner(dispatch, vehicle_del());
    return fetchPromise(`${config.URL}/vehicles/${id}`, fetchOption(fetchHeader(), 'DELETE'))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, vehicle_del_recv());
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, vehicle_fail)
    );
  }
}