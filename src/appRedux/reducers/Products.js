import {
  ADD_PRODUCT,
  BULK_ACTIVE_PRODUCTS,
  BULK_DISABLE_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS_LIST
} from "../../constants/Products";

const initialState = {
  productsList: [],
  totalItems: null
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
      const updateList = state.productsList.filter(product => {
        return (action.payload.indexOf(product.id) === -1) ?
          product : null
      });
      return {
        ...state,
        productsList: updateList,
        totalItems: state.totalItems - action.payload.length
      };


    case BULK_ACTIVE_PRODUCTS:
      const activateProducts = state.productsList.map(product => {
        if (action.payload.indexOf(product.id) !== -1) {
          product.support_enable = 1;
          return product;
        }
        return product;
      });
      return {
        ...state,
        productsList: activateProducts
      };

    case BULK_DISABLE_PRODUCTS:
      const deActivateProducts = state.productsList.map(product => {
        if (action.payload.indexOf(product.id) !== -1) {
          product.support_enable = 0;
          return product;
        }
        return product;
      });
      return {
        ...state,
        productsList: deActivateProducts
      };

    default:
      return state
  }
}