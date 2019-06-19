import {
  ADD_DEPARTMENT,
  BULK_ACTIVE_DEPARTMENTS,
  BULK_DELETE_DEPARTMENTS,
  BULK_INACTIVE_DEPARTMENTS,
  EDIT_DEPARTMENT,
  GET_DEPARTMENTS
} from "../../constants/Departments";

const initialState = {
  dept: [],
  totalItems: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        dept: action.payload.items,
        totalItems: action.payload.paginate.total
      };

    case ADD_DEPARTMENT:
      return {
        ...state,
        dept: [action.payload, ...state.dept],
        totalItems: state.totalItems + 1
      };

    case EDIT_DEPARTMENT:
      const updateDepartments = state.dept.map((department) => department.id === action.payload.id ? action.payload : department)
      return {
        ...state,
        dept: updateDepartments,
      };

    case BULK_DELETE_DEPARTMENTS:
      const upDepartments = state.dept.filter(department => {
        if (action.payload.indexOf(department.id) === -1) {
          return department
        }
      });
      return {
        ...state,
        dept: upDepartments,
        totalItems: state.totalItems - action.payload.length
      };

    case BULK_ACTIVE_DEPARTMENTS:
      const activateDepartments = state.dept.map(department => {
        if (action.payload.indexOf(department.id) !== -1) {
          department.status = 1;
          return department;
        }
        return department;
      });
      return {
        ...state,
        dept: activateDepartments
      };

    case BULK_INACTIVE_DEPARTMENTS:
      const deActivateDepartments = state.dept.map(department => {
        if (action.payload.indexOf(department.id) !== -1) {
          department.status = 0;
          return department;
        }
        return department;
      });
      return {
        ...state,
        dept: deActivateDepartments
      };

    default:
      return state;
  }
}