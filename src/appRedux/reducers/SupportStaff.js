import {SUPPORT_STAFF} from "../../constants/SupportStaff";

const initialState = {
  staff: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SUPPORT_STAFF:
      return {
        ...state,
        staff: action.payload
      }
    default:
      return state;
  }
}