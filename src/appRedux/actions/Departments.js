import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {ADD_DEPARTMENT, DELETE_DEPARTMENT, EDIT_DEPARTMENT, GET_DEPARTMENTS} from "../../constants/Departments";

export const onGetDepartments = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/departments'
    ).then(({data}) => {
      console.info("onGetDepartments: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_DEPARTMENTS, payload: data.data});
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
  console.log("onAddDepartment", department)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/departments', department).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_DEPARTMENT, payload: data.data});
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

export const onDeleteDepartment = (departmentId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/departments/${departmentId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: DELETE_DEPARTMENT, payload: departmentId});
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

export const onEditDepartment = (department) => {
  console.log("onEditDepartment", department)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/departments/${department.id}`, department).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: EDIT_DEPARTMENT, payload: data.data});
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
