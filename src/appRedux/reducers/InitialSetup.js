import {
  ADD_ADMIN_INFO,
  ADD_DATABASE_INFO,
  ADD_GENERAL_INFO,
  OPEN_PIN_MODAL,
  STEP_VALUE
} from "../../constants/InitialSetup";


const initialState = {
  databaseInfo: {},
  adminInfo: {},
  generalInfo: {},
  showPinModal: false,
  flag: null
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

    case OPEN_PIN_MODAL:
      return {
        ...state,
        showPinModal: action.payload
      };

    case STEP_VALUE:
      return {
        ...state,
        flag: action.payload
      };

    default:
      return state;
  }
}