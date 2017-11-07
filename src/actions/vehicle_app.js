import { createAction } from 'redux-actions';
import config from '../config'
import { fetchHeader, fetchOption, postOption,
  patchOption,
  fetchPromise } from './helper';
import {fetchErrorMessageHandler, dispatchWithLoadingSpinner, dispatchWithLoadingSpinnerOff} from './common';

export const v_app_get = createAction('V_APP_GET');
export const v_app_get_recv = createAction('V_APP_GET_RECV');
export const v_app_fail = createAction('V_APP_FAIL');

export const v_app_post = createAction('V_APP_POST');
export const v_app_post_recv = createAction('V_APP_POST_RECV');

export const v_app_del = createAction('V_APP_DEL');
export const v_app_del_recv = createAction('V_APP_DEL_RECV');

export const vehicleAppGet = () => {
  return (dispatch, getState) => {
    const {user} = getState();

    dispatchWithLoadingSpinner(dispatch, v_app_get());
    return fetchPromise(`${config.URL}/vehicle/apps`, fetchOption(fetchHeader(), 'GET'))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, v_app_get_recv(json));
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, v_app_fail)
    );
  }
}

export const vehicleAppPost = (vehicle_id, postData) => {
  return (dispatch, getState) => {

    dispatchWithLoadingSpinner(dispatch, v_app_post());
    return fetchPromise(`${config.URL}/vehicle/${vehicle_id}/apps`, postOption(fetchHeader(), JSON.stringify(postData)))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, v_app_post_recv(json));
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, v_app_fail)
    );
  }
}

export const vehicleAppDelete = (id) => {
  return (dispatch, getState) => {

    dispatchWithLoadingSpinner(dispatch, v_app_del());
    return fetchPromise(`${config.URL}/doctor/apps/${id}`, fetchOption(fetchHeader(), 'DELETE'))
    .then(json => {
      dispatchWithLoadingSpinnerOff(dispatch, v_app_del_recv());
      return json;
    }, fetchErrorMessageHandler.bind(this, dispatch, v_app_fail)
    );
  }
}
