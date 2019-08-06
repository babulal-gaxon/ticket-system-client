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

const initialState = {
  raisedTickets: [],
  totalTickets: null,
  formOptions: {
    services: [],
    departments: [],
    products: [],
    priorities: [],
    status: []
  },
  currentTicket: null,
  ticketMessages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RAISED_TICKETS:
      return {
        ...state,
        raisedTickets: action.payload.data,
        totalTickets: action.payload.meta.total
      };

    case RAISE_NEW_TICKET:
      return {
        ...state,
        raisedTickets: [action.payload, ...state.raisedTickets],
        totalTickets: state.totalTickets + 1
      };

    case GET_FORM_OPTIONS:
      return {
        ...state,
        formOptions: {
          services: action.payload.services,
          departments: action.payload.departments,
          products: action.payload.products,
          priorities: action.payload.priorities,
          status: action.payload.status
        }
      };

    case GET_TICKET_DETAIL:
      return {
        ...state,
        currentTicket: action.payload
      };

    case GET_TICKET_MESSAGES:
      return {
        ...state,
        ticketMessages: action.payload
      };

    case ADD_TICKET_MESSAGE:
      return {
        ...state,
        ticketMessages: state.ticketMessages.concat(action.payload)
      };

    case NULLIFY_TICKET:
      return {
        ...state,
        currentTicket: null
      };

    case UPDATE_TICKET_STATUS:
      const updatedStatusTickets = state.raisedTickets.map(ticket => {
        if (ticket.id === action.payload.ticketId) {
          ticket.status_id = action.payload.statusId;
          return ticket;
        }
        return ticket;
      });
      return {
        ...state,
        raisedTickets: updatedStatusTickets
      };

    case UPDATE_TICKET_PRIORITY:
      const updatedPriorityTickets = state.raisedTickets.map(ticket => {
        if (ticket.id === action.payload.ticketId) {
          ticket.priority_id = action.payload.priorityId;
          return ticket;
        }
        return ticket;
      });
      return {
        ...state,
        raisedTickets: updatedPriorityTickets
      };

    case UPDATE_TICKET:
      const updatedTickets = state.raisedTickets.map(ticket => ticket.id === action.payload.id ? action.payload : ticket);
      return {
        ...state,
        raisedTickets: updatedTickets,
        currentTicket: action.payload
      };

    default:
      return state;
  }
}
