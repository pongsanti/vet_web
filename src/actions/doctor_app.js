import { createAction } from 'redux-actions';
import config from '../config'
import { fetchHeader, fetchOption, postOption,
  patchOption,
  fetchPromise } from './helper';
import {fetchErrorMessageHandler, dispatchWithLoadingSpinner, dispatchWithLoadingSpinnerOff} from './common';

export const d_app_get = createAction('D_APP_GET');
export const d_app_get_recv = createAction('D_APP_GET_RECV');
export const d_app_fail = createAction('D_APP_FAIL');

export const d_app_post = createAction('D_APP_POST');
export const d_app_post_recv = createAction('D_APP_POST_RECV');

export const d_app_del = createAction('D_APP_DEL');
export const d_app_del_recv = createAction('D_APP_DEL_RECV');

export const doctorAppGet = () => {
  return (dispatch, getState) => {
    const {user} = getState();

    dispatchWithLoadingSpinner(dispatch, d_app_get());
    return fetchPromise(`${config.URL}/doctor/apps`, fetchOption(fetchHeader(), 'GET'))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, d_app_get_recv(json));
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, d_app_fail)
    );
  }
}

export const doctorAppPost = (doctor_id, postData) => {
  return (dispatch, getState) => {

    dispatchWithLoadingSpinner(dispatch, d_app_post());
    return fetchPromise(`${config.URL}/doctor/${doctor_id}/apps`, postOption(fetchHeader(), JSON.stringify(postData)))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, d_app_post_recv(json));
      // dispatch route
      // history.push('/users');
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, d_app_fail)
    );
  }
}

export const doctorAppDelete = (id) => {
  return (dispatch, getState) => {

    dispatchWithLoadingSpinner(dispatch, d_app_del());
    return fetchPromise(`${config.URL}/doctor/apps/${id}`, fetchOption(fetchHeader(), 'DELETE'))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, d_app_del_recv());
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, d_app_fail)
    );
  }
}