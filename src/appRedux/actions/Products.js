import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {
  ADD_PRODUCT,
  BULK_ACTIVE_PRODUCTS,
  BULK_DISABLE_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS_LIST
} from "../../constants/Products";


export const onGetProductsList = (currentPage, itemsPerPage, filterData, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get('/setup/products', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterData
      }
    }).then(({data}) => {
      console.info("onGetProductsList: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_PRODUCTS_LIST, payload: data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddProduct = (product, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/products', product).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_PRODUCT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.products.add"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditProduct = (product, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/products/${product.id}`, product).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: EDIT_PRODUCT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.products.edit"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteProduct = (productId, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/products/delete', productId).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_PRODUCT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.products.delete"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkActiveProducts = (productIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/products/support/1', productIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_PRODUCTS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.products.active"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDisableProducts = (productIds, context) => {
  const {messages} = context.props.intl;
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/products/support/0', productIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_PRODUCTS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: messages["action.products.disable"]});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};





