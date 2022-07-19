import {
  STAFF_DATA,
  ADD_STAFF_DATA,
  UPDATE_STAFF_DATA,
  DELETE_STAFF_DATA,
} from '../../constants/ActionTypes';

const INIT_STATE = {
  staffData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case STAFF_DATA: {
      return {
        ...state,
        staffData: action.payload,
      };
    }
    case ADD_STAFF_DATA: {
      return {
        ...state,
        staffData: [...state.staffData, action.payload],
      };
    }
    case UPDATE_STAFF_DATA: {
      return {
        ...state,
        staffData: state.staffData.map((item) => (item.id === action.payload.id ? action.payload : item)),
      };
    }
    case DELETE_STAFF_DATA: {
      return {
        ...state,
        staffData: state.staffData.filter((item) => item.id != action.payload),
      };
    }
    default:
      return state;
  }
};
