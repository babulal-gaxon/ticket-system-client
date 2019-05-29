

import {
  ADD_DEPARTMENT, DELETE_DEPARTMENT, GET_DEPARTMENTS,
  TOGGLE_ADD_DEPARTMENT_BOX
} from "../../constants/Departments";

const initialState = {
  dept: [],
  showAddDepartment: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return {
        ...state,
        dept: action.payload
      }

    case TOGGLE_ADD_DEPARTMENT_BOX:
      return {
        ...state,
        showAddDepartment: !state.showAddDepartment
      }

    case ADD_DEPARTMENT:
      return {
        ...state,
        dept: state.dept.concat(action.payload),
        showAddDepartment: false
      }

      case DELETE_DEPARTMENT:
        const updatedDepartments = state.dept.filter((department) => department.id !== action.payload)
        return {
          ...state,
          dept:updatedDepartments
        }
    default:
      return state;
  }
}