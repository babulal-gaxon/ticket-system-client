import axios from 'util/Api'
import {ADD_TICKETS, DELETE_TICKET, GET_TICKET_ID, GET_TICKETS, UPDATE_TICKET} from "../../constants/TicketList";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
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

export const getTickedId = (id) => {
  return {
    type: GET_TICKET_ID,
    payload: id
  }
};

export const onAddTickets = (ticket, history) => {
  console.log("onAddTickets ticket data is ", ticket);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/tickets', ticket).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_TICKETS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        dispatch({type: SHOW_MESSAGE, payload: "The Ticket has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};


export const onUpdateTickets = (ticket, history) => {

  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/tickets/${ticket.id}`, ticket)
      .then(({data}) => {
        console.log("on Update ticket: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_TICKET, payload: data.data});
          history.goBack();
          dispatch({type: SHOW_MESSAGE, payload: "The Ticket has been updated successfully"});
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
          dispatch({type: SHOW_MESSAGE, payload: "The Ticket has been deleted successfully"});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.error});
        }
      }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

