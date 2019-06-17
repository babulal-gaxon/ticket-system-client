import {
  ADD_TICKET_PRIORITY,
  DELETE_TICKET_PRIORITY,
  EDIT_TICKET_PRIORITY,
  GET_TICKET_PRIORITIES
} from "../../constants/TicketPriorities";

const initialState = {
  priorities: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_PRIORITIES:
      return {
        ...state,
        priorities: action.payload
      };

    case ADD_TICKET_PRIORITY:
      return {
        ...state,
        priorities: [action.payload, ...state.priorities]
      };

    case EDIT_TICKET_PRIORITY:
      const updatePriorities = state.priorities.map((priority) => priority.id === action.payload.id ? action.payload : priority)
      return {
        ...state,
        priorities:updatePriorities,
      };

    case DELETE_TICKET_PRIORITY:
      const updatedTickets = state.priorities.filter((priority) => priority.id !== action.payload)
      return {
        ...state,
        priorities:updatedTickets
      };

    default:
      return state;
  }
}