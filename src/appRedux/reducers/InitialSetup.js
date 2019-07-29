import {ADD_ADMIN_INFO, ADD_DATABASE_INFO, ADD_GENERAL_INFO, OPEN_PIN_MODAL} from "../../constants/InitialSetup";
import {INITIAL_SETUP_STEPS, SETUP_COMPLETE, UPDATE_STEPS} from "../../constants/ActionTypes";


const initialState = {
  databaseInfo: {},
  adminInfo: {},
  generalInfo: {},
  showPinModal: false,
  initialSteps: {},
  currentStep: 0,
  isSetupRequired: false
};


const getCurrentStep = (pendingSteps) => {
  switch (pendingSteps) {
    case 1:
      return 2;
    case 2:
      return 1;
    case 3:
      return 1;
    case 4:
      return 0;
    default:
      return 0;
  }
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


    case SETUP_COMPLETE: {
      return {
        ...state,
        initialSteps: {}
      }
    }

    case UPDATE_STEPS: {
      return {
        ...state,
        currentStep: action.payload
      }
    }

    case INITIAL_SETUP_STEPS: {
      const pendingSteps = Object.keys(action.payload.pending_steps).length;
      return {
        ...state,
        isSetupRequired: pendingSteps > 0,
        currentStep: getCurrentStep(pendingSteps),
        initialSteps: action.payload,
      }
    }
    default:
      return state;
  }
}
