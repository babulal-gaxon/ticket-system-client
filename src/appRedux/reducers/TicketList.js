import {
  ADD_TICKETS, ASSIGN_STAFF_TO_TICKET,
  DELETE_TICKET,
  GET_CONVERSATION_LIST,
  GET_FORM_DETAILS,
  GET_TICKET_ID,
  GET_TICKETS,
  SEND_MESSAGE,
  UPDATE_TICKET,
  UPDATE_TICKET_PRIORITY,
  UPDATE_TICKET_STATUS
} from "../../constants/TicketList";

const initialState = {
  tickets: [],
  ticketId: null,
  totalItems: null,
  conversation: [],
  formData: {
    departments: [],
    products: [],
    services: [],
  },
  assignedStaff: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKETS :
      return {
        ...state,
        tickets: action.payload.data,
        totalItems: action.payload.meta.total
      };

    case ADD_TICKETS:
      console.log(ADD_TICKETS, action);
      return {
        ...state,
        tickets: [action.payload, ...state.tickets],
        totalItems: state.totalItems + 1
      };

    case GET_TICKET_ID:
      return {
        ...state,
        ticketId: action.payload
      };

    case UPDATE_TICKET:
      const updatedTickets = state.tickets.map(ticket => ticket.id === action.payload.id ? action.payload : ticket)
      return {
        ...state,
        tickets: updatedTickets
      };

    case UPDATE_TICKET_STATUS:
      const updatedStatusTickets = state.tickets.map(ticket => {
        if (ticket.id === action.payload.ticketId) {
          ticket.status_id = action.payload.statusId;
          return ticket;
        }
        return ticket;
      });
      return {
        ...state,
        tickets: updatedStatusTickets
      };

    case UPDATE_TICKET_PRIORITY:
      const updatedPriorityTickets = state.tickets.map(ticket => {
        if (ticket.id === action.payload.ticketId) {
          ticket.priority_id = action.payload.priorityId;
          return ticket;
        }
        return ticket;
      });
      return {
        ...state,
        tickets: updatedPriorityTickets
      };


    case DELETE_TICKET:
      const updated = state.tickets.filter(ticket => {
        return (action.payload.indexOf(ticket.id) === -1) ?
          ticket: null
      });
      return {
        ...state,
        tickets: updated,
        totalItems: state.totalItems - action.payload.length
      };

    case GET_CONVERSATION_LIST:
      return {
        ...state,
        conversation: action.payload
      };

    case SEND_MESSAGE:
      return {
        ...state,
        conversation: state.conversation.concat(action.payload)
      };

    case GET_FORM_DETAILS:
      return {
        ...state,
        formData: action.payload
      };

    case ASSIGN_STAFF_TO_TICKET:
        return {
          ...state,
          assignedStaff: action.payload
        };

    default:
      return state;
  }
}