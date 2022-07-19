import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  TASK_DATA,
  ADD_TASK_DATA,
  UPDATE_TASK_DATA,
  DELETE_TASK_DATA,
  ADD_REPORT,
  GET_REPORT_DATA,
  DELETE_DESCRIPTION_DATA,
} from '../../constants/ActionTypes';
import axios from 'util/Api';

export const getTasks = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/tasks/${userId}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: TASK_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        const { response } = error;
        // console.log(error)
        dispatch({ type: FETCH_ERROR, payload: response.data });
      });
  };
};
export const addTask = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/task', params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_TASK_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        const { response } = error;
        dispatch({ type: FETCH_ERROR, payload: response.data });
      });
  };
};

export const updateTask = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`http://localhost:8000/task`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_TASK_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        const { response } = error;
        dispatch({ type: FETCH_ERROR, payload: response.data });
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/task/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_TASK_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        const { response } = error;
        dispatch({ type: FETCH_ERROR, payload: response.data });
      });
  };
};
export const deleteDescription = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/task/deleteDescription/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_DESCRIPTION_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        const { response } = error;
        dispatch({ type: FETCH_ERROR, payload: response.data });
      });
  };
};
export const changeTaskProgress = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/task/changeProgress`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_TASK_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        const { response } = error;
        dispatch({ type: FETCH_ERROR, payload: response.data });
      });
  };
};
export const  getDescriptionReportData= (description_id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/task/reports/${description_id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_REPORT_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const addDescriptionReport = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/task/addReport`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_REPORT, payload: data.result });
        }
      })
      .catch(function (error) {
        console.log(error)
        const { response } = error;
        dispatch({ type: FETCH_ERROR, payload: response.data });
      });
  };
}
