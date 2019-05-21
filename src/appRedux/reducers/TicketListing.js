import {SHOW_TICKETS} from "../../constants/TicketListing";

const initialState = {
  tickets: null
}

export default (state = initialState, action)  => {
  switch(action.type) {
    case SHOW_TICKETS :
      return {
        ...state,
        tickets: action.payload
    }
    default:
      return state;
  }
}