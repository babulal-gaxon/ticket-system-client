import {
  ADD_NEW_CUSTOMER,
  CUSTOMER_STATUS_CHANGE,
  DELETE_CUSTOMERS,
  EDIT_CUSTOMER_DETAILS,
  GET_CUSTOMER_COMPANY,
  GET_CUSTOMER_FILTER_OPTIONS,
  GET_CUSTOMER_TICKETS,
  GET_CUSTOMERS_DATA,
  NULLIFY_CUSTOMER,
  SELECT_CURRENT_CUSTOMER,
  SELECT_CURRENT_CUSTOMER_PROFILE
} from "../../constants/Customers";

const initialState = {
  customersList: [],
  totalItems: null,
  currentCustomer: null,
  customerAddress: [],
  customerTickets: null,
  customerCompanyMembers: [],
  company: [],
  labels: [],
  currentCustomerProfile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_DATA:
      return {
        ...state,
        customersList: action.payload.data,
        totalItems: action.payload.meta.total
      };

    case ADD_NEW_CUSTOMER:
      return {
        ...state,
        customersList: [action.payload, ...state.customersList],
        totalItems: state.totalItems + 1
      };

    case SELECT_CURRENT_CUSTOMER:
      return {
        ...state,
        currentCustomer: action.payload
      };

    case EDIT_CUSTOMER_DETAILS:
      const updateCustomers = state.customersList.map((customer) => customer.id === action.payload.id ? action.payload : customer);
      return {
        ...state,
        customersList: updateCustomers
      };

    case CUSTOMER_STATUS_CHANGE:
      const updatedCustomer = state.customersList.map(customer => {
        if (action.payload.id.indexOf(customer.id) !== -1) {
          customer.status = action.payload.status;
          return customer;
        }
        return customer;
      });
      return {
        ...state,
        customersList: updatedCustomer
      };


    case DELETE_CUSTOMERS:
      const upCustomers = state.customersList.filter(customer => {
        return (action.payload.indexOf(customer.id) === -1) ?
          customer : null
      });
      return {
        ...state,
        customersList: upCustomers,
        totalItems: state.totalItems - action.payload.length
      };

    case GET_CUSTOMER_TICKETS:
      return {
        ...state,
        customerTickets: action.payload.data
      };

    case GET_CUSTOMER_COMPANY:
      return {
        ...state,
        customerCompanyMembers: action.payload
      };

    case GET_CUSTOMER_FILTER_OPTIONS:
      return {
        ...state,
        company: action.payload.company,
        labels: action.payload.lables
      };

    case SELECT_CURRENT_CUSTOMER_PROFILE:
      return {
        ...state,
        currentCustomerProfile: action.payload
      };

    case NULLIFY_CUSTOMER:
      return {
        ...state,
        currentCustomerProfile: null
      };

    default:
      return state;
  }
}
