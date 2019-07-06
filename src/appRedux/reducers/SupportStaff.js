import {
  ADD_SUPPORT_STAFF,
  BULK_DELETE_SUPPORT_STAFF,
  DISABLE_STAFF_STATUS,
  EDIT_SUPPORT_STAFF,
  GET_STAFF_ID,
  GET_SUPPORT_STAFF,
  UPLOAD_PROFILE_IMAGE
} from "../../constants/SupportStaff";

const initialState = {
  staffList: [],
  staffId: 0,
  totalItems: null,
  profilePicId: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPPORT_STAFF:
      return {
        ...state,
        staffList: action.payload.data,
        totalItems: action.payload.meta.total
      };

    case GET_STAFF_ID:
      return {
        ...state,
        staffId: action.payload
      };

    case ADD_SUPPORT_STAFF:
      return {
        ...state,
        staffList: [action.payload, ...state.staffList],
        totalItems: state.totalItems + 1,
        profilePicId: ""
      };

    case EDIT_SUPPORT_STAFF:
      const updatedStaffList = state.staffList.map((member) => member.id === action.payload.id ? action.payload : member);
      return {
        ...state,
        staffList: updatedStaffList
      };

    case DISABLE_STAFF_STATUS:
      const updateStaffList = state.staffList.map((member) => member.id === action.payload.id ? action.payload : member);
      return {
        ...state,
        staffList: updateStaffList
      };

    case BULK_DELETE_SUPPORT_STAFF:
      const updateStaff = state.staffList.filter(member => {
        return (action.payload.indexOf(member.id) === -1) ?
          member : null
      });
      return {
        ...state,
        staffList: updateStaff,
        totalItems: state.totalItems - action.payload.length
      };

    case UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        profilePicId: action.payload
      };

    default:
      return state;
  }
}