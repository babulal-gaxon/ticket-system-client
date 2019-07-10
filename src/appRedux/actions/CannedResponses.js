import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {
  ADD_CANNED_RESPONSE,
  BULK_ACTIVE_RESPONSE,
  BULK_DELETE_RESPONSE,
  BULK_DISABLE_RESPONSE,
  EDIT_CANNED_RESPONSE,
  GET_CANNED_RESPONSES
} from "../../constants/CannedResponses";


export const onGetCannedResponses = (currentPage, itemsPerPage, filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/canned/responses', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterData
      }
    }).then(({data}) => {
      console.info("onCannedResponses: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CANNED_RESPONSES, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddCannedResponse = (cannedResponse) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses', cannedResponse).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_CANNED_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Response has been added successfully"});
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
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/canned/responses/${cannedResponse.id}`, cannedResponse).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: EDIT_CANNED_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Response details has been updated successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkActiveResponses = (responseIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/status/1', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Response(s) has been changed to Active successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkInActiveResponses = (responseIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/status/0', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Response(s) has been changed to Disabled successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeleteResponses = (responseIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/delete', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Response(s) has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

