import { VERIFY_KEY, UPDATE_APPOINTMENT_DATA } from '../../constants/ActionTypes';

const INIT_STATE = {
  appointmentData: {},
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case VERIFY_KEY: {
      return {
        ...state,
        appointmentData: action.payload[0],
      };
    }
    case UPDATE_APPOINTMENT_DATA: {
      return {
        ...state,
        appointmentData: action.payload[0],
      };
    }
    default:
      return state;
  }
};
