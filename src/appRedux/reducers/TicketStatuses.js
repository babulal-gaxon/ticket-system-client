import {
  ADD_TICKET_STATUS,
  BULK_ACTIVE_STATUS,
  BULK_DELETE_STATUS,
  BULK_DISABLE_STATUS,
  EDIT_TICKET_STATUS,
  GET_TICKET_STATUSES
} from "../../constants/TicketStatuses";

const initialState = {
  statuses: [],
  totalItems: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_STATUSES:
      return {
        ...state,
        statuses: action.payload.items,
        totalItems: action.payload.paginate.total
      };

    case ADD_TICKET_STATUS:
      return {
        ...state,
        statuses: [action.payload, ...state.statuses],
        totalItems: state.totalItems + 1
      };

    case EDIT_TICKET_STATUS:
      const updateStatuses = state.statuses.map((status) => status.id === action.payload.id ? action.payload : status)
      return {
        ...state,
        statuses: updateStatuses
      };

    case BULK_DELETE_STATUS:
      console.log(action.payload)
      const upStatuses = state.statuses.filter(status => {
        if (action.payload.indexOf(status.id) === -1) {
          return status
        }
      });
      return {
        ...state,
        statuses: upStatuses,
        totalItems: state.totalItems - action.payload.length
      };

    case BULK_ACTIVE_STATUS:
      const activateStatuses = state.statuses.map(status => {
        if (action.payload.indexOf(status.id) !== -1) {
          status.status = 1;
          return status;
        }
        return status;
      });
      return {
        ...state,
        statuses: activateStatuses
      };

    case BULK_DISABLE_STATUS:
      const deActivateStatuses = state.statuses.map(status => {
        if (action.payload.indexOf(status.id) !== -1) {
          status.status = 0;
          return status;
        }
        return status;
      });
      return {
        ...state,
        statuses: deActivateStatuses
      };

    default:
      return state;
  }
}