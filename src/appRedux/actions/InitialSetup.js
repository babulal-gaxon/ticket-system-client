import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS, INITIAL_SETUP_STEPS,
  SHOW_MESSAGE,
  USER_DATA,
  USER_TOKEN_SET
} from "../../constants/ActionTypes";
import {ADD_ADMIN_INFO, ADD_GENERAL_INFO, OPEN_PIN_MODAL} from "../../constants/InitialSetup"
import axios from 'util/Api'

export const onSendDatabaseInfo = (info, nextStep) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/1', info
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Database information has been saved successfully"});
        nextStep();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.message});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSendSuperAdminInfo = (info) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/2', info
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        dispatch({type: USER_DATA, payload: data.data});
        dispatch({type: ADD_ADMIN_INFO, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: OPEN_PIN_MODAL, payload: true});
        dispatch({type: SHOW_MESSAGE, payload: "The Admin information has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSetGeneralInfo = (info, nextStep) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/3', info
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_GENERAL_INFO, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        nextStep();
        dispatch({type: SHOW_MESSAGE, payload: "The general information has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onClosePinModal = () => {
  return {
    type: OPEN_PIN_MODAL,
    payload: false
  }
};

export const onVerifyByPin = (data, nextStep) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/2/verify/email', data
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        localStorage.setItem("token", JSON.stringify(data.token));
        axios.defaults.headers.common['access-token'] = "Bearer " + data.token;
        dispatch({type: USER_TOKEN_SET, payload: data.token});
        dispatch({type: OPEN_PIN_MODAL, payload: false});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: data.message});
        nextStep();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.message});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onResendPin = (email) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/2/resend/pin', email
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Pin has been sent successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
