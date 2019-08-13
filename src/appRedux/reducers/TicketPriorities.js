import {
  ADD_TICKET_PRIORITY,
  BULK_ACTIVE_PRIORITY,
  BULK_DELETE_PRIORITY,
  BULK_DISABLE_PRIORITY,
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
      return {
        ...state,
        priorities: action.payload.data,
        totalItems: action.payload.meta.total
      };

    case ADD_TICKET_PRIORITY:
      return {
        ...state,
        priorities: [action.payload, ...state.priorities],
        totalItems: state.totalItems + 1
      };

    case EDIT_TICKET_PRIORITY:
      const updatePriorities = state.priorities.map((priority) => priority.id === action.payload.id ? action.payload : priority);
      return {
        ...state,
        priorities: updatePriorities,
      };

    case BULK_DELETE_PRIORITY:
      return {
        ...state,
        priorities: state.priorities.filter(priority => (action.payload.indexOf(priority.id) === -1)),
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
