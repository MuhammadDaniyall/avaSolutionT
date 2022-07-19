import {
  INIT_URL,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  CONFIRM_MANAGER_DATA,
  CONFIRM_RESOURCE_DATA,
  USER_TOKEN_SET,
  AUTH_MSG_STATUS,
  SHOW_MESSAGE,
} from '../../../constants/ActionTypes';
import axios from 'util/Api';

import socketIo, { Socket } from 'socket.io-client';

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

export const userSignUp = ({ firstname, lastname, email, password }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/auth/signup', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          localStorage.setItem('user', JSON.stringify(data.result));
          axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;
          dispatch({ type: USER_DATA, payload: data.result });
          dispatch({ type: USER_TOKEN_SET, payload: data.accessToken });
        } else {
          dispatch({ type: AUTH_MSG_STATUS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const managerSignUp = ({ name, email, password, id }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('auth/managersignup', {
        name: name,
        email: email,
        password: password,
        manager_id: id,
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          localStorage.setItem('user', JSON.stringify(data.result));
          axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;
          dispatch({ type: USER_DATA, payload: data.result });
          dispatch({ type: USER_TOKEN_SET, payload: data.accessToken });
        } else {
          dispatch({ type: AUTH_MSG_STATUS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const resourceSignUp = ({ name, email, password, id }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('auth/resourcesignup', {
        name: name,
        email: email,
        password: password,
        resource_id: id,
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          localStorage.setItem('user', JSON.stringify(data.result));
          axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;
          dispatch({ type: USER_DATA, payload: data.result });
          dispatch({ type: USER_TOKEN_SET, payload: data.accessToken });
        } else {
          dispatch({ type: AUTH_MSG_STATUS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const userSignIn = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/auth/signin', {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          localStorage.setItem('user', JSON.stringify(data.result));
          // var tmpSocket = socketIo(SERVER + "/?id=" + data.result.id);
          // tmpSocket.to(data.result.businessID).emit('addUser', data);
          axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;
          dispatch({ type: USER_DATA, payload: data.result });
          dispatch({ type: USER_TOKEN_SET, payload: data.accessToken });
        } else {
          dispatch({ type: AUTH_MSG_STATUS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const managerConfirmById = ({ id }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('auth/confirmbyid', {
        id: id,
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          dispatch({ type: CONFIRM_MANAGER_DATA, payload: data.result });
        } else {
          dispatch({ type: CONFIRM_MANAGER_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const resourceConfirmById = ({ id }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('auth/resource_confirmbyid', {
        id: id,
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          dispatch({ type: CONFIRM_RESOURCE_DATA, payload: data.result });
        } else {
          dispatch({ type: CONFIRM_RESOURCE_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const googleSignIn = ({ token, googleID, profileObj }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('auth/google_signin', {
        token: token,
        googleID: googleID,
        profileObj: profileObj,
      })
      .then(({ data }) => {
        if (data.result) {
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          localStorage.setItem(
            'user',
            JSON.stringify({
              id: data.user.id,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              email: data.user.email,
              email_verified_at: data.user.email_verified_at,
            }),
          );
          axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_DATA, payload: data.user });
          dispatch({ type: USER_TOKEN_SET, payload: data.accessToken });
        }
      })
      .catch(function (error) {
        const { response } = error;
        dispatch({ type: FETCH_ERROR, payload: response.data });
      });
  };
};

export const userForgot = ({ email }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('auth/forgot', {
        email: email,
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) dispatch({ type: SHOW_MESSAGE, payload: data.message });
        else dispatch({ type: AUTH_MSG_STATUS, payload: data.result });
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('auth/me')
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          localStorage.setItem('user', JSON.stringify(data.result));
          axios.defaults.headers.common.Authorization = 'Bearer ' + data.accessToken;
          dispatch({ type: USER_DATA, payload: data.result });
          dispatch({ type: USER_TOKEN_SET, payload: data.accessToken });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common.Authorization;
    dispatch({ type: FETCH_SUCCESS });
    dispatch({ type: SIGNOUT_USER_SUCCESS });
  };
};

// export const userConfirm = token => {
//   return (dispatch) => {
//     dispatch({ type: FETCH_START });
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     delete axios.defaults.headers.common['Authorization'];
//     dispatch({ type: SIGNOUT_USER_SUCCESS });
//     return axios.get(`auth/confirm/${token}`)
//       .then(({ data }) => {
//         if (data.result) {
//           dispatch({ type: FETCH_SUCCESS });
//           dispatch({ type: SHOW_MESSAGE, payload: data.message });
//         } else {
//           dispatch({ type: FETCH_ERROR, payload: data.error });
//         }
//       }).catch(function (error) {
//         dispatch({ type: FETCH_ERROR, payload: error.message });
//       });
//   }
// }

export const resendEmail = (user) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`auth/resend`, {
        id: user.id,
        name: user.name,
        email: user.email,
      })
      .then(({ data }) => {
        if (data.result) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const resetPassword = ({ password }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`auth/reset`, {
        password: password,
      })
      .then(({ data }) => {
        dispatch({ type: FETCH_SUCCESS });
        if (data.success) {
          dispatch({ type: SHOW_MESSAGE, payload: data.message });
          dispatch({ type: SIGNOUT_USER_SUCCESS });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const tokenValidation = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`auth/token_validation`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
