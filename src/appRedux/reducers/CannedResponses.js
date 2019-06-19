import {
  ADD_CANNED_RESPONSE,
  BULK_ACTIVE_RESPONSE,
  BULK_DELETE_RESPONSE,
  BULK_DISABLE_RESPONSE,
  EDIT_CANNED_RESPONSE,
  GET_CANNED_RESPONSES
} from "../../constants/CannedResponses";

const initialState = {
  responses: [],
  totalItems: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CANNED_RESPONSES:
      return {
        ...state,
        responses: action.payload.items,
        totalItems: action.payload.paginate.total
      };

    case ADD_CANNED_RESPONSE:
      return {
        ...state,
        responses: [action.payload, ...state.responses],
        totalItems: state.totalItems + 1
      };

    case EDIT_CANNED_RESPONSE:
      const updateResponses = state.responses.map((response) => response.id === action.payload.id ? action.payload : response)
      return {
        ...state,
        responses: updateResponses
      };

    case BULK_DELETE_RESPONSE:
      const upResponses = state.responses.filter(response => {
        if (action.payload.indexOf(response.id) === -1) {
          return response
        }
      });
      return {
        ...state,
        responses: upResponses,
        totalItems: state.totalItems - action.payload.length
      };

    case BULK_ACTIVE_RESPONSE:
      const activateResponses = state.responses.map(response => {
        if (action.payload.indexOf(response.id) !== -1) {
          response.status = 1;
          return response;
        }
        return response;
      });
      return {
        ...state,
        responses: activateResponses
      };

    case BULK_DISABLE_RESPONSE:
      const deActivateResponses = state.responses.map(response => {
        if (action.payload.indexOf(response.id) !== -1) {
          response.status = 0;
          return response;
        }
        return response;
      });
      return {
        ...state,
        responses: deActivateResponses
      };
    default:
      return state;
  }
}