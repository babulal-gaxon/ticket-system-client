import {
  ERROR_INITIAL_SETUP,
  FETCH_USER_INFO_ERROR,
  FETCH_USER_INFO_START,
  FETCH_USER_INFO_SUCCESS,
  INIT_URL,
  ON_HIDE_LOADER,
  SIGNOUT_USER_SUCCESS,
  START_LOADER,
  UPDATE_USER_PERMISSION_DATA,
  USER_DATA,
  USER_TOKEN_SET
} from "../../constants/ActionTypes";

console.log('token: ', localStorage.getItem('token'));
const INIT_STATE = {
  token: localStorage.getItem('token'),
  initURL: '',
  authUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  userPermissions: localStorage.getItem('permission') ? JSON.parse(localStorage.getItem('permission')) : [],
  loadingUser: true,
  errorMessage: '',
};

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case FETCH_USER_INFO_START: {
      return {...state, loadingUser: true};
    }

    case FETCH_USER_INFO_SUCCESS: {
      return {...state, loadingUser: false};
    }

    case FETCH_USER_INFO_ERROR: {
      return {...state, loadingUser: false};
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: ''
      }
    }

    case START_LOADER: {
      return {
        ...state,
        loadingUser: true
      }
    }

    case ON_HIDE_LOADER: {
      return {
        ...state,
        loadingUser: false
      }
    }
    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case UPDATE_USER_PERMISSION_DATA: {
      return {
        ...state,
        userPermissions: action.payload,
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case ERROR_INITIAL_SETUP: {
      return {
        ...state,
        errorMessage: action.payload,
        loadingUser: false
      }
    }

    default:
      return state;
  }
}
