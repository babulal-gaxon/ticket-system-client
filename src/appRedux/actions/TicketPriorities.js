import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_TICKET_PRIORITY, DELETE_TICKET_PRIORITY, EDIT_TICKET_PRIORITY, GET_TICKET_PRIORITIES,
  TOGGLE_ADD_PRIORITY_BOX
} from "../../constants/TicketPriorities";



export const onGetTicketPriorities = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/priorities'
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
}

export const onToggleAddPriority = () => {
  return {
    type: TOGGLE_ADD_PRIORITY_BOX
  }
}

export const onAddTicketPriority = (priority) => {
  console.log("onAddTicketPriority", priority)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/priorities', priority).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_TICKET_PRIORITY, payload: data.data});
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

export const onEditTicketPriority = (priority) => {
  console.log("onEditTicketPriority", priority)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/priorities/${priority.id}`, priority).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: EDIT_TICKET_PRIORITY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
}

export const onDeleteTicketPriority = (priorityId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/priorities/${priorityId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: DELETE_TICKET_PRIORITY, payload: priorityId});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
}
