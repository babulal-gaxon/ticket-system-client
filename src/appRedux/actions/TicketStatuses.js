import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {
  ADD_TICKET_STATUS,
  BULK_ACTIVE_STATUS,
  BULK_DELETE_STATUS,
  BULK_DISABLE_STATUS,
  EDIT_TICKET_STATUS,
  GET_TICKET_STATUSES
} from "../../constants/TicketStatuses";


export const onGetTicketStatus = (currentPage, itemsPerPage, filterText, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get(`/setup/status`, {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterText
      }
    }).then(({data}) => {
      console.info("onGetTicketStatuses: ", data);
      if (data.success) {
        dispatch({type: GET_TICKET_STATUSES, payload: data});
        dispatch({type: FETCH_SUCCESS});
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

export const onAddTicketStatus = (status, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status', status).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_TICKET_STATUS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.statuses.add"]});
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

export const onEditTicketStatus = (status, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/status/${status.id}`, status).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: EDIT_TICKET_STATUS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.statuses.edit"]});
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

export const onBulkActiveStatuses = (statusIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status/status/1', statusIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_STATUS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.statuses.active"]});
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

export const onBulkInActiveStatuses = (statusIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status/status/0', statusIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_STATUS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.statuses.disable"]});
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

export const onBulkDeleteStatuses = (statusIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status/delete', statusIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_STATUS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.statuses.delete"]});
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
