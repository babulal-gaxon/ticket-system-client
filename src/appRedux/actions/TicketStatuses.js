import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_TICKET_STATUS, DELETE_TICKET_STATUS, EDIT_TICKET_STATUS, GET_TICKET_STATUSES,
  TOGGLE_ADD_STATUS_BOX
} from "../../constants/TicketStatuses";



export const onGetTicketStatus = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/status'
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

export const onToggleAddStatus = () => {
  return {
    type: TOGGLE_ADD_STATUS_BOX
  }
};

export const onAddTicketStatus = (status) => {
  console.log("onAddTicketStatus", status)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/status', status).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_TICKET_STATUS, payload: data.data});
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

export const onDeleteTicketStatus = (statusId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/status/${statusId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: DELETE_TICKET_STATUS, payload: statusId});
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


export const onEditTicketStatus = (status) => {
  console.log("onEditTicketStatus", status);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/status/${status.id}`, status).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_TICKET_STATUS, payload: data.data});
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
