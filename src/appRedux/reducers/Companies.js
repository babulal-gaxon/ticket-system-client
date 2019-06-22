import {
  ADD_NEW_COMPANY,
  DELETE_COMPANIES,
  EDIT_COMPANY_DETAILS,
  EDIT_COMPANY_LOGO,
  GET_COMPANY_DATA
} from "../../constants/Companies";

const initialState = {
  companiesList: [],
  totalItems: null,
  companyLogoId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANY_DATA:
      return {
        ...state,
        companiesList: action.payload.items,
        totalItems: action.payload.paginate.total
      };

    case ADD_NEW_COMPANY:
      return {
        ...state,
        companiesList: [action.payload, ...state.companiesList],
        totalItems: state.totalItems + 1
      };

    case EDIT_COMPANY_DETAILS:
      const updatedCompanies = state.companiesList.map(company => company.id === action.payload.id ? action.payload : company)
      return {
        ...state,
        companiesList: updatedCompanies
      };

    case DELETE_COMPANIES:
      const updateCompanies = state.companiesList.filter(company => {
        if (action.payload.indexOf(company.id) === -1) {
          return company
        }
      });
      return {
        ...state,
        companiesList: updateCompanies,
        totalItems: state.totalItems - action.payload.length
      };

    case EDIT_COMPANY_LOGO:
      return {
        ...state,
        companyLogoId: action.payload
      };

    default:
      return state;
  }
}