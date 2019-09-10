import {
  ADD_ADMIN_INFO,
  ADD_DATABASE_INFO,
  ADD_GENERAL_INFO,
  NULLIFY_PENDING_STEPS,
  OPEN_PIN_MODAL, PIN_VERIFIED
} from "../../constants/InitialSetup";
import {INITIAL_SETUP_STEPS, SETUP_COMPLETE, UPDATE_STEPS} from "../../constants/ActionTypes";


const initialState = {
  generalInfo: {},
  showPinModal: false,
  initialSteps: {
    pending_steps: {},
    completed_steps: {}
  },
  currentStep: 8,
  isSetupRequired: false,
  totalPendingSteps: null,
  isPinVerified: false
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
      let steps = state.initialSteps;
      steps.completed_steps.database_setup = action.payload;
      return {
        ...state,
        initialSteps: steps
      };

    case ADD_ADMIN_INFO:
      let updatedSteps = state.initialSteps;
      updatedSteps.completed_steps.admin_account_setup = action.payload;
      return {
        ...state,
        initialSteps: updatedSteps
      };

    case ADD_GENERAL_INFO:
      let updateSteps = state.initialSteps;
      updateSteps.completed_steps.company_setup = action.payload;
      return {
        ...state,
        initialSteps: updateSteps
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
        isSetupRequired: pendingSteps > 1,
        currentStep: getCurrentStep(pendingSteps),
        initialSteps: action.payload,
        totalPendingSteps: pendingSteps
      }
    }

    case NULLIFY_PENDING_STEPS:
    return {
      ...state,
      totalPendingSteps: 0
    };

    case PIN_VERIFIED:
      return {
        ...state,
        isPinVerified: true
      };

    default:
      return state;
  }
}
