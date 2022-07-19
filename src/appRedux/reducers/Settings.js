import {
  RESOURCE_DATA,
  ADD_RESOURCE_DATA,
  UPDATE_RESOURCE_DATA,
  DELETE_RESOURCE_DATA,
  SERVICE_DATA,
  ADD_SERVICE_DATA,
  UPDATE_SERVICE_DATA,
  DELETE_SERVICE_DATA,
  MANAGER_DATA,
  ADD_MANAGER_DATA,
  UPDATE_MANAGER_DATA,
  DELETE_MANAGER_DATA,
  ADD_CLIENT_FIELD,
  CLIENT_FIELD_DATA,
  ENABLE_CLIENT_FIELD_DATA,
  DELETE_CLIENT_FIELD_DATA,
  SWITCH_LANGUAGE,
  UPDATE_CLIENT_FIELD_DATA,
  GET_WAITLIST_SETTINGS,
  UPDATE_WAITLIST_SETTINGS,
  GET_BOOKING_SETTINGS,
  UPDATE_BOOKING_SETTINGS,
  GET_ALERT_SETTINGS,
  UPDATE_ALERT_SETTINGS,
  GET_BUSINESS_INFO_SETTING,
  UPDATE_BUSINESS_INFO_SETTING,
  GET_lOCALIZATION_SETTING,
  UPDATE_LOCALIZATION_SETTING,
  RESOURCE_DATA_BY_RESOURCE,
} from 'constants/ActionTypes';

const initialSettings = {
  pathname: '',
  locale: {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us',
  },
  resourceUser: null,
  localizationSetting: null,
  businessInfoSetting: null,
  alertSettings: null,
  bookingSettings: null,
  WaitListSettings: null,
  clientFieldData: null,
  resourceData: null,
  serviceData: null,
  managerData: null,
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        pathname: action.payload.pathname,
      };
    case RESOURCE_DATA:
      return {
        ...state,
        resourceData: action.payload,
      };
    case ADD_RESOURCE_DATA:
      return {
        ...state,
        resourceData: [...state.resourceData, action.payload],
      };

    case UPDATE_RESOURCE_DATA:
      return {
        ...state,
        resourceData: state.resourceData.map((item) => (item.ID === action.payload.ID ? action.payload : item)),
      };
    case DELETE_RESOURCE_DATA:
      return {
        ...state,
        resourceData: state.resourceData.filter((item) => item.ID !== action.payload),
      };
    case SERVICE_DATA:
      return {
        ...state,
        serviceData: action.payload,
      };
    case ADD_SERVICE_DATA:
      return {
        ...state,
        serviceData: [...state.serviceData, action.payload],
      };

    case UPDATE_SERVICE_DATA:
      return {
        ...state,
        serviceData: action.payload,
      };
    case DELETE_SERVICE_DATA:
      return {
        ...state,
        serviceData: state.serviceData.filter((item) => item.ID != action.payload),
      };
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
      };
    case MANAGER_DATA:
      return {
        ...state,
        managerData: action.payload,
      };

    case ADD_MANAGER_DATA:
      return {
        ...state,
        managerData: [...state.managerData, action.payload],
      };
    case UPDATE_MANAGER_DATA:
      return {
        ...state,
        managerData: state.managerData.map((item) => (item.ID == action.payload.ID ? action.payload : item)),
      };
    case DELETE_MANAGER_DATA:
      return {
        ...state,
        managerData: state.managerData.filter((item) => item.ID != action.payload),
      };
    case ADD_CLIENT_FIELD: {
      return {
        ...state,
        clientFieldData: [...state.clientFieldData, action.payload],
      };
    }
    case CLIENT_FIELD_DATA: {
      return {
        ...state,
        clientFieldData: action.payload,
      };
    }
    case ENABLE_CLIENT_FIELD_DATA: {
      return {
        ...state,
        clientFieldData: state.clientFieldData.map((item) => (item.ID == action.payload.ID ? action.payload : item)),
      };
    }
    case DELETE_CLIENT_FIELD_DATA: {
      return {
        ...state,
        clientFieldData: state.clientFieldData.filter((item) => item.ID != action.payload),
      };
    }
    case UPDATE_CLIENT_FIELD_DATA: {
      return {
        ...state,
        clientFieldData: state.clientFieldData.map((item) => (item.ID == action.payload.ID ? action.payload : item)),
      };
    }
    case GET_WAITLIST_SETTINGS: {
      return {
        ...state,
        WaitListSettings: action.payload,
      };
    }
    case UPDATE_WAITLIST_SETTINGS: {
      return {
        ...state,
        WaitListSettings: action.payload,
      };
    }
    case GET_BOOKING_SETTINGS: {
      return {
        ...state,
        bookingSettings: action.payload,
      };
    }
    case UPDATE_BOOKING_SETTINGS: {
      return {
        ...state,
        bookingSettings: action.payload,
      };
    }
    case GET_ALERT_SETTINGS: {
      return {
        ...state,
        alertSettings: action.payload,
      };
    }
    case UPDATE_ALERT_SETTINGS: {
      return {
        ...state,
        alertSettings: state.alertSettings.map((item) => (item.key == action.payload.key ? action.payload : item)),
      };
    }
    case GET_BUSINESS_INFO_SETTING: {
      return {
        ...state,
        businessInfoSetting: action.payload,
      }
    }
    case UPDATE_BUSINESS_INFO_SETTING: {
      return {
        ...state,
        businessInfoSetting: action.payload,
      }
    }
    case GET_lOCALIZATION_SETTING: {
      return {
        ...state,
        localizationSetting: action.payload,
      }
    }
    case UPDATE_LOCALIZATION_SETTING: {
      return {
        ...state,
        localizationSetting: action.payload,
      }
    }
    case RESOURCE_DATA_BY_RESOURCE: {
      return {
        ...state,
        resourceUser: action.payload,
      }
    }
    default:
      return state;
  }
};

export default settings;
