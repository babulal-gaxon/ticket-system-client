import {ADD_TICKETS, DELETE_TICKET, GET_TICKET_ID, GET_TICKETS, UPDATE_TICKET} from "../../constants/TicketList";

const initialState = {
  tickets: [],
  ticketId: null,
  totalItems: null
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

    case DELETE_TICKET:
      const updated = state.tickets.filter((ticket) => ticket.id !== action.payload)
      return {
        ...state,
        tickets: updated,
        totalItems: state.totalItems - 1
      };

    default:
      return state;
  }
}