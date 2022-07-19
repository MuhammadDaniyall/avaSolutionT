import { BOOKING_DATA, ADD_BOOKING_DATA, UPDATE_BOOKING_DATA, DELETE_BOOKING_DATA } from '../../constants/ActionTypes';

const INIT_STATE = {
  bookingData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case BOOKING_DATA: {
      return {
        ...state,
        bookingData: action.payload,
      };
    }
    case ADD_BOOKING_DATA: {
      return {
        ...state,
        bookingData: action.payload,
      };
    }
    case DELETE_BOOKING_DATA: {
      return {
        ...state,
        bookingData: state.bookingData.filter((item) => item.id != action.payload),
      };
    }
    default:
      return state;
  }
};
