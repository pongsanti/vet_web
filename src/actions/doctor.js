import { createAction } from 'redux-actions';
import config from '../config'
import { fetchHeader, fetchOption, postOption,
  patchOption,
  fetchPromise } from './helper';
import {fetchErrorMessageHandler, dispatchWithLoadingSpinner, dispatchWithLoadingSpinnerOff} from './common';

export const doctor_get = createAction('DOCTOR_GET');
export const doctor_get_recv = createAction('DOCTOR_GET_RECV');
export const doctor_fail = createAction('DOCTOR_FAIL');

export const doctor_post = createAction('DOCTOR_POST');
export const doctor_post_recv = createAction('DOCTOR_POST_RECV');

export const doctorGet = () => {
  return (dispatch, getState) => {
    const {user} = getState();

    dispatchWithLoadingSpinner(dispatch, doctor_get());
    return fetchPromise(`${config.URL}/doctors`, fetchOption(fetchHeader(), 'GET'))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, doctor_get_recv(json));
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, doctor_fail)
    );
  }
}

export const doctorPost = (postData) => {
  return (dispatch, getState) => {

    dispatchWithLoadingSpinner(dispatch, doctor_post());
    return fetchPromise(`${config.URL}/doctors`, postOption(fetchHeader(), JSON.stringify(postData)))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, doctor_post_recv(json));
      // dispatch route
      // history.push('/users');
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, doctor_fail)
    );
  }
}