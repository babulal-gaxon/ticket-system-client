import {ADD_SERVICE, DELETE_SERVICE, EDIT_SERVICE, GET_SERVICES_LIST} from "../../constants/Services";

const initialState = {
  servicesList: [],
  totalItems: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES_LIST:
      return {
        ...state,
        servicesList: action.payload.data,
        totalItems: action.payload.meta.total
      };

    case ADD_SERVICE:
      return {
        ...state,
        servicesList: [action.payload, ...state.servicesList],
        totalItems: state.totalItems + 1
      };

    case EDIT_SERVICE:
      const updatedList = state.servicesList.map(service => service.id === action.payload.id ? action.payload : service);
      return {
        ...state,
        servicesList: updatedList
      };

    case DELETE_SERVICE:
      const deletedId = action.payload;
      let updateList = [];
      console.log("update list before update", updateList);
      updateList = state.servicesList.filter(service => service.id !== deletedId);
      console.log("update list", deletedId, updateList);
      return {
        ...state,
        servicesList: updateList,
        totalItems: state.totalItems - 1
      };

    default:
      return state
  }
}