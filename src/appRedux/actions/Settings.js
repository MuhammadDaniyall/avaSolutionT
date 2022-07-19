import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESOURCE_DATA,
  ADD_RESOURCE_DATA,
  UPDATE_RESOURCE_DATA,
  DELETE_RESOURCE_DATA,
  SERVICE_DATA,
  ADD_SERVICE_DATA,
  UPDATE_SERVICE_DATA,
  DELETE_SERVICE_DATA,
  ADD_MANAGER_DATA,
  MANAGER_DATA,
  UPDATE_MANAGER_DATA,
  DELETE_MANAGER_DATA,
  CLIENT_FIELD_DATA,
  ADD_CLIENT_FIELD,
  UPDATE_CLIENT_FIELD_DATA,
  ENABLE_CLIENT_FIELD_DATA,
  DELETE_CLIENT_FIELD_DATA,
  GET_WAITLIST_SETTINGS,
  UPDATE_WAITLIST_SETTINGS,
  GET_BOOKING_SETTINGS,
  UPDATE_BOOKING_SETTINGS,
  GET_ALERT_SETTINGS,
  UPDATE_ALERT_SETTINGS,
  SWITCH_LANGUAGE,
  GET_BUSINESS_INFO_SETTING,
  UPDATE_BUSINESS_INFO_SETTING,
  GET_lOCALIZATION_SETTING,
  UPDATE_LOCALIZATION_SETTING,
  RESOURCE_DATA_BY_RESOURCE,
} from 'constants/ActionTypes';
import axios from 'util/Api';
import { message } from 'antd';

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale,
  };
}

