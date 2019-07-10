import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {
  ADD_COMPANY_ADDRESS,
  ADD_NEW_CUSTOMER,
  ADD_PROFILE_PICTURE,
  DELETE_CUSTOMERS,
  DISABLE_CUSTOMER,
  EDIT_CUSTOMER_DETAILS,
  GET_CUSTOMER_ID,
  GET_CUSTOMERS_DATA
} from "../../constants/Customers";


export const onGetCustomersData = (currentPage, itemsPerPage, filterData, companies, labels, status) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/customers`, {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          search: filterData,
          company: companies,
          labels: labels,
          status: status
        }
      }
    ).then(({data}) => {
      console.info("onGetCustomersData: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMERS_DATA, payload: data});
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

export const onAddNewCustomer = (customer, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/customers', customer).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_NEW_CUSTOMER, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        dispatch({type: SHOW_MESSAGE, payload: "The New Customer has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditCustomer = (customer, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/customers/${customer.id}`, customer).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_CUSTOMER_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        dispatch({type: SHOW_MESSAGE, payload: "The Customer details has been edited successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDisableCustomer = (customer) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/customers/${customer.id}`, customer).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: DISABLE_CUSTOMER, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: SHOW_MESSAGE,
          payload: "The Status of selected Customer has been changed to disabled successfully"
        });
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteCustomers = (customerIds) => {
  console.log("in action", customerIds);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/customers/delete', customerIds).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_CUSTOMERS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Customer has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddImage = (imageFile) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post("/uploads/temporary/media", imageFile, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        dispatch({type: ADD_PROFILE_PICTURE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Profile Picture has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddCustomerAddress = (details) => {
  console.log("onAddCustomerAddress", details);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/customer/address', details).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_COMPANY_ADDRESS, payload: data.data});
        dispatch({type: SHOW_MESSAGE, payload: "The Address has been saved successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
