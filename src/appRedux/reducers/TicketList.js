import {
  ADD_TICKETS,
  ASSIGN_STAFF_TO_TICKET,
  DELETE_TICKET,
  GET_CONVERSATION_LIST,
  GET_FILTER_OPTIONS,
  GET_FORM_DETAILS,
  GET_TAGS_LIST,
  GET_TICKETS,
  NULLIFY_TICKET,
  SELECT_CURRENT_TICKET,
  SEND_MESSAGE,
  UPDATE_TICKET,
  UPDATE_TICKET_PRIORITY,
  UPDATE_TICKET_STATUS
} from "../../constants/TicketList";

const initialState = {
  tickets: [],
  ticketId: null,
  totalItems: null,
  conversation: [],
  formData: {
    departments: [],
    products: [],
    services: [],
  },
  assignedStaff: null,
  currentTicket: null,
  filterData: {
    staffs: [],
    status: [],
    priority: []
  },
  tagsList: []
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

    case UPDATE_TICKET:
      const updatedTickets = state.tickets.map(ticket => ticket.id === action.payload.id ? action.payload : ticket);
      return {
        ...state,
        tickets: updatedTickets,
        currentTicket: action.payload
      };

    case SELECT_CURRENT_TICKET:
      return {
        ...state,
        currentTicket: action.payload
      };

    case NULLIFY_TICKET:
      return {
        ...state,
        currentTicket: null
      };

    case UPDATE_TICKET_STATUS:
      const updatedStatusTickets = state.tickets.map(ticket => {
        if (ticket.id === action.payload.ticketId) {
          ticket.status_id = action.payload.statusId;
          return ticket;
        }
        return ticket;
      });
      return {
        ...state,
        tickets: updatedStatusTickets
      };

    case UPDATE_TICKET_PRIORITY:
      const updatedPriorityTickets = state.tickets.map(ticket => {
        if (ticket.id === action.payload.ticketId) {
          ticket.priority_id = action.payload.priorityId;
          return ticket;
        }
        return ticket;
      });
      return {
        ...state,
        tickets: updatedPriorityTickets
      };

    case DELETE_TICKET:
      const updated = state.tickets.filter(ticket => {
        return (action.payload.indexOf(ticket.id) === -1) ?
          ticket : null
      });
      return {
        ...state,
        tickets: updated,
        totalItems: state.totalItems - action.payload.length
      };

    case GET_CONVERSATION_LIST:
      return {
        ...state,
        conversation: action.payload
      };

    case SEND_MESSAGE:
      let updatedTicket = state.currentTicket;
      if(action.payload.attachments.length > 0) {
        updatedTicket.all_attachments.message = updatedTicket.all_attachments.message.concat(action.payload.attachments.map(attachment => attachment))
      }
      return {
        ...state,
        conversation: state.conversation.concat(action.payload),
        currentTicket: updatedTicket
      };

    case GET_FORM_DETAILS:
      return {
        ...state,
        formData: action.payload
      };

    case ASSIGN_STAFF_TO_TICKET:
      return {
        ...state,
        assignedStaff: action.payload
      };

    case GET_FILTER_OPTIONS:
      return {
        ...state,
        filterData: action.payload
      };

    case GET_TAGS_LIST:
      return {
        ...state,
        tagsList: action.payload
      };

    default:
      return state;
  }
}
