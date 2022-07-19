import { TASK_DATA, ADD_TASK_DATA, UPDATE_TASK_DATA, DELETE_TASK_DATA, ADD_REPORT, GET_REPORT_DATA,DELETE_DESCRIPTION_DATA } from '../../constants/ActionTypes';

const INIT_STATE = {
  taskData: null,
  reportData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TASK_DATA: {
      return {
        ...state,
        taskData: action.payload,
      };
    }
    case ADD_TASK_DATA: {
      return {
        ...state,
        taskData: [...state.taskData, action.payload],
      };
    }
    case UPDATE_TASK_DATA: {
      return {
        ...state,
        taskData: state.taskData.map((item) => item.id == action.payload.id ? action.payload : item),
      };
    }
    case DELETE_TASK_DATA: {
      return {
        ...state,
        taskData: state.taskData.filter((item) => item.id != action.payload),
      };
    }
    case DELETE_DESCRIPTION_DATA: {
      return {
        ...state,
        taskData: state.taskData.map((item) => item.id == action.payload.id ? action.payload : item),
      };
    }
    case ADD_REPORT: {
      return {
        ...state,
        reportData: [...state.reportData , action.payload],
      }
    }
    case GET_REPORT_DATA: {
      return {
        ...state,
        reportData: action.payload
      }
    }
    default:
      return state;
  }
};
