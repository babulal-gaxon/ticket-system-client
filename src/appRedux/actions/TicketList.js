import axios from 'util/Api'
import {
  ADD_TICKETS,
  BACK_TO_LIST,
  DELETE_TICKET,
  GET_TICKETS,
  SELECT_CURRENT_TICKET,
  UPDATE_TICKET
} from "../../constants/TicketList";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {showErrorMessage} from "./Auth";


export const onGetTickets = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/tickets'
    ).then(({data}) => {
      console.info("onGetTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKETS, payload: data.data.items});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch(showErrorMessage(error));
      console.info("Error****:", error.message);
    });
  }
};



export const onAddTickets = (ticket) => {
  console.log("onAddTickets ticket data is ", ticket);
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

export const onSelectTicket = (ticket) => {
  return {
    type: SELECT_CURRENT_TICKET,
    payload: ticket
  }
};

export const onBackToList = () => {
  return {
    type:BACK_TO_LIST
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

export const onDeleteTicket = (ticketId) => {
console.log("In delete option", ticketId)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/tickets/${ticketId}`)
      .then(({data}) => {
        console.log("on Delete ticket: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_TICKET, payload: ticketId});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.error});
        }
      }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

