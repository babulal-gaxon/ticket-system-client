import {
  ADD_CUSTOMER_PANEL_DETAILS,
  ADD_GENERAL_ADDRESS,
  ADD_GENERAL_DETAILS,
  ADD_LOCALIZATION_DETAILS,
  ADD_TICKET_SETTINGS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
  GET_COUNTRIES_LIST,
  GET_CUSTOMER_PANEL_DETAILS,
  GET_GENERAL_ADDRESS,
  GET_GENERAL_DETAILS,
  GET_LOCALIZATION_DETAILS,
  GET_TICKET_SETTINGS
} from "../../constants/GeneralSettings";

const initialState = {
  generalSettingsData: null,
  localizationDetails: null,
  customerPanelDetails: null,
  generalAddress: [],
  countriesList: [],
  ticketSettings: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_GENERAL_DETAILS:
      if (action.payload)
        return {
          ...state,
          generalSettingsData: action.payload
        };
      else {
        return {
          ...state,
          generalSettingsData: null
        }
      }

    case ADD_GENERAL_DETAILS:
      return {
        ...state,
        generalSettingsData: action.payload
      };

    case GET_LOCALIZATION_DETAILS:
      return {
        ...state,
        localizationDetails: action.payload
      };

    case ADD_LOCALIZATION_DETAILS:
      return {
        ...state,
        localizationDetails: action.payload
      };

    case GET_CUSTOMER_PANEL_DETAILS:
      return {
        ...state,
        customerPanelDetails: action.payload
      };

    case ADD_CUSTOMER_PANEL_DETAILS:
      return {
        ...state,
        customerPanelDetails: action.payload
      };

    case GET_COUNTRIES_LIST:
      return {
        ...state,
        countriesList: action.payload
      };

    case ADD_GENERAL_ADDRESS:
      return {
        ...state,
        generalAddress: action.payload
      };

    case GET_GENERAL_ADDRESS:
      return {
        ...state,
        generalAddress: action.payload
      };

    case EDIT_ADDRESS:
      const updatedAddresses = state.generalAddress.map((address) => address.id === action.payload.id ? action.payload : address);
      return {
        ...state,
        generalAddress: updatedAddresses
      };

    case DELETE_ADDRESS:
      const updateAddresses = state.generalAddress.filter(address => address.id !== action.payload);
      return {
        ...state,
        generalAddress: updateAddresses
      };

    case GET_TICKET_SETTINGS:
      return {
        ...state,
        ticketSettings: action.payload
      };

    case ADD_TICKET_SETTINGS:
      return {
        ...state,
        ticketSettings: action.payload
      };

    default:
      return state;
  }
}
