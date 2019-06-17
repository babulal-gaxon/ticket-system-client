import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_TICKET_STATUS,
  BULK_ACTIVE_STATUS,
  BULK_DELETE_STATUS,
  BULK_DISABLE_STATUS,
  DELETE_TICKET_STATUS,
  EDIT_TICKET_STATUS,
  GET_TICKET_STATUSES
} from "../../constants/TicketStatuses";


export const onGetTicketStatus = (currentPage, itemsPerPage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/status?page=${currentPage}&per_page=${itemsPerPage}`
    ).then(({data}) => {
      console.info("onGetTicketStatuses: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKET_STATUSES, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddTicketStatus = (status, successMessage) => {
  console.log("onAddTicketStatus", status);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status', status).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_TICKET_STATUS, payload: data.data});
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

export const onDeleteTicketStatus = (statusId, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/status/${statusId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: DELETE_TICKET_STATUS, payload: statusId});
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


export const onEditTicketStatus = (status, successMessage) => {
  console.log("onEditTicketStatus", status);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/status/${status.id}`, status).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_TICKET_STATUS, payload: data.data});
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

export const onBulkActiveStatuses = (statusIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status/status/1', statusIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_STATUS, payload: data.data});
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

export const onBulkInActiveStatuses = (statusIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status/status/0', statusIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_STATUS, payload: data.data});
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

export const onBulkDeleteStatuses = (statusIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status/delete', statusIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_STATUS, payload: data.data});
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
