import {
  ADD_CUSTOMER_PANEL_DETAILS, ADD_GENERAL_ADDRESS,
  ADD_GENERAL_DETAILS,
  ADD_LOCALIZATION_DETAILS, GET_COUNTRIES_LIST, GET_CUSTOMER_PANEL_DETAILS, GET_GENERAL_ADDRESS,
  GET_GENERAL_DETAILS,
  GET_LOCALIZATION_DETAILS
} from "../../constants/GeneralSettings";

const initialState = {
  generalSettingsData: null,
  localizationDetails: null,
  customerPanelDetails: null,
  generalAddress: [],
  countriesList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GENERAL_DETAILS:
      if (action.payload)
        return {
          ...state,
          generalSettingsData: action.payload
        };

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
      console.log(" i am in countries list")
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
      console.log(" i am in countries list")
      return {
        ...state,
        generalAddress: action.payload
      };

    default: return state;
  }
}