import axios from 'util/Api'
import {
  ADD_TICKETS,
  ASSIGN_STAFF_TO_TICKET,
  DELETE_TICKET,
  GET_CONVERSATION_LIST,
  GET_FILTER_OPTIONS,
  GET_FORM_DETAILS,
  GET_TAGS_LIST,
  GET_TICKETS,
  NULLIFY_TICKET,
  SELECT_CURRENT_TICKET,
  SEND_MESSAGE,
  UPDATE_TICKET,
  UPDATE_TICKET_PRIORITY,
  UPDATE_TICKET_STATUS
} from "../../constants/TicketList";
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {showErrorMessage} from "./Auth";

export const onGetTickets = (updatingContent, currentPage, itemsPerPage, filterText, sortingParam, startDate, endDate, selectedStaff,
                             selectedCustomers, selectedPriorities, selectedStatuses, archive) => {
  const start = startDate ? startDate.toDate() : '';
  const end = endDate ? endDate.toDate() : '';
  console.log("onGetTickets", start, end);
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
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
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch(showErrorMessage(error));
      console.info("Error****:", error.message);
    });
  }
};

export const onAddTickets = (ticket, history, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/tickets', ticket).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_TICKETS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.add"]});
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


export const onUpdateTickets = (ticketId, ticket, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/tickets/${ticketId}`, ticket)
      .then(({data}) => {
        if (data.success) {
          console.log("data.dta", data.data)
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: UPDATE_TICKET, payload: data.data});
          dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.edit"]});
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

export const onGetTicketDetail = (ticketId) => {
  console.log("ticket id in action", ticketId);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/tickets/${ticketId}`).then(({data}) => {
      console.info("onGetTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SELECT_CURRENT_TICKET, payload: data.data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch(showErrorMessage(error));
      console.info("Error****:", error.message);
    });
  }
};


export const onDeleteTicket = (ticketIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/tickets/delete', ticketIds)
      .then(({data}) => {
        console.log("on Delete ticket: ", data);
        if (data.success) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: DELETE_TICKET, payload: data.data});
          dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.archive"]});
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

export const onUpdateTicketStatus = (ticketId, statusId, context) => {
  const {messages} = context.props.intl;
  console.log("ticket id and status", ticketId, statusId);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/tickets/${ticketId}/update/status`, {status_id: statusId}).then(({data}) => {
      console.log("on change ticket status: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_TICKET_STATUS, payload: {statusId: data.data, ticketId: ticketId}});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.status"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};

export const onUpdateTicketPriority = (ticketId, priorityId, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/tickets/${ticketId}/update/priority`, {priority_id: priorityId}).then(({data}) => {
      console.log("on change ticket priority: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_TICKET_PRIORITY, payload: {priorityId: data.data, ticketId: ticketId}});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.tickets.priority"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
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
    axios.get(`/tickets/${ticketId}/message`).then(({data}) => {
      if (data.success) {
        dispatch({type: GET_CONVERSATION_LIST, payload: data.data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
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
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
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
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
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
        dispatch({type: ASSIGN_STAFF_TO_TICKET, payload: staffId});
        dispatch({type: FETCH_SUCCESS});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
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

export const onGetTagsList = (tagsFilterText) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/tags', {
      params: {
        search: tagsFilterText
      }
    }).then(({data}) => {
      console.log("on add tags: ", data);
      if (data.success) {
        dispatch({type: GET_TAGS_LIST, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    })
  }
};



