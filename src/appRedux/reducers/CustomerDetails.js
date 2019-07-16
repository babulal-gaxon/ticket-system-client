import {GET_FORM_OPTIONS, GET_RAISED_TICKETS, RAISE_NEW_TICKET} from "../../constants/CustomerDetails";

const initialState = {
  raisedTickets: [],
  totalTickets: null,
  formOptions: {
    services: [],
    departments: [],
    products: [],
    priorities: []
  }
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

    default:
      return state;
  }
}