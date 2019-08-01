import {
  ADD_STAFF_NOTE,
  ADD_SUPPORT_STAFF,
  BULK_DELETE_SUPPORT_STAFF,
  DELETE_STAFF_NOTE,
  EDIT_STAFF_NOTE,
  EDIT_SUPPORT_STAFF,
  GET_STAFF_NOTES,
  GET_STAFF_TICKETS,
  GET_SUPPORT_STAFF,
  NULLIFY_STAFF,
  SELECT_CURRENT_STAFF,
  STAFF_STATUS_CHANGE
} from "../../constants/SupportStaff";

const initialState = {
  staffList: [],
  totalItems: null,
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

    case STAFF_STATUS_CHANGE:
      const updatedStaff = state.staffList.map(staff => {
        if (action.payload.id.indexOf(staff.id) !== -1) {
          staff.status = action.payload.status;
          return staff;
        }
        return staff;
      });
      return {
        ...state,
        staffList: updatedStaff
      };

    case BULK_DELETE_SUPPORT_STAFF:
      return {
        ...state,
        staffList: state.staffList.filter(member => (action.payload.indexOf(member.id) === -1)),
        totalItems: state.totalItems - action.payload.length
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
      console.log("currentstaff", action.payload);
      return {
        ...state,
        currentStaff: action.payload
      };

    case NULLIFY_STAFF:
      console.log("nullify");
      return {
        ...state,
        currentStaff: null
      };

    default:
      return state;
  }
}
