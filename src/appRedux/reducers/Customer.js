import {
  CUSTOMER_DATA,
  ADD_CUSTOMER_DATA,
  UPDATE_CUSTOMER_DATA,
  DELETE_CUSTOMER_DATA,
  CUSTOMER_USER_DATA,
  ALL_CUSTOMER_DATA,
} from '../../constants/ActionTypes';

const INIT_STATE = {
  customerData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ALL_CUSTOMER_DATA: {
      return {
        ...state,
        customerData: action.payload,
      };
    }
    case CUSTOMER_DATA: {
      return {
        ...state,
        customerData: action.payload,
      };
    }
    case CUSTOMER_USER_DATA: {
      return {
        ...state,
        customerData: action.payload,
      };
    }
    case ADD_CUSTOMER_DATA: {
      return {
        ...state,
        customerData: [...state.customerData, action.payload],
      };
    }
    case UPDATE_CUSTOMER_DATA: {
      return {
        ...state,
        customerData: state.customerData.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    }
    case DELETE_CUSTOMER_DATA: {
      return {
        ...state,
        customerData: state.customerData.filter((item) => item.id != action.payload),
      };
    }
    default:
      return state;
  }
};
