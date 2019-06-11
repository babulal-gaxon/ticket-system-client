import {
  ADD_TICKETS,
  BACK_TO_LIST,
  DELETE_TICKET,
  GET_TICKETS,
  SELECT_CURRENT_TICKET,
  UPDATE_TICKET
} from "../../constants/TicketList";

const initialState = {
  tickets: [],
  currentTicket: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKETS :
      return {
        ...state,
        tickets: action.payload
      };

    case ADD_TICKETS:
      console.log(ADD_TICKETS, action);
      return {
        ...state,
        tickets: state.tickets.concat(action.payload),
        showAddTicket: false
      };


    case SELECT_CURRENT_TICKET:
      return {
        ...state,
        currentTicket: action.payload
      };

    case BACK_TO_LIST:
      return {
        ...state,
        currentTicket: null
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
        tickets:updated
      };

    default:
      return state;
  }
}