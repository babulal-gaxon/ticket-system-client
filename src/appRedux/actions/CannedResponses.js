import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {
  ADD_CANNED_RESPONSE,
  BULK_ACTIVE_RESPONSE,
  BULK_DELETE_RESPONSE,
  BULK_DISABLE_RESPONSE,
  EDIT_CANNED_RESPONSE,
  GET_CANNED_RESPONSES
} from "../../constants/CannedResponses";


export const onGetCannedResponses = (currentPage, itemsPerPage, filterData, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
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
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddCannedResponse = (cannedResponse, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses', cannedResponse).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_CANNED_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.responses.add"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditCannedResponse = (cannedResponse, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/canned/responses/${cannedResponse.id}`, cannedResponse).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: EDIT_CANNED_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.responses.edit"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkActiveResponses = (responseIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/status/1', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.responses.active"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkInActiveResponses = (responseIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/status/0', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.responses.disable"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeleteResponses = (responseIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/canned/responses/delete', responseIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_RESPONSE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.responses.delete"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

