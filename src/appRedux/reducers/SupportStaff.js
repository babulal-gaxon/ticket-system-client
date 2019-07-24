import {
  ADD_STAFF_NOTE,
  ADD_SUPPORT_STAFF,
  BULK_DELETE_SUPPORT_STAFF,
  DELETE_STAFF_NOTE,
  DISABLE_STAFF_STATUS,
  EDIT_STAFF_NOTE,
  EDIT_SUPPORT_STAFF,
  GET_STAFF_ID,
  GET_STAFF_NOTES, GET_STAFF_TICKETS,
  GET_SUPPORT_STAFF, NULLIFY_STAFF, SELECT_CURRENT_STAFF,
  UPLOAD_PROFILE_IMAGE
} from "../../constants/SupportStaff";

const initialState = {
  staffList: [],
  staffId: null,
  totalItems: null,
  profilePicId: "",
  staffNotes: [],
  staffTickets: [],
  currentStaff: null
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

    case GET_STAFF_NOTES:
      return {
        ...state,
        staffNotes: action.payload.data
      };

    case ADD_STAFF_NOTE:
      return {
        ...state,
        staffNotes: [action.payload, ...state.staffNotes]
      };

    case EDIT_STAFF_NOTE:
      const updatedStaffNotes = state.staffNotes.map((note) => note.id === action.payload.id ? action.payload : note);
      return {
        ...state,
        staffNotes: updatedStaffNotes
      };

    case DELETE_STAFF_NOTE:
      const updated = state.staffNotes.filter(note => note.id !== action.payload);
      return {
        ...state,
        staffNotes: updated
      };

    case GET_STAFF_TICKETS:
      return {
        ...state,
        staffTickets: action.payload.data
      };

    case SELECT_CURRENT_STAFF:
      return {
        ...state,
        currentStaff: action.payload
      };

    case NULLIFY_STAFF:
      return {
        ...state,
        currentStaff: null
      };

    default:
      return state;
  }
}