import {
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMERS, DISABLE_CUSTOMER,
  EDIT_CUSTOMER_DETAILS,
  GET_CUSTOMER_ID,
  GET_CUSTOMERS_DATA
} from "../../constants/Customers";
import {BULK_DELETE_SUPPORT_STAFF} from "../../constants/SupportStaff";

const initialState = {
  customersList: [],
  totalItems: null,
  customerId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_DATA:
      return {
        ...state,
        customersList: action.payload.items,
        totalItems: action.payload.paginate.total
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
        if (action.payload.indexOf(customer.id) === -1) {
          return customer
        }
      });
      return {
        ...state,
        customersList: upCustomers,
        totalItems: state.totalItems - action.payload.length
      };


    default:
      return state;
  }
}