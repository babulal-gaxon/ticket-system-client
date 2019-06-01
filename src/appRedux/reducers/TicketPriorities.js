import {
  ADD_TICKET_PRIORITY, DELETE_TICKET_PRIORITY, EDIT_TICKET_PRIORITY, GET_TICKET_PRIORITIES,
  TOGGLE_ADD_PRIORITY_BOX
} from "../../constants/TicketPriorities";
const initialState = {
  priorities: [],
  showAddPriority: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_PRIORITIES:
      return {
        ...state,
        priorities: action.payload
      };

    case TOGGLE_ADD_PRIORITY_BOX:
      return {
        ...state,
        showAddPriority: !state.showAddPriority
      };

    case ADD_TICKET_PRIORITY:
      console.log("hello i reached here")
      return {
        ...state,
        priorities: state.priorities.concat(action.payload),
        showAddPriority: false
      };

    case EDIT_TICKET_PRIORITY:
      const updatePriorities = state.priorities.map((priority) => priority.id === action.payload.id ? action.payload : priority)
      return {
        ...state,
        priorities:updatePriorities,
        showAddPriority: false
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