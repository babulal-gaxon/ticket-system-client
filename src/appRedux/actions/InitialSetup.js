import {
  ERROR_INITIAL_SETUP,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INITIAL_SETUP_STEPS,
  ON_HIDE_LOADER,
  SHOW_MESSAGE,
  START_LOADER,
  UPDATE_STEPS,
  USER_DATA,
  USER_TOKEN_SET
} from "../../constants/ActionTypes";
import {ADD_ADMIN_INFO, ADD_GENERAL_INFO, OPEN_PIN_MODAL} from "../../constants/InitialSetup"
import axios from 'util/Api'

export const updateSteps = (step) => {
  return (dispatch) => {
    dispatch({type: UPDATE_STEPS, payload: step});
  }
};

export const onSendDatabaseInfo = (info, nextStep, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/1', info
    ).then(({data}) => {
      console.log("onSendDatabaseInfo", data);
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

export const onCheckInitialSetup = () => {
  return (dispatch) => {
    dispatch({type: START_LOADER});
    axios.get('/install/all-steps').then(({data}) => {
      console.log("initial Setup", data);
      if (data.success) {
        dispatch({type: INITIAL_SETUP_STEPS, payload: data.data});
        dispatch({type: ON_HIDE_LOADER});
      } else if (data.message) {
        console.info("payload: data.errors[0]", data.message);
        dispatch({type: ERROR_INITIAL_SETUP, payload: data.message});
      } else {
        console.info("payload: data.errors[0]", data.errors[0]);
        dispatch({type: ERROR_INITIAL_SETUP, payload: data.errors.email});
      }
    }).catch(function (error) {
      dispatch({type: ERROR_INITIAL_SETUP, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSendSuperAdminInfo = (info, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/2', info
    ).then(({data}) => {
      console.log("onSendSuperAdminInfo", data);
      if (data.success) {
        console.log(" sending data", data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        dispatch({type: USER_DATA, payload: data.data});
        dispatch({type: ADD_ADMIN_INFO, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: OPEN_PIN_MODAL, payload: true});
        dispatch({type: SHOW_MESSAGE, payload: "The Admin information has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSetGeneralInfo = (info, token, nextStep, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    if (token) {
      localStorage.getItem("token");
      axios.defaults.headers.common['access-token'] = "Bearer " + token;
    }
    dispatch({type: FETCH_START});
    axios.post('/install/step/3', info
    ).then(({data}) => {
      console.log("onSetGeneralInfo", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_GENERAL_INFO, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The general information has been saved successfully"});
        nextStep();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
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

export const onOpenPinModal = () => {
  return {
    type: OPEN_PIN_MODAL,
    payload: true
  }
};

export const onVerifyByPin = (data, nextStep) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/2/verify/email', data
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        localStorage.setItem("token", data.token);
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

export const onResendPin = (email, context) => {
  const {messages} = context.props.intl;
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
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
