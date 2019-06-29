import {ADD_PRODUCT, ADD_PRODUCT_LOGO, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS_LIST} from "../../constants/Products";

const initialState = {
  productsList: [],
  totalItems: null,
  productLogoId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_LIST:
      return {
        ...state,
        productsList: action.payload.data,
        totalItems: action.payload.meta.total
      };

    case ADD_PRODUCT:
      return {
        ...state,
        productsList: [action.payload, ...state.productsList],
        totalItems: state.totalItems + 1
      };

    case EDIT_PRODUCT:
      const updatedList = state.productsList.map(product => product.id === action.payload.id ? action.payload : product);
      return {
        ...state,
        productsList: updatedList
      };

    case DELETE_PRODUCT:
      const updateList = state.productsList.filter(product => product.id !== action.payload);
      return {
        ...state,
        productsList: updateList,
        totalItems: state.totalItems - 1
      };

    case ADD_PRODUCT_LOGO:
      return {
        ...state,
        productLogoId: action.payload
      };

    default:
      return state
  }
}