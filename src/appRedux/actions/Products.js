import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {ADD_PRODUCT, ADD_PRODUCT_LOGO, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS_LIST} from "../../constants/Products";
import {EDIT_COMPANY_LOGO} from "../../constants/Companies";


export const onGetProductsList = (currentPage, itemsPerPage, filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    const url = filterData ? `/setup/products?search=${filterData}&page=${currentPage}&per_page=${itemsPerPage}` :
      `/setup/products?page=${currentPage}&per_page=${itemsPerPage}`;
    axios.get(url).then(({data}) => {
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
        console.log(" sending data", data.data);
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
        console.log(" sending data", data.data);
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
    axios.delete(`/setup/products/${productId}`).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_PRODUCT, payload: productId});
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

export const onAddProductLogo = (imageFile) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post("/uploads/temporary/media", imageFile, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      console.log("profile pic add", data);
      if (data.success) {
        dispatch({type: ADD_PRODUCT_LOGO, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};




