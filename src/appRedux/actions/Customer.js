import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  CUSTOMER_DATA,
  ADD_CUSTOMER_DATA,
  UPDATE_CUSTOMER_DATA,
  DELETE_CUSTOMER_DATA,
  ALL_CUSTOMER_DATA
} from '../../constants/ActionTypes';
import axios from 'util/Api';
import { message } from 'antd';

export const getCustomers = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/customers/${userId}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: CUSTOMER_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addCustomer = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/customer', params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_CUSTOMER_DATA, payload: data.result });
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
    console.log(params)
    return axios
      .put(`http://localhost:8000/customer/${id}`, params)
      
      .then(({ data }) => {
        console.log(data)
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_CUSTOMER_DATA, payload: data.result });
        }    

      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const deleteCustomer = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/customer/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_CUSTOMER_DATA, payload: data.result });
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
      .post(`http://localhost:8000/customer/addWaitlists/${params.user_id}`,params)
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