export const getResourceData = (id) => {
  console.log(id);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/resource/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: RESOURCE_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const getResourceDataByResource = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/resource/getResourceByResource/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: RESOURCE_DATA_BY_RESOURCE, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addResource = (params,user_id) => {
  const formData = new FormData();
  formData.append('name', params.name);
  formData.append('user_id', user_id);
  formData.append('display_name', params.display_name);
  formData.append('category_name', params.category_name);
  formData.append('email', params.email);
  formData.append('phone', params.phone);
  formData.append('description', params.description);
  formData.append('img_data', params.picture);
  formData.append('workingHour', params.workingHour);
  formData.append('serviceProvide', params.serviceProvide);
  formData.append('workingData', params.workingData);

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/resource', formData)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_RESOURCE_DATA, payload: data.result });
        } else if (data.message == 'exist') message.warning('email already exist');
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const updateResource = (params) => {
  const formData = new FormData();
  formData.append('name', params.name);
  formData.append('display_name', params.display_name);
  formData.append('category_name', params.category_name);
  formData.append('email', params.email);
  formData.append('phone', params.phone);
  formData.append('description', params.description);
  formData.append('workingHour', params.workingHour);
  formData.append('serviceProvide', params.serviceProvide);
  formData.append('workingData', params.workingData);
  if (params.picture) formData.append('img_data', params.picture);

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`http://localhost:8000/resource/${params.ID}`, formData)
      .then(({ data }) => {
        if (data.success) {
          console.log(data)
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_RESOURCE_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const updateResourceAvailable = (params) => {

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
    .post(`http://localhost:8000/resource/available`, params)
    .then(({ data }) => {
      if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          if(params['where']){
            dispatch({ type: RESOURCE_DATA_BY_RESOURCE, payload: data.result });
          }
          else{
            dispatch({ type: UPDATE_RESOURCE_DATA, payload: data.result });
          }

        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const deleteResource = (ID) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/resource/${ID}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_RESOURCE_DATA, payload: ID });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const getServiceData = (id) => {
  return (dispatch) => {
    console.log(dispatch);

    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/service/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SERVICE_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addService = (params,id) => {
  console.log(params);
  const formData = new FormData();
  console.log(params);
  // formData.append('name', params.name);
  // formData.append('display_name', params.display_name);
  // formData.append('category_name', params.category_name);
  // formData.append('email', params.email);
  // formData.append('phone', params.phone);
  // formData.append('description', params.description);
  formData.append('img_data', params.picture);
  formData.append('color', params.color);
  typeof params.name == 'undefined' ? formData.append('name', '') : formData.append('name', params.name)
  typeof params.display_name == 'undefined' ? formData.append('display_name', '') : formData.append('display_name', params.display_name)
  typeof params.category_name == 'undefined' ? formData.append('category_name', '') : formData.append('category_name', params.category_name)
  typeof params.email == 'undefined' ? formData.append('email', '') : formData.append('email', params.email)
  typeof params.phone == 'undefined' ? formData.append('phone', '') : formData.append('phone', params.phone)
  typeof params.description == 'undefined' ? formData.append('description', '') : formData.append('description', params.description)
  
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/service/${id}`, formData)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_SERVICE_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

// params.name == 'undefined' ? formData.append('name', '') : formData.append('name', params.name)
// params.display_name == 'undefined' ? formData.append('display_name', '') : formData.append('display_name', params.display_name)
// params.category_name == 'undefined' ? formData.append('category_name', '') : formData.append('category_name', params.category_name)
// params.email == 'undefined' ? formData.append('email', '') : formData.append('email', params.email)
// params.phone == 'undefined' ? formData.append('phone', '') : formData.append('phone', params.phone)
// params.description == 'undefined' ? formData.append('description', '') : formData.append('description', params.description)

export const updateService = (params) => {
  const formData = new FormData();
  typeof params.name == 'undefined' ? formData.append('name', '') : formData.append('name', params.name)
typeof typeof params.display_name == 'undefined' ? formData.append('display_name', '') : formData.append('display_name', params.display_name)
typeof params.category_name == 'undefined' ? formData.append('category_name', '') : formData.append('category_name', params.category_name)
typeof params.email == 'undefined' ? formData.append('email', '') : formData.append('email', params.email)
typeof params.phone == 'undefined' ? formData.append('phone', '') : formData.append('phone', params.phone)
typeof params.description == 'undefined' ? formData.append('description', '') : formData.append('description', params.description)

  // formData.append('name', params.name);
  // formData.append('display_name', params.display_name);
  // formData.append('category_name', params.category_name);
  // formData.append('email', params.email);
  // formData.append('phone', params.phone);
  // formData.append('description', params.description);
  if (params.picture) formData.append('img_data', params.picture);
  formData.append('color', params.color);
  // console.log("params");

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`http://localhost:8000/service/${params.id}`, formData)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_SERVICE_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const deleteService = (ID) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/service/${ID}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_SERVICE_DATA, payload: ID });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addManager = (params,id) => {
  console.log(params);
  

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/manager/${id}`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_MANAGER_DATA, payload: data.result });
        } else if (data.message == 'exist') message.warning('email already exist');
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const getManagerData = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/manager/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: MANAGER_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const updateManager = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .put(`http://localhost:8000/manager`, params)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_MANAGER_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const deleteManager = (ID) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/manager/${ID}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_MANAGER_DATA, payload: ID });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const addField = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/waitlist/clientFieldAdd ', params)
      .then(({ data }) => {
        if (data.success) {
          message.success('Added Successfully!');
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ADD_CLIENT_FIELD, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const updateField = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post('http://localhost:8000/waitlist/clientFieldUpdate', params)
      .then(({ data }) => {
        if (data.success) {
          message.success('Updated Successfully!');
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_CLIENT_FIELD_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const getField = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/waitlist/clientField/${params}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: CLIENT_FIELD_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const enableField = (ID) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/waitlist/setenableField/${ID}`)
      .then(({ data }) => {
        if (data.success) {
          message.success('Updated Successfully!');
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: ENABLE_CLIENT_FIELD_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const deleteClientField = (ID) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .delete(`http://localhost:8000/waitlist/deleteClientField/${ID}`)
      .then(({ data }) => {
        if (data.success) {
          message.success('Deleted Successfully!');
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: DELETE_CLIENT_FIELD_DATA, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const getWaitListSettings = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/waitlist/getWaitListSettings/${userId}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_WAITLIST_SETTINGS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const updateWaitListSetting = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/waitlist/updateWaitListSettings`, params)
      .then(({ data }) => {
        if (data.success) {
          message.success('Updated successfully!');
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_WAITLIST_SETTINGS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const ResetSettings = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/waitlist/ResetSettings`, params)
      .then(({ data }) => {
        if (data.success) {
          message.success('Updated successfully!');
          dispatch({ type: FETCH_SUCCESS });
        } else {
          message.error(data.message);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const ClearData = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/waitlist/ClearData`, params)
      .then(({ data }) => {
        if (data.success) {
          message.success('Updated successfully!');
          dispatch({ type: FETCH_SUCCESS });
        } else {
          message.error(data.message);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const DeleteWaitList = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/waitlist/DeleteWaitList`, params)
      .then(({ data }) => {
        if (data.success) {
          message.success('Updated successfully!');
          dispatch({ type: FETCH_SUCCESS });
        } else {
          message.error(data.message);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};

export const getBookingSettings = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/booking/getBookingSettings/${userId}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_BOOKING_SETTINGS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const getFilterBookingSetting = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/booking/getFilterBookingSettings`, params, new Date())
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_BOOKING_SETTINGS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const updateBookingSetting = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/booking/updateBookingSettings`, params)
      .then(({ data }) => {
        if (data.success) {
          message.success('Updated successfully!');
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_BOOKING_SETTINGS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const getAlertSettings = (userId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/alert/getAlertSetting/${userId}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_ALERT_SETTINGS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
};
export const updateAlertSetting = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/alert/updateAlertSetting`, params)
      .then(({ data }) => {
        if (data.success) {
          message.success('Updated successfully!');
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: UPDATE_ALERT_SETTINGS, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
}
export const getBusinessInfoSetting = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/BusinessInfo/getBusinessSetting/${id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_BUSINESS_INFO_SETTING, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
}
export const updateBusinessInfoSetting = (params) => {
  console.log(params);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/BusinessInfo/updateBusinessInfoSettings`,params)
      .then(({data}) => {
        console.log(data);

        if(data.success){
          dispatch({type:FETCH_SUCCESS});
          dispatch({type:UPDATE_BUSINESS_INFO_SETTING});
        }
      })
      .catch(function (error){
        dispatch({type:FETCH_ERROR,payload:error.message});
      })
  }
}

export const getLocalizationSetting = (user_id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .get(`http://localhost:8000/Localization/getLocalizationSettings/${user_id}`)
      .then(({ data }) => {
        if (data.success) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: GET_lOCALIZATION_SETTING, payload: data.result });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
      });
  };
}
export const updateLocalizationSetting = (params) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    return axios
      .post(`http://localhost:8000/Localization/updateLocalizationSettings`,params)
      .then(({data}) => {
        if(data.success){
          dispatch({type:FETCH_SUCCESS});
          dispatch({type:UPDATE_LOCALIZATION_SETTING});
        }
      })
      .catch(function (error){
        dispatch({type:FETCH_ERROR,payload:error.message});
      })
  }
}
