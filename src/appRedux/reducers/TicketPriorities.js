import {
  ADD_TICKET_PRIORITY,
  BULK_ACTIVE_PRIORITY,
  BULK_DELETE_PRIORITY,
  BULK_DISABLE_PRIORITY,
  DELETE_TICKET_PRIORITY,
  EDIT_TICKET_PRIORITY,
  GET_TICKET_PRIORITIES
} from "../../constants/TicketPriorities";

const initialState = {
  priorities: [],
  totalItems: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_PRIORITIES:
      console.log("i am here")
      return {
        ...state,
        priorities: action.payload.items,
        totalItems: action.payload.paginate.total
      };

    case ADD_TICKET_PRIORITY:
      return {
        ...state,
        priorities: [action.payload, ...state.priorities],
        totalItems: state.totalItems + 1
      };

    case EDIT_TICKET_PRIORITY:
      const updatePriorities = state.priorities.map((priority) => priority.id === action.payload.id ? action.payload : priority)
      return {
        ...state,
        priorities: updatePriorities,
      };

    case DELETE_TICKET_PRIORITY:
      const updatedTickets = state.priorities.filter((priority) => priority.id !== action.payload)
      return {
        ...state,
        priorities: updatedTickets,
        totalItems: state.totalItems - 1
      };

    case BULK_DELETE_PRIORITY:
      const upPriorities = state.priorities.filter(priority => {
        if (action.payload.indexOf(priority.id) === -1) {
          return priority
        }
      });
      return {
        ...state,
        priorities: upPriorities,
        totalItems: state.totalItems - action.payload.length
      };

    case BULK_ACTIVE_PRIORITY:
      const activatePriorities = state.priorities.map(priority => {
        if (action.payload.indexOf(priority.id) !== -1) {
          priority.status = 1;
          return priority;
        }
        return priority;
      });
      return {
        ...state,
        priorities: activatePriorities
      };

    case BULK_DISABLE_PRIORITY:
      const deActivatePriorities = state.priorities.map(priority => {
        if (action.payload.indexOf(priority.id) !== -1) {
          priority.status = 0;
          return priority;
        }
        return priority;
      });
      return {
        ...state,
        priorities: deActivatePriorities
      };

    default:
      return state;
  }
}