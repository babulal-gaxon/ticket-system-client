import axios from 'util/Api'
import {
  ADD_TICKETS, GET_PRIORITIES, GET_TICKETS, SELECT_CURRENT_TICKET,
  TOGGLE_ADD_TICKET_BOX, UPDATE_TICKET
} from "../../constants/TicketListing";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";


export const onGetTickets = () => {

  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/tickets'
    ).then(({data}) => {
      console.info("onGetTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKETS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};


export const onToggleAddTicket = () => {
  return {
    type: TOGGLE_ADD_TICKET_BOX
  }
}


export const onAddTickets = (ticket) => {
  console.log("onAddTickets", ticket)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/tickets', ticket).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_TICKETS, payload: data.data});
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

export const onGetPriorities = () => {

  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/priorities'
    ).then(({data}) => {
      console.info("onGetPriorities: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_PRIORITIES, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSelectTicket = (ticket) => {
  return {
    type: SELECT_CURRENT_TICKET,
    payload: ticket
  }
}


export const onUpdateTickets = (ticket) => {

  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/tickets/${ticket.id}`,ticket)
      .then(({data}) => {
      console.log("on Update ticket: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_TICKET, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

