import {
  ADD_TICKETS, BACK_TO_LIST,
  GET_PRIORITIES,
  GET_TICKETS,
  SELECT_CURRENT_TICKET,
  TOGGLE_ADD_TICKET_BOX,
  UPDATE_TICKET
} from "../../constants/TicketList";

const initialState = {
  tickets: [],
  showAddTicket: false,
  priorities: [],
  staff: [],
  currentTicket: null,
  departments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKETS :
      return {
        ...state,
        tickets: action.payload
      }

    case ADD_TICKETS:
      console.log(ADD_TICKETS, action)
      return {
        ...state,
        tickets: state.tickets.concat(action.payload),
        showAddTicket: false
      }

    case TOGGLE_ADD_TICKET_BOX:
      console.log(TOGGLE_ADD_TICKET_BOX, action)
      return {
        ...state,
        showAddTicket: !state.showAddTicket
      }

    case GET_PRIORITIES:
      return {
        ...state,
        priorities: action.payload
      }

    case SELECT_CURRENT_TICKET:
      return {
        ...state,
        currentTicket: action.payload
      }

    case BACK_TO_LIST:
      return {
        ...state,
        currentTicket: null
      }

    case UPDATE_TICKET:
      const updatedTickets = state.tickets.map(ticket => ticket.id === action.payload.id ? action.payload : ticket)
      return {
        ...state,
        tickets: updatedTickets
      }

    default:
      return state;
  }
}