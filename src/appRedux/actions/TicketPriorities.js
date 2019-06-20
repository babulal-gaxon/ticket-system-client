import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_TICKET_PRIORITY,
  BULK_ACTIVE_PRIORITY,
  BULK_DELETE_PRIORITY,
  BULK_DISABLE_PRIORITY,
  EDIT_TICKET_PRIORITY,
  GET_TICKET_PRIORITIES
} from "../../constants/TicketPriorities";


export const onGetTicketPriorities = (currentPage, itemsPerPage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/priorities?page=${currentPage}&per_page=${itemsPerPage}`
    ).then(({data}) => {
      console.info("onGetTicketPriorities: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKET_PRIORITIES, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddTicketPriority = (priority, successMessage) => {
  console.log("onAddTicketPriority", priority);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities', priority).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_TICKET_PRIORITY, payload: data.data});
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

export const onEditTicketPriority = (priority, successMessage) => {
  console.log("onEditTicketPriority", priority);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/priorities/${priority.id}`, priority).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_TICKET_PRIORITY, payload: data.data});
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

export const onBulkActivePriorities = (priorityIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/status/1', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_PRIORITY, payload: data.data});
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

export const onBulkInActivePriorities = (priorityIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/status/0', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_PRIORITY, payload: data.data});
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

export const onBulkDeletePriorities = (priorityIds, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/delete', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_PRIORITY, payload: data.data});
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
