import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {
  ADD_TICKET_PRIORITY,
  BULK_ACTIVE_PRIORITY,
  BULK_DELETE_PRIORITY,
  BULK_DISABLE_PRIORITY,
  EDIT_TICKET_PRIORITY,
  GET_TICKET_PRIORITIES
} from "../../constants/TicketPriorities";


export const onGetTicketPriorities = (currentPage, itemsPerPage, filterText, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
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

export const onAddTicketPriority = (priority, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities', priority).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_TICKET_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.priorities.add"]});
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

export const onEditTicketPriority = (priority, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/priorities/${priority.id}`, priority).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_TICKET_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.priorities.edit"]});
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

export const onBulkActivePriorities = (priorityIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/status/1', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.priorities.active"]});
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

export const onBulkInActivePriorities = (priorityIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/status/0', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload:messages["action.priorities.disable"]});
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

export const onBulkDeletePriorities = (priorityIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities/delete', priorityIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.priorities.delete"]});
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
