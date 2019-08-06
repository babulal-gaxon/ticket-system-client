import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, SWITCH_LANGUAGE} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {
  ADD_CUSTOMER_PANEL_DETAILS,
  ADD_GENERAL_ADDRESS,
  ADD_GENERAL_DETAILS,
  ADD_LOCALIZATION_DETAILS,
  ADD_TICKET_SETTINGS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
  GET_COUNTRIES_LIST,
  GET_CUSTOMER_PANEL_DETAILS,
  GET_GENERAL_ADDRESS,
  GET_GENERAL_DETAILS,
  GET_LOCALIZATION_DETAILS,
  GET_TICKET_SETTINGS
} from "../../constants/GeneralSettings";
import {updateGeneralSetting, updateLocaleSetting, updateTicketSetting} from "../../util/Utills";


export const onGetGeneralDetails = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get("/setup/settings/general"
    ).then(({data}) => {
      console.info("onGetGeneralData ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_GENERAL_DETAILS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSaveGeneralDetails = (details, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/settings/general', details).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_GENERAL_DETAILS, payload: data.data});
        updateGeneralSetting(data.data);
        dispatch({type: SHOW_MESSAGE, payload: "The Changes has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetLocalizationDetails = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get("/setup/settings/locale"
    ).then(({data}) => {
      console.info("onGetLocalizationDetails ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_LOCALIZATION_DETAILS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSaveLocalizationDetails = (details, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/settings/locale', details).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_LOCALIZATION_DETAILS, payload: data.data});
        updateLocaleSetting(data.data);
        dispatch({type: SWITCH_LANGUAGE, payload: data.data.default_language});
        dispatch({type: SHOW_MESSAGE, payload: "The Changes has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetCustomerPanelDetails = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get("/setup/settings/customer/panel"
    ).then(({data}) => {
      console.info("onGetCustomerPanelDetails ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMER_PANEL_DETAILS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSaveCustomerPanelDetails = (details, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/settings/customer/panel', details).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_CUSTOMER_PANEL_DETAILS, payload: data.data});
        dispatch({type: SHOW_MESSAGE, payload: "The Changes has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetGeneralAddress = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get("/setup/settings/general/addresses"
    ).then(({data}) => {
      console.info("onGetGeneralAddress ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_GENERAL_ADDRESS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSaveGeneralAddress = (details, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/settings/general/addresses', details).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_GENERAL_ADDRESS, payload: data.data});
        dispatch({type: SHOW_MESSAGE, payload: "The Changes has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditAddress = (address, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/addresses/${address.id}`, address).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_ADDRESS, payload: address});
        dispatch({type: SHOW_MESSAGE, payload: "The Address has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteAddress = (addressId, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/addresses/${addressId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: DELETE_ADDRESS, payload: addressId});
        dispatch({type: SHOW_MESSAGE, payload: "The Address has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetCountriesList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/countries').then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: GET_COUNTRIES_LIST, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetTicketSettings = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get("/setup/settings/ticket"
    ).then(({data}) => {
      console.info("onGetTicketSettings ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKET_SETTINGS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSaveTicketSettings = (details, history, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post("/setup/settings/ticket", details
    ).then(({data}) => {
      console.info("onSaveTicketSettings ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_TICKET_SETTINGS, payload: data.data});
        updateTicketSetting(data.data);
        dispatch({type: SHOW_MESSAGE, payload: "The Changes has been saved successfully"});
        if (history) {
          history.replace('/dashboard')
        }
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
