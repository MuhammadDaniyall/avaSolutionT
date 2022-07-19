import {
  WAITLIST_DATA,
  ADD_WAITLIST_DATA,
  UPDATE_WAITLIST_DATA,
  DELETE_WAITLIST_DATA,
} from '../../constants/ActionTypes';

const INIT_STATE = {
  waitlistData: null,
  servedData: null,
  priorityData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case WAITLIST_DATA: {
      return {
        ...state,
        waitlistData: action.payload.waitlist_data,
        servedData: action.payload.served_data,
        priorityData: action.payload.priority_data,
      };
    }
    case ADD_WAITLIST_DATA: {
      return {
        ...state,
        waitlistData: action.payload.waitlist_data,
        servedData: action.payload.served_data,
      };
    }
    case UPDATE_WAITLIST_DATA: {
      return {
        ...state,
        waitlistData: action.payload.waitlist_data,
        servedData: action.payload.served_data,
      };
    }
    case DELETE_WAITLIST_DATA: {
      return {
        ...state,
        waitlistData: state.waitlistData.filter((item) => item.id != action.payload),
        servedData: state.servedData.filter((item) => item.id != action.payload),
      };
    }
    default:
      return state;
  }
};
