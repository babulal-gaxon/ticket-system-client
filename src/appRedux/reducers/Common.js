import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  HIDE_MESSAGE,
  SHOW_MESSAGE,
  UPDATING_CONTENT
} from '../../constants/ActionTypes'

const INIT_STATE = {
  error: "",
  loading: false,
  updatingContent: false,
  message: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return {...state, error: '', message: '', loading: true};
    }
    case UPDATING_CONTENT: {
      return {...state, error: '', message: '', updatingContent: true};
    }
    case FETCH_SUCCESS: {
      return {...state, error: '', message: action.payload, loading: false, updatingContent: false};
    }
    case SHOW_MESSAGE: {
      return {...state, error: '', message: action.payload, loading: false, updatingContent: false};
    }
    case FETCH_ERROR: {
      return {...state, loading: false, error: action.payload, message: '', updatingContent: false};
    }
    case HIDE_MESSAGE: {
      return {...state, loading: false, error: '', message: '', updatingContent: false};
    }
    default:
      return state;
  }
}
