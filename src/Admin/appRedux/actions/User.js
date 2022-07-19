import {
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_ERROR,
    USER_DATA,
    ADD_USER_DATA,
    UPDATE_USER_DATA,
    DELETE_USER_DATA,
    ALL_USER_DATA
  } from '../../constants/ActionTypes';
  import axios from 'util/Api';
  import { message } from 'antd';
  
  export const getUsers = (userId) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      return axios
        .get(`http://localhost:8000/users/${userId}`)
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: USER_DATA, payload: data.result });
          }
        })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    };
  };
  export const getAllUsers = () => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      return axios
        .get('http://localhost:8000/allUsers')  
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: ALL_USER_DATA, payload: data.result });
          }
        })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    };
  };
  export const addUser = (params) => {
    return (dispatch) => {
      console.log(params)
  
      dispatch({ type: FETCH_START });
      return axios
        .post('http://localhost:8000/user', params)
        
        .then(({ data }) => {
          console.log(data)
          if (data.success) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: ADD_USER_DATA, payload: data.result });
          }
        })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    };
  };
  
  export const updateUser = (id, params) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      console.log(params)
      return axios
        .put(`http://localhost:8000/user/${id}`, params)
        
        .then(({ data }) => {
          console.log(data)
          if (data.success) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: UPDATE_USER_DATA, payload: data.result });
          }    
  
        })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    };
  };
  
  export const deleteUser = (id) => {
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      return axios
        .delete(`http://localhost:8000/user/${id}`)
        .then(({ data }) => {
          if (data.success) {
            dispatch({ type: FETCH_SUCCESS });
            dispatch({ type: DELETE_USER_DATA, payload: data.result });
          }
        })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    };
  };
  
  export const addWaitlists = (params) => {
    console.log(params)
    return (dispatch) => {
      dispatch({ type: FETCH_START });
      return axios
        .post(`http://localhost:8000/user/addWaitlists/${params.user_id}`,params)
        .then(({ data }) => {
          console.log("Success");
          if (data.success) {
            dispatch({ type: FETCH_SUCCESS });
            message.success('Added successfully!');
          }
          else{{
            message.error('User not found');
          }}
        })
        .catch(function (error) {
          dispatch({ type: FETCH_ERROR, payload: error.message });
        });
    };
  };
  