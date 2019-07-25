import {
  ADD_CUSTOMER_ADDRESS,
  ADD_NEW_CUSTOMER,
  ADD_PROFILE_PICTURE,
  DELETE_CUSTOMERS,
  DISABLE_CUSTOMER, EDIT_CUSTOMER_ADDRESS,
  EDIT_CUSTOMER_DETAILS,
  GET_CUSTOMER_COMPANY,
  GET_CUSTOMER_FILTER_OPTIONS,
  GET_CUSTOMER_ID,
  GET_CUSTOMER_TICKETS,
  GET_CUSTOMERS_DATA,
  NULLIFY_CUSTOMER,
  SELECT_CURRENT_CUSTOMER
} from "../../constants/Customers";

const initialState = {
  customersList: [],
  totalItems: null,
  customerId: null,
  profilePicId: null,
  customerAddress: [],
  customerTickets: null,
  customerCompanyMembers: [],
  company: [],
  labels: [],
  currentCustomer: null
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

    case GET_CUSTOMER_ID:
      return {
        ...state,
        customerId: action.payload
      };

    case EDIT_CUSTOMER_DETAILS:
      const updateCustomers = state.customersList.map((customer) => customer.id === action.payload.id ? action.payload : customer)
      return {
        ...state,
        customersList: updateCustomers,
      };

    case DISABLE_CUSTOMER:
      const acitveCustomers = state.customersList.map((customer) => customer.id === action.payload.id ? action.payload : customer)
      return {
        ...state,
        customersList: acitveCustomers
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
    case ADD_PROFILE_PICTURE:
      return {
        ...state,
        profilePicId: action.payload
      };

    case ADD_CUSTOMER_ADDRESS:
      return {
        ...state,
        customerAddress: state.customerAddress.concat(action.payload)
      };

    case EDIT_CUSTOMER_ADDRESS:
      const updatedAddresses = state.customerAddress.map((address) => address.id === action.payload.id ? action.payload : address)
      return {
        ...state,
        customerAddress: updatedAddresses
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

    case SELECT_CURRENT_CUSTOMER:
      return {
        ...state,
        currentCustomer: action.payload
      };

    case NULLIFY_CUSTOMER:
      return {
        ...state,
        currentCustomer: null
      };

    default:
      return state;
  }
}