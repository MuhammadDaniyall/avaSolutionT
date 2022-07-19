import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  BOOKING_DATA,
  CUSTOMER_DATA,
  ADD_BOOKING_DATA,
  UPDATE_BOOKING_DATA,
  DELETE_BOOKING_DATA,
} from '../../constants/ActionTypes';
import axios from 'util/Api';

export const getBookingData = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/booking/${userId}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: BOOKING_DATA, payload: data.result.booking_data });
          dispatch({ type: CUSTOMER_DATA, payload: data.result.customer_data });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addBookingData = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
    .post('http://localhost:8000/booking', params)
    .then(({ data }) => {
      if (data.success) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: BOOKING_DATA, payload: data.result });
      }
    })
    .catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
    });
  };
};

export const updateBookingData = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`http://localhost:8000/booking`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: BOOKING_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const deleteBookingData = (bookingId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/booking/${bookingId}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_BOOKING_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
