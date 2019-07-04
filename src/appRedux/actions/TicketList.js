import axios from 'util/Api'
import {
  ADD_TICKETS, ASSIGN_STAFF_TO_TICKET,
  DELETE_TICKET,
  GET_CONVERSATION_LIST,
  GET_FORM_DETAILS,
  GET_TICKET_ID,
  GET_TICKETS,
  SEND_MESSAGE,
  UPDATE_TICKET,
  UPDATE_TICKET_STATUS
} from "../../constants/TicketList";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {showErrorMessage} from "./Auth";


export const onGetTickets = (currentPage, itemsPerPage, filterText, startDate, endDate, selectedStaff, selectedCustomers,
                             selectedPriorities, selectedStatuses, sortingParam, archive) => {
  console.log("archive value", archive)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/tickets', {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          search: filterText,
          staff_id: selectedStaff,
          customer_id: selectedCustomers,
          priority_id: selectedPriorities,
          status_id: selectedStatuses,
          sortby: sortingParam,
          // archive: archive
        }
      }
    ).then(({data}) => {
      console.info("onGetTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_TICKETS, payload: data});
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
          dispatch({type: FETCH_ERROR, payload: data.error});
        }
      }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
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
        dispatch({type: FETCH_ERROR, payload: data.error});
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
        dispatch({type: UPDATE_TICKET_STATUS, payload: {priorityId: data.data, ticketId: ticketId}});
        dispatch({type: SHOW_MESSAGE, payload: "The Priority of Ticket has been changed successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
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
        dispatch({type: FETCH_ERROR, payload: data.error});
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
        dispatch({type: FETCH_ERROR, payload: data.error});
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
    axios.get(`/tickets/support/form`).then(({data}) => {
      console.log("on get ticket form: ", data);
      if (data.success) {
        console.log(" in success o formDetail", data.data)
        dispatch({type: GET_FORM_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
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
    axios.post(`/tickets/${ticketId}/assign`, staffId).then(({data}) => {
      console.log("on get Staff assigned: ", data);
      if (data.success) {
        dispatch({type: ASSIGN_STAFF_TO_TICKET, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

