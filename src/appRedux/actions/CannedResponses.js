import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_CANNED_RESPONSE,
  BULK_ACTIVE_RESPONSE,
  BULK_DELETE_RESPONSE,
  BULK_DISABLE_RESPONSE,
  EDIT_CANNED_RESPONSE,
  GET_CANNED_RESPONSES
} from "../../constants/CannedResponses";


export const onGetCannedResponses = (currentPage, itemsPerPage) => {
  console.log("items per page", itemsPerPage)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/canned/responses?page=${currentPage}&per_page=${itemsPerPage}`
    ).then(({data}) => {
      console.info("onCannedResponses: ", data);
      if (data.success) {
        console.log("i m here")
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

export const onAddCannedResponse = (cannedResponse, successMessage) => {
  console.log("onAddCannedResponse", cannedResponse);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses', cannedResponse).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_CANNED_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditCannedResponse = (cannedResponse, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/canned/responses/${cannedResponse.id}`, cannedResponse).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: EDIT_CANNED_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkActiveResponses = (responseIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/status/1', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkInActiveResponses = (responseIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/status/0', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeleteResponses = (responseIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/delete', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

