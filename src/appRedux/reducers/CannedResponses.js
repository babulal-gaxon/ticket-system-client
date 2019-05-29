

import {
  ADD_CANNED_RESPONSE, DELETE_CANNED_RESPONSE, GET_CANNED_RESPONSES,
  TOGGLE_ADD_CANNED_BOX
} from "../../constants/CannedResponses";

const initialState = {
  responses: [],
  showAddCanned: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CANNED_RESPONSES:
      return {
        ...state,
        responses: action.payload
      }

    case TOGGLE_ADD_CANNED_BOX:
      return {
        ...state,
        showAddCanned: !state.showAddCanned
      }

    case ADD_CANNED_RESPONSE:
      console.log("hello i reached here")
      return {
        ...state,
        responses: state.responses.concat(action.payload),
        showAddCanned: false
      }

    case DELETE_CANNED_RESPONSE:
      const updatedResponses = state.responses.filter((cannedResponse) => cannedResponse.id !== action.payload)
      return {
        ...state,
       responses:updatedResponses
      }
    default:
      return state;
  }
}