import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  CUSTOMER_DATA,
  WAITLIST_DATA,
  ADD_WAITLIST_DATA,
  UPDATE_WAITLIST_DATA,
  DELETE_WAITLIST_DATA,
} from '../../constants/ActionTypes';
import axios from 'util/Api';

export const getWaitlists = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/waitlists/${userId}`)
      .then(({ data }) => {
        console.log(data);
        if (data.success) {
          console.log(data);
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: WAITLIST_DATA, payload: data.result });
          dispatch({ type: CUSTOMER_DATA, payload: data.result.customer_data });
        }
      })
      .catch(function (error) {
        // console.log(error);
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addWaitlist = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/waitlist', params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_WAITLIST_DATA, payload: data.result });
          dispatch({ type: UPDATE_WAITLIST_DATA, payload: data.result });
          dispatch({ type: CUSTOMER_DATA, payload: data.result.customer_data });
        }
      })
      .catch(function (error) {
        console.log(error.message);
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const updateWaitlist = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`http://localhost:8000/waitlist`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_WAITLIST_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const deleteWaitlist = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/waitlist/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_WAITLIST_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addToWaitlistFromServed = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`http://localhost:8000/servedtowaitlist`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: WAITLIST_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
