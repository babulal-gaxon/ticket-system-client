import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {
  ADD_TICKET_MESSAGE,
  GET_FORM_OPTIONS,
  GET_RAISED_TICKETS, GET_TICKET_MESSAGES,
  RAISE_NEW_TICKET,
  SELECT_CURRENT_TICKET
} from "../../constants/CustomerDetails";

export const onGetRaisedTickets = (currentPage, totalItems, filterText) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customer/panel/tickets`, {
      params: {
        page: currentPage,
        per_page: totalItems,
        search: filterText
      }
    }).then(({data}) => {
      console.info("onGetRaisedTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_RAISED_TICKETS, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetFormOptions = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customer/panel/tickets/support/form/options`).then(({data}) => {
      console.info("onGetFormOptions: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_FORM_OPTIONS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onRaiseNewTicket = (ticket) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/customer/panel/tickets`, ticket).then(({data}) => {
      console.info("onRaiseNewTicket: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: RAISE_NEW_TICKET, payload: data.data});
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
};

export const onGetTicketMessages = (ticketId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customer/panel/tickets/${ticketId}/messages`).then(({data}) => {
      console.info("onGetTicketMessages: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKET_MESSAGES, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSendNewMessage = (ticketId, message) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/customer/panel/tickets/${ticketId}/messages`, message).then(({data}) => {
      console.info("onSendNewMessage: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_TICKET_MESSAGE, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
