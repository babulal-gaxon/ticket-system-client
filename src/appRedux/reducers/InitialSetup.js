import {ADD_ADMIN_INFO, ADD_DATABASE_INFO, ADD_GENERAL_INFO} from "../../constants/InitialSetup";


const initialState = {
  databaseInfo: {},
  adminInfo: {},
  generalInfo: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATABASE_INFO:
      return {
        ...state,
        databaseInfo: action.payload
      };

    case ADD_ADMIN_INFO:
      return {
        ...state,
        adminInfo: action.payload
      };

    case ADD_GENERAL_INFO:
      return {
        ...state,
        generalInfo: action.payload
      };

    default:
      return state;
  }
}