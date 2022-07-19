import {
    USER_DATA,
    ADD_USER_DATA,
    UPDATE_USER_DATA,
    DELETE_USER_DATA,
    ALL_USER_DATA
  } from '../../constants/ActionTypes';
  
  const INIT_STATE = {
    userData: null,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case USER_DATA: {
        return {
          ...state,
         userData: action.payload,
        };
      }
      case ALL_USER_DATA: {
        return {
          ...state,
         userData: action.payload,
        };
      }
      case ADD_USER_DATA: {
        return {
          ...state,
         userData: [...state.userData, action.payload],
        };
      }
      case UPDATE_USER_DATA: {
        return {
          ...state,
         userData: state.userData.map((item) => (item.id === action.payload.id ? action.payload : item)),
        };
      }
      case DELETE_USER_DATA: {
        return {
          ...state,
          userData: state.userData.filter((item) => item.id != action.payload),
        };
      }
      default:
        return state;
    }
  };
  