import {
  ADD_TICKET_MESSAGE,
  GET_FORM_OPTIONS,
  GET_RAISED_TICKETS, GET_TICKET_MESSAGES,
  RAISE_NEW_TICKET,
  SELECT_CURRENT_TICKET
} from "../../constants/CustomerDetails";

const initialState = {
  raisedTickets: [],
  totalTickets: null,
  formOptions: {
    services: [],
    departments: [],
    products: [],
    priorities: []
  },
  currentTicket: null,
  ticketMessages: []
};

export default(state = initialState, action) => {
  switch(action.type) {
    case GET_RAISED_TICKETS:
      return {
        ...state,
        raisedTickets: action.payload.data,
        totalTickets: action.payload.meta.total
      };

    case RAISE_NEW_TICKET:
      console.log("in recucser", action.payload)
      return {
        ...state,
        raisedTickets: [ action.payload, ...state.raisedTickets],
        totalTickets: state.totalTickets + 1
      };

    case GET_FORM_OPTIONS:
      return {
        ...state,
        formOptions: {
          services: action.payload.services,
          departments: action.payload.departments,
          products: action.payload.products,
          priorities: action.payload.priorities
        }
      };

    case SELECT_CURRENT_TICKET:
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

    default:
      return state;
  }
}