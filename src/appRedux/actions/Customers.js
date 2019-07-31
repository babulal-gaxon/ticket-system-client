import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {
  ADD_NEW_CUSTOMER,
  CUSTOMER_STATUS_CHANGE,
  DELETE_CUSTOMERS,
  DISABLE_CUSTOMER,
  EDIT_CUSTOMER_DETAILS,
  GET_CUSTOMER_COMPANY,
  GET_CUSTOMER_FILTER_OPTIONS,
  GET_CUSTOMER_TICKETS,
  GET_CUSTOMERS_DATA,
  NULLIFY_CUSTOMER,
  SELECT_CURRENT_CUSTOMER,
  SELECT_CURRENT_CUSTOMER_PROFILE
} from "../../constants/Customers";
import {showErrorMessage} from "./Auth";


export const onGetCustomersData = (currentPage, itemsPerPage, filterData, companies, labels, status, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get(`/setup/customers`, {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          search: filterData,
          company: companies ? companies : undefined,
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

export const setCurrentCustomer = (customer) => {
  return {
    type: SELECT_CURRENT_CUSTOMER,
    payload: customer
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
  console.log("onEditCustomer", customer);
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

export const onChangeCustomerStatus = (customerId, status, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.post(`/setup/customers/status/${status}`, customerId).then(({data}) => {
      if (data.success) {
        dispatch({type: CUSTOMER_STATUS_CHANGE, payload: {id:data.data, status: status}});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE,
          payload: `The Status of Customer has been changed to ${status === 0 ? "disabled" : "enabled"} successfully`});
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

export const onGetCustomerFilterOptions = () => {
  return (dispatch) => {
    axios.get('/setup/customers/filter/options').then(({data}) => {
      if (data.success) {
        console.log("onGetCustomerFilterOptions", data);
        dispatch({type: GET_CUSTOMER_FILTER_OPTIONS, payload: data.data});
      }
    }).catch(function (error) {
      console.info("Error****:", error.message);
    });
  }
};

export const onAddImage = (imageFile, context) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post("/uploads/temporary/media", imageFile, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        context.updateProfilePic(data.data);
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

export const onAddCustomerAddress = (address, context) => {
  console.log("onAddCustomerAddress", address);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/customers/address', address).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        context.addAddress(data.data);
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

export const onEditCustomerAddress = (address, context) => {
  console.log("onEditCustomerAddress", address);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/addresses/${address.id}`, address).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        context.updateAddress(data.data);
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

export const onDeleteCustomerAddress = (addressId, context) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/addresses/${addressId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        context.deleteAddress(addressId);
        dispatch({type: SHOW_MESSAGE, payload: "The Address has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetCustomerTickets = (currentCustomer) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/customers/${currentCustomer}/tickets`).then(({data}) => {
      console.info("onGetCustomerTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMER_TICKETS, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetCustomerCompany = (companyId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/customer/companies/${companyId}/members`).then(({data}) => {
      console.info("onGetCustomerCompany: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_CUSTOMER_COMPANY, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onResetPassword = (currentCustomer, password) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/setup/customers/${currentCustomer}/reset/password`, password).then(({data}) => {
      console.info("onResetPassword: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Password has been changed successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetCustomerDetail = (currentCustomer) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/customers/${currentCustomer}`).then(({data}) => {
      console.info("onGetCustomerDetail: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SELECT_CURRENT_CUSTOMER_PROFILE, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch(showErrorMessage(error));
      console.info("Error****:", error.message);
    });
  }
};

export const onNullifyCurrentCustomer = () => {
  return {
    type: NULLIFY_CUSTOMER
  }
};
