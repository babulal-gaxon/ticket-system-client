import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {
  ADD_CUSTOMER_PANEL_DETAILS,
  ADD_GENERAL_DETAILS,
  ADD_LOCALIZATION_DETAILS, GET_CUSTOMER_PANEL_DETAILS,
  GET_GENERAL_DETAILS,
  GET_LOCALIZATION_DETAILS
} from "../../constants/GeneralSettings";


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
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSaveGeneralDetails = (details) => {
    console.log("onSaveGeneralDetails", details);
    return (dispatch) => {
      dispatch({type: FETCH_START});
      axios.post('/setup/settings/general', details).then(({data}) => {
        console.info("data:", data);
        if (data.success) {
          console.log(" sending data", data.data);
          dispatch({type: ADD_GENERAL_DETAILS, payload: data.data});
          dispatch({type: FETCH_SUCCESS});
        } else {
          dispatch({type: FETCH_ERROR, payload: "Network Error"});
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
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSaveLocalizationDetails = (details) => {
  console.log("onSaveLocalizationDetails", details);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/settings/locale', details).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_LOCALIZATION_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
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
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSaveCustomerPanelDetails = (details) => {
  console.log("onSaveCustomerPanelDetails", details);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/settings/customer/panel', details).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_CUSTOMER_PANEL_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};