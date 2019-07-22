import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {ADD_ADMIN_INFO, ADD_DATABASE_INFO, ADD_GENERAL_INFO} from "../../constants/InitialSetup"
import axios from 'util/Api'

export const onSendDatabaseInfo = (info, nextStep) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/1', info
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_DATABASE_INFO, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        nextStep();
        dispatch({type: SHOW_MESSAGE, payload: "The Database information has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSendSuperAdminInfo = (info, nextStep) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/install/step/2', info
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_ADMIN_INFO, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        nextStep();
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

