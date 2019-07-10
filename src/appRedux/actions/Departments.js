import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {
  ADD_DEPARTMENT,
  BULK_ACTIVE_DEPARTMENTS,
  BULK_DELETE_DEPARTMENTS,
  BULK_INACTIVE_DEPARTMENTS,
  EDIT_DEPARTMENT,
  GET_DEPARTMENTS
} from "../../constants/Departments";

export const onGetDepartments = (currentPage, itemsPerPage, filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/departments', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterData
      }
    }).then(({data}) => {
      console.info("onGetDepartments: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_DEPARTMENTS, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddDepartment = (department) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments', department).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_DEPARTMENT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Department has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeleteDepartments = (departmentIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments/delete', departmentIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_DEPARTMENTS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Department(s) has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkActiveDepartments = (departmentIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments/status/1', departmentIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_DEPARTMENTS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Department(s) has been changed to Active successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkInActiveDepartments = (departmentIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments/status/0', departmentIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_INACTIVE_DEPARTMENTS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Department(s) has been changed to Disabled successfully"
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

export const onEditDepartment = (department) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/departments/${department.id}`, department).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_DEPARTMENT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Department details has been updated successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
