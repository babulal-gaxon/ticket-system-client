
import {RECENT_CUSTOMERS} from "../../constants/RecentCustomers";

const initialState = {
  customers: []
}

export default (state = initialState, action)  => {
  switch(action.type) {
    case RECENT_CUSTOMERS :
      return {
        ...state,
        customers: action.payload
      }
    default:
      return state;
  }
}