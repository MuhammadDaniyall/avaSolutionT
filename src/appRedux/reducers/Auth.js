import {
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  CONFIRM_DATA,
  USER_TOKEN_SET,
  AUTH_MSG_STATUS,
  CONFIRM_RESOURCE_DATA,
  CONFIRM_MANAGER_DATA,
} from '../../constants/ActionTypes';

const INIT_STATE = {
  initURL: '',
  token: JSON.parse(localStorage.getItem('token')),
  user: JSON.parse(localStorage.getItem('user')),
  authMSG: null,
  confirmData: null,
  resourceConfirm: null,
  managerConfirm: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_URL: {
      return { ...state, initURL: action.payload };
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        initURL: '',
        token: null,
        user: null,
        authMSG: null,
      };
    }
    case CONFIRM_MANAGER_DATA: {
      return {
        ...state,
        managerConfirm: action.payload,
      };
    }
    case CONFIRM_RESOURCE_DATA: {
      return {
        ...state,
        resourceConfirm: action.payload,
      };
    }
    case USER_DATA: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case CONFIRM_DATA: {
      return {
        ...state,
        confirmData: action.payload,
      };
    }
    case AUTH_MSG_STATUS: {
      return {
        ...state,
        authMSG: action.payload,
      };
    }

    default:
      return state;
  }
};
