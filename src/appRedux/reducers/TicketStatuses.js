import {
  ADD_TICKET_STATUS,
  DELETE_TICKET_STATUS,
  EDIT_TICKET_STATUS,
  GET_TICKET_STATUSES
} from "../../constants/TicketStatuses";

const initialState = {
  statuses: [],
  showAddStatus: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_STATUSES:
      return {
        ...state,
        statuses: action.payload
      };

    case ADD_TICKET_STATUS:
      return {
        ...state,
        statuses: [action.payload, ...state.statuses]
      };

    case EDIT_TICKET_STATUS:
      const updateStatuses = state.statuses.map((status) => status.id === action.payload.id ? action.payload : status)
      return {
        ...state,
        statuses:updateStatuses
      };

    case DELETE_TICKET_STATUS:
      const updatedStatuses = state.statuses.filter((status) => status.id !== action.payload)
      return {
        ...state,
        statuses:updatedStatuses
      };

    default:
      return state;
  }
}