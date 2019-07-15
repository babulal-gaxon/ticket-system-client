import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {
  ADD_PRODUCT,
  BULK_ACTIVE_PRODUCTS,
  BULK_DISABLE_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS_LIST
} from "../../constants/Products";


export const onGetProductsList = (currentPage, itemsPerPage, filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
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
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddProduct = (product) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/products', product).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_PRODUCT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Product has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditProduct = (product) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/products/${product.id}`, product).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: EDIT_PRODUCT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Product details has been updated successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteProduct = (productId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/products/delete', productId).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_PRODUCT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Product(s) has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkActiveProducts = (productIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/products/support/1', productIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_PRODUCTS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Product(s) has been changed to Active successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDisableProducts = (productIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/products/support/0', productIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_PRODUCTS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Product(s) has been changed to Disabled successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};





