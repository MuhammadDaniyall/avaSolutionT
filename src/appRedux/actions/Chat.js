import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  CHAT_USERS,
  CHAT_CONVERSATION_DATA,
  RECEIVE_DATA,
} from 'constants/ActionTypes';
import axios from 'util/Api';

export const getUsers = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });

    return axios
      .get(`http://localhost:8000/chat/users/${userId}`)
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          dispatch({ type: CHAT_USERS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const getConversationData = (selectedId,id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/chat/${selectedId}/${id}`)
      .then(({ data }) => {
        console.log(data);
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          dispatch({ type: CHAT_CONVERSATION_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addChatData = (value) => {
  console.log(value);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/chat', value)
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          dispatch({ type: RECEIVE_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const receiveMessage = (newMessage) => {
  return (dispatch) => {
    dispatch({ type: RECEIVE_DATA, payload: newMessage });
  };
};
export const readMessage = (newMessage) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/readMessage', newMessage)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: CHAT_USERS, payload: data.result });
          dispatch({ type: RECEIVE_DATA, payload: newMessage });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
