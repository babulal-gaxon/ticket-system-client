import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_CANNED_RESPONSE, DELETE_CANNED_RESPONSE, EDIT_CANNED_RESPONSE, GET_CANNED_RESPONSES,
  TOGGLE_ADD_CANNED_BOX
} from "../../constants/CannedResponses";


export const onGetCannedResponses = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/canned/responses'
    ).then(({data}) => {
      console.info("onCannedResponses: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CANNED_RESPONSES, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onToggleAddCanned = () => {
  return {
    type: TOGGLE_ADD_CANNED_BOX
  }
};

export const onAddCannedResponse = (cannedResponse) => {
  console.log("onAddCannedResponse", cannedResponse)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses', cannedResponse).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_CANNED_RESPONSE, payload: data.data});
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

export const onDeleteCannedResponse = (cannedResponseId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/canned/responses/${cannedResponseId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: DELETE_CANNED_RESPONSE, payload: cannedResponseId});
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

export const onEditCannedResponse = (cannedResponse) => {
  console.log("onEditCannedResponse", cannedResponse)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/canned/responses/${cannedResponse.id}`, cannedResponse).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: EDIT_CANNED_RESPONSE, payload: data.data});
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
