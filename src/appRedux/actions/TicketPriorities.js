import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {
  ADD_TICKET_PRIORITY,
  BULK_ACTIVE_PRIORITY,
  BULK_DELETE_PRIORITY,
  BULK_DISABLE_PRIORITY,
  EDIT_TICKET_PRIORITY,
  GET_TICKET_PRIORITIES
} from "../../constants/TicketPriorities";


export const onGetTicketPriorities = (currentPage, itemsPerPage, filterText) => {
  console.log("filterText", filterText);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/priorities', {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          search: filterText
        }
      }
    ).then(({data}) => {
      console.info("onGetTicketPriorities: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKET_PRIORITIES, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddTicketPriority = (priority) => {
  console.log("onAddTicketPriority", priority);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities', priority).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_TICKET_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Priority has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR,payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditTicketPriority = (priority) => {
  console.log("onEditTicketPriority", priority);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/priorities/${priority.id}`, priority).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_TICKET_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Priority details has been updated successfully"});
      } else {
        dispatch({type: FETCH_ERROR,payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkActivePriorities = (priorityIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/status/1', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Priority(s) has been changed to Active successfully"});
      } else {
        dispatch({type: FETCH_ERROR,payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkInActivePriorities = (priorityIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/status/0', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Priority(s) has been changed to Disabled successfully"});
      } else {
        dispatch({type: FETCH_ERROR,payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeletePriorities = (priorityIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/delete', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Priority(s) has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR,payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
