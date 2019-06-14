import {
  ADD_SUPPORT_STAFF,
  DELETE_SUPPORT_STAFF,
  EDIT_SUPPORT_STAFF, GET_STAFF_ID,
  GET_SUPPORT_STAFF
} from "../../constants/SupportStaff";

const initialState = {
  staffList: [],
  staffId: 0
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_SUPPORT_STAFF:
      return {
        ...state,
        staffList: action.payload
      };

    case GET_STAFF_ID:
      return {
        ...state,
        staffId: action.payload
      }

    case ADD_SUPPORT_STAFF:
      return {
        ...state,
        staffList: state.staffList.concat(action.payload)
      };

    case EDIT_SUPPORT_STAFF:
      const updatedStaffList = state.staffList.map((member) => member.id === action.payload.id ? action.payload : member);
      return {
        ...state,
        staffList: updatedStaffList
      };

    case DELETE_SUPPORT_STAFF:
      const updatedStaff = state.staffList.filter((member) => member.id !== action.payload)
      return {
        ...state,
        staffList:updatedStaff
      };

    default:
      return state;
  }
}