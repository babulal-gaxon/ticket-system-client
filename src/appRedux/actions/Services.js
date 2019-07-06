import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {
  ADD_SERVICE,
  BULK_ACTIVE_SERVICES, BULK_DISABLE_SERVICES,
  DELETE_SERVICE,
  EDIT_SERVICE,
  GET_SERVICES_LIST
} from "../../constants/Services";


export const onGetServicesList = (currentPage, itemsPerPage, filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/services', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterData
      }
    }).then(({data}) => {
      if (data.success) {
        console.info("onGetServicesList: ", data);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_SERVICES_LIST, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddService = (service) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/services', service).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_SERVICE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Service has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditService = (service) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/services/${service.id}`, service).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: EDIT_SERVICE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Service details has been updated successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteServices = (serviceId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/services/${serviceId}`).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_SERVICE, payload: serviceId});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Service(s) has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkActiveServices = (serviceIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/services/support/1', serviceIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_SERVICES, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Support of selected Services(s) has been changed to Enabled successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDisableServices = (serviceIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/services/support/0', serviceIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DISABLE_SERVICES, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: SHOW_MESSAGE,
          payload: "The Support of selected Services(s) has been changed to Enabled successfully"
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




