import axios from 'util/Api'
import {
  ADD_TICKETS,
  ASSIGN_STAFF_TO_TICKET,
  DELETE_TICKET,
  GET_CONVERSATION_LIST,
  GET_FILTER_OPTIONS,
  GET_FORM_DETAILS,
  GET_TICKETS,
  NULLIFY_TICKET,
  SELECT_CURRENT_TICKET,
  SEND_MESSAGE,
  UPDATE_TICKET,
  UPDATE_TICKET_PRIORITY,
  UPDATE_TICKET_STATUS
} from "../../constants/TicketList";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {showErrorMessage} from "./Auth";
import moment from "moment";


export const onGetTickets = (currentPage, itemsPerPage, filterText, sortingParam, startDate, endDate, selectedStaff,
                             selectedCustomers, selectedPriorities, selectedStatuses, archive) => {
  const start = startDate ? moment(startDate).format("YYYY/MM/DD") : '';
  const end = endDate ? moment(endDate).format("YYYY/MM/DD") : '';
  console.log("selectedCustomers", selectedCustomers);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/tickets', {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          search: filterText,
          start_date: start,
          end_date: end,
          staff_id: selectedStaff,
          customer_id: selectedCustomers,
          priority_id: selectedPriorities,
          status_id: selectedStatuses,
          sortby: sortingParam,
          archive: ~~archive
        }
      }
    ).then(({data}) => {
      console.info("onGetTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKETS, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch(showErrorMessage(error));
      console.info("Error****:", error.message);
    });
  }
};

export const onAddTickets = (ticket, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/tickets', ticket).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_TICKETS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        dispatch({type: SHOW_MESSAGE, payload: `The Ticket with Id #${data.data.id} has been added successfully`});
      } else {
        dispatch({type: FETCH_ERROR,payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};


export const onUpdateTickets = (ticketId, ticket) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/tickets/${ticketId}`, ticket)
      .then(({data}) => {
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_TICKET, payload: data.data});
          dispatch({type: SHOW_MESSAGE, payload: "The Ticket has been updated successfully"});
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
  console.log("ticket id in action", ticketId);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/tickets/${ticketId}`).then(({data}) => {
      console.info("onGetTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SELECT_CURRENT_TICKET, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch(showErrorMessage(error));
      console.info("Error****:", error.message);
    });
  }
};


export const onDeleteTicket = (ticketIds, backToList) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/tickets/delete', ticketIds)
      .then(({data}) => {
        console.log("on Delete ticket: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_TICKET, payload: data.data});
          if (backToList) {
            backToList();
          }
          dispatch({type: SHOW_MESSAGE, payload: "The Ticket has been deleted successfully"});
        } else {
          dispatch({type: FETCH_ERROR, payload: data.errors[0]});
        }
      }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetFilterOptions = () => {
  return (dispatch) => {
    axios.get('/tickets/filter/options').then(({data}) => {
      if (data.success) {
        console.log("onGetFilterOptions", data);
        dispatch({type: GET_FILTER_OPTIONS, payload: data.data});
      }
    }).catch(function (error) {
      console.info("Error****:", error.message);
    });
  }
};

export const onUpdateTicketStatus = (ticketId, statusId) => {
  console.log("ticket id and status", ticketId, statusId);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/tickets/${ticketId}/update/status`, {status_id: statusId}).then(({data}) => {
      console.log("on change ticket status: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_TICKET_STATUS, payload: {statusId: data.data, ticketId: ticketId}});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Ticket has been changed successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

export const onUpdateTicketPriority = (ticketId, priorityId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/tickets/${ticketId}/update/priority`, {priority_id: priorityId}).then(({data}) => {
      console.log("on change ticket priority: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_TICKET_PRIORITY, payload: {priorityId: data.data, ticketId: ticketId}});
        dispatch({type: SHOW_MESSAGE, payload: "The Priority of Ticket has been changed successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

export const onGetConversationList = ticketId => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/tickets/${ticketId}/message`).then(({data}) => {
      console.log("on get ticket message: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CONVERSATION_LIST, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

export const onSendMessage = (ticketId, message) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/tickets/${ticketId}/message`, message).then(({data}) => {
      console.log("on send ticket message: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SEND_MESSAGE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

export const onGetFormDetails = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/tickets/support/form/options`).then(({data}) => {
      console.log("on get ticket form: ", data);
      if (data.success) {
        console.log(" in success o formDetail", data.data);
        dispatch({type: GET_FORM_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

export const onAssignStaffToTicket = (ticketId, staffId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/tickets/${ticketId}/assign`, {user_id: staffId}).then(({data}) => {
      console.log("on get Staff assigned: ", data);
      if (data.success) {
        dispatch({type: ASSIGN_STAFF_TO_TICKET, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};


export const onNullifyCurrentTicket = () => {
  return {
    type: NULLIFY_TICKET
  }
};


