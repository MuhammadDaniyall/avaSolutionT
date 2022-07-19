import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE, SET_SOCKET } from '../../constants/ActionTypes';

export const fetchStart = () => {
  return {
    type: FETCH_START,
  };
};
export const setSocket = (socket) => {
  return {
    type: SET_SOCKET,
    payload: socket,
  };
};
export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS,
  };
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error,
  };
};

export const showMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
