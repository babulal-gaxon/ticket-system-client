import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_DEPARTMENT, BULK_ACTIVE_DEPARTMENTS,
  BULK_DELETE_DEPARTMENTS, BULK_INACTIVE_DEPARTMENTS,
  DELETE_DEPARTMENT,
  EDIT_DEPARTMENT,
  GET_DEPARTMENTS
} from "../../constants/Departments";

export const onGetDepartments = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/departments'
    ).then(({data}) => {
      console.info("onGetDepartments: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_DEPARTMENTS, payload: data.data.items});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};


export const onAddDepartment = (department, addMessage) => {
  console.log("onAddDepartment", department)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments', department).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_DEPARTMENT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        addMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteDepartment = (departmentId, deleteMessage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/departments/${departmentId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: DELETE_DEPARTMENT, payload: departmentId});
        dispatch({type: FETCH_SUCCESS});
        deleteMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeleteDepartments = (departmentIds, deleteMessage) => {
  console.log("in action", departmentIds)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments/delete', departmentIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_DEPARTMENTS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        deleteMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
}

export const onBulkActiveDepartments = (departmentIds, successMessage) => {
  console.log("in action", departmentIds)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments/status/1', departmentIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_ACTIVE_DEPARTMENTS, payload: data.data});
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
}

export const onBulkInActiveDepartments = (departmentIds, successMessage) => {
  console.log("in action", departmentIds)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments/status/0', departmentIds).then(({data}) => {
      console.log("data.data", data)
      if (data.success) {
        dispatch({type: BULK_INACTIVE_DEPARTMENTS, payload: data.data});
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

export const onEditDepartment = (department, editMessage) => {
  console.log("onEditDepartment", department)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/departments/${department.id}`, department).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: EDIT_DEPARTMENT, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        editMessage();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
