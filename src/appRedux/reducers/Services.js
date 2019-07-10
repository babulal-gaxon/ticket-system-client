import {
  ADD_SERVICE,
  BULK_ACTIVE_SERVICES,
  BULK_DISABLE_SERVICES,
  DELETE_SERVICE,
  EDIT_SERVICE,
  GET_SERVICES_LIST
} from "../../constants/Services";

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
      const updateList = state.servicesList.filter(service => service.id !== action.payload);
      return {
        ...state,
        servicesList: updateList,
        totalItems: state.totalItems - 1
      };

    case BULK_ACTIVE_SERVICES:
      const activateServices = state.servicesList.map(service => {
        if (action.payload.indexOf(service.id) !== -1) {
          service.support_enable = 1;
          return service;
        }
        return service;
      });
      return {
        ...state,
        servicesList: activateServices
      };

    case BULK_DISABLE_SERVICES:
      const deActivateProducts = state.servicesList.map(service => {
        if (action.payload.indexOf(service.id) !== -1) {
          service.support_enable = 0;
          return service;
        }
        return service;
      });
      return {
        ...state,
        servicesList: deActivateProducts
      };


    default:
      return state
  }
}