import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMERS, DISABLE_CUSTOMER,
  EDIT_CUSTOMER_DETAILS,
  GET_CUSTOMER_ID,
  GET_CUSTOMERS_DATA
} from "../../constants/Customers";


export const onGetCustomersData = (currentPage, itemsPerPage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/company/contacts?page=${currentPage}&per_page=${itemsPerPage}`
    ).then(({data}) => {
      console.info("onGetCustomersData: ", data);
      if (data.success) {
        console.log("data of companies", data.data.items);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMERS_DATA, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const getCustomerId = (id) => {
  return {
    type: GET_CUSTOMER_ID,
    payload: id
  }
};

export const onAddNewCustomer = (customer,history, successMessage) => {
  console.log("onAddCustomer", customer);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/company/contacts', customer).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_NEW_CUSTOMER, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditCustomer = (customer, history, successMessage) => {
  console.log("onEditCustomer", customer);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/company/contacts/${customer.id}`, customer).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_CUSTOMER_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDisableCustomer = (customer, successMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/company/contacts/${customer.id}`, customer).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: DISABLE_CUSTOMER, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteCustomers = (customerIds, successMessage) => {
  console.log("in action", customerIds);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/company/contacts/delete', customerIds).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_CUSTOMERS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        successMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
