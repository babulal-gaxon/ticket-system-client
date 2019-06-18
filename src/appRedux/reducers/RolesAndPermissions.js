import {
  ADD_NEW_ROLE,
  BULK_DELETE_ROLES,
  DELETE_ROLE,
  EDIT_ROLE,
  GET_ROLE_ID,
  GET_ROLES
} from "../../constants/RolesAndPermissions";


const initialState = {
  roles: [],
  roleId: 0,
  totalItems: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES:
      return {
        ...state,
        roles: action.payload.items,
        totalItems: action.payload.paginate.total
      };

    case GET_ROLE_ID:
      return {
        ...state,
        roleId: action.payload
      };

    case ADD_NEW_ROLE:
      console.log("in add new role reducer", action.payload)
      return {
        ...state,
        roles: [action.payload, ...state.roles],
        totalItems: state.totalItems + 1
      };

    case EDIT_ROLE:
      const updateRoles = state.dept.map((role) => role.id === action.payload.id ? action.payload : role)
      return {
        ...state,
        roles:updateRoles,
      };

    case DELETE_ROLE:
      const updatedRoles = state.roles.filter((role) => role.id !== action.payload)
      return {
        ...state,
        roles:updatedRoles,
        totalItems: state.totalItems - 1
      };

    case BULK_DELETE_ROLES:
      const upRoles = state.roles.filter(role => {
        if(action.payload.role_ids.indexOf(role.id) === -1) {
          return role
        }
      });
      return {
        ...state,
        staffList:upRoles,
        totalItems: state.totalItems - action.payload.role_ids.length
      };

    default:
      return state;
  }
}