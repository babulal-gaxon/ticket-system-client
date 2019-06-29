import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {ADD_SERVICE, DELETE_SERVICE, EDIT_SERVICE, GET_SERVICES_LIST} from "../../constants/Services";


export const onGetServicesList = (currentPage, itemsPerPage, filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    const url = filterData ? `/setup/services?search=${filterData}&page=${currentPage}&per_page=${itemsPerPage}` :
      `/setup/services?page=${currentPage}&per_page=${itemsPerPage}`;
    axios.get(url).then(({data}) => {

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
        console.log(" sending data", data.data);
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
        console.log(" sending data", data.data);
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




