import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR, VERIFY_KEY } from '../../constants/ActionTypes';
import axios from 'util/Api';

export const getKeyValidation = (key) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`appointment/${key}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: VERIFY_KEY, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const updateAppointment = (appointmentType, params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`appointment/${appointmentType}`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: VERIFY_KEY, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
