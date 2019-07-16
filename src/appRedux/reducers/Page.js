import {GET_FORM_OPTIONS, GET_RAISED_TICKETS} from "../../constants/CustomerPage";

const initialState = {
  raisedTickets: [],
  totalTickets: null,
  formOptions: {
    services: [],
    departments: [],
    products: []
  }
}

export default(state = initialState, action) => {
  switch(action.type) {
    case GET_RAISED_TICKETS:
      return {
        ...state,
        raisedTickets: action.payload.data,
        totalTickets: action.payload.meta.total
      };

    case GET_FORM_OPTIONS:
      return {
        ...state,
        formOptions: {
          services: action.payload.services,
          departments: action.payload.departments,
          products: action.payload.products
        }
      };

    default:
      return state;
  }
}