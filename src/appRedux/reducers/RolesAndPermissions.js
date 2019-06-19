import {
  ADD_NEW_ROLE,
  BULK_DELETE_ROLES,
  DELETE_ROLE,
  DISABLE_ROLE_STATUS,
  EDIT_ROLE,
  GET_ROLE_DETAIL,
  GET_ROLES,
  NULLIFY_SELECTED_ROLE
} from "../../constants/RolesAndPermissions";


const initialState = {
  roles: [],
  roleId: 0,
  totalItems: null,
  selectedRole: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload.items,
        totalItems: action.payload.paginate.total
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
      console.log("in add new role reducer", action.payload)
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

    case DELETE_ROLE:
      const updatedRoles = state.roles.filter((role) => role.id !== action.payload);
      return {
        ...state,
        roles: updatedRoles,
        totalItems: state.totalItems - 1
      };

    case BULK_DELETE_ROLES:
      const upRoles = state.roles.filter(role => {
        if (action.payload.role_ids.indexOf(role.id) === -1) {
          return role
        }
      });
      return {
        ...state,
        roles: upRoles,
        totalItems: state.totalItems - action.payload.role_ids.length
      };

    default:
      return state;
  }
}