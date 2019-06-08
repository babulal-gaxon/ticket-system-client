import {
  ADD_CANNED_RESPONSE,
  DELETE_CANNED_RESPONSE,
  EDIT_CANNED_RESPONSE,
  GET_CANNED_RESPONSES
} from "../../constants/CannedResponses";

const initialState = {
  responses: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CANNED_RESPONSES:
      return {
        ...state,
        responses: action.payload
      }

    case ADD_CANNED_RESPONSE:
      console.log("hello i reached here")
      return {
        ...state,
        responses: state.responses.concat(action.payload)
      };

    case EDIT_CANNED_RESPONSE:
        const updateResponses = state.responses.map((response) => response.id === action.payload.id ? action.payload : response)
        return {
          ...state,
          responses: updateResponses
        };

    case DELETE_CANNED_RESPONSE:
      const updatedResponses = state.responses.filter((cannedResponse) => cannedResponse.id !== action.payload)
      return {
        ...state,
       responses:updatedResponses
      };
    default:
      return state;
  }
}