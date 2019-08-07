import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {
  ADD_TICKET_MESSAGE,
  GET_FORM_OPTIONS,
  GET_RAISED_TICKETS,
  GET_TICKET_DETAIL,
  GET_TICKET_MESSAGES,
  NULLIFY_TICKET,
  RAISE_NEW_TICKET,
  UPDATE_TICKET,
  UPDATE_TICKET_PRIORITY,
  UPDATE_TICKET_STATUS
} from "../../constants/Tickets";

export const onGetRaisedTickets = (currentPage, totalItems, filterText, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
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
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
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
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onRaiseNewTicket = (ticket, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/customer/panel/tickets`, ticket).then(({data}) => {
      console.info("onRaiseNewTicket: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: RAISE_NEW_TICKET, payload: data.data});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.raise"]});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onNullifyTicket = () => {
  return {
    type: NULLIFY_TICKET,
  }
};

export const onGetTicketMessages = (ticketId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customer/panel/tickets/${ticketId}/messages`).then(({data}) => {
      console.info("onGetTicketMessages: ", data);
      if (data.success) {
        console.log("messages", data.data);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKET_MESSAGES, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSendNewMessage = (ticketId, message, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/customer/panel/tickets/${ticketId}/messages`, message).then(({data}) => {
      console.info("onSendNewMessage: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: ADD_TICKET_MESSAGE, payload: data.data});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.messageSent"]})
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetTicketDetail = (ticketId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customer/panel/tickets/${ticketId}`).then(({data}) => {
      console.info("onGetTicketDetail: ", data);
      if (data.success) {
        // dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKET_DETAIL, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onUpdateTicketPriority = (ticketId, priorityId, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/customer/panel/tickets/${ticketId}/update/priority`, {priority_id: priorityId}).then(({data}) => {
      console.log("on change ticket priority: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_TICKET_PRIORITY, payload: {priorityId: data.data, ticketId: ticketId}});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.priority"]});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

export const onUpdateTicketStatus = (ticketId, statusId, context) => {
  const {messages} = context.props.intl;
  console.log("ticket id and status", ticketId, statusId);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/customer/panel/tickets/${ticketId}/update/status`, {status_id: statusId}).then(({data}) => {
      console.log("on change ticket status: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_TICKET_STATUS, payload: {statusId: data.data, ticketId: ticketId}});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.status"]});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

export const onUpdateTickets = (ticketId, ticket, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/customer/panel/tickets/${ticketId}`, ticket)
      .then(({data}) => {
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_TICKET, payload: data.data});
          dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.edit"]});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.errors[0]});
        }
      }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};



