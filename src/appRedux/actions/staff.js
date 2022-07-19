import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  STAFF_DATA,
  ADD_STAFF_DATA,
  UPDATE_STAFF_DATA,
  DELETE_STAFF_DATA,
} from '../../constants/ActionTypes';
import axios from 'util/Api';
import { message } from 'antd';

export const getStaff = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/staff/${userId}`)
      .then(({ data }) => {
        console.log('got it');
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: STAFF_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addStaff = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/staff', params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_STAFF_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const updateCustomer = (id, params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`http://localhost:8000/staff/${id}`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_STAFF_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const deleteStaff = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/staff/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_STAFF_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addWaitlists = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`customer/addWaitlists`,params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          message.success('Added successfully!');
        }
        else{{
          message.error('Customer not found');
        }}
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
