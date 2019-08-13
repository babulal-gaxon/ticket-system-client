import {
  ADD_NEW_ROLE,
  BULK_DELETE_ROLES,
  EDIT_ROLE,
  GET_ROLE_DETAIL,
  GET_ROLES,
  NULLIFY_SELECTED_ROLE
} from "../../constants/RolesAndPermissions";


const initialState = {
  roles: [],
  totalItems: null,
  selectedRole: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload.data,
        totalItems: action.payload.meta.total
      };

    case NULLIFY_SELECTED_ROLE:
      return {
        ...state,
        selectedRole: null
      };

    case GET_ROLE_DETAIL:
      return {
        ...state,
        selectedRole: action.payload
      };

    case ADD_NEW_ROLE:
      return {
        ...state,
        roles: [action.payload, ...state.roles],
        totalItems: state.totalItems + 1
      };

    case EDIT_ROLE:
      const updateRoles = state.roles.map((role) => role.id === action.payload.id ? action.payload : role);
      return {
        ...state,
        roles: updateRoles,
        selectedRole: null
      };

    case BULK_DELETE_ROLES:
      return {
        ...state,
        roles: state.roles.filter(role => (action.payload.indexOf(role.id) === -1)),
        totalItems: state.totalItems - action.payload.length
      };

    default:
      return state;
  }
}