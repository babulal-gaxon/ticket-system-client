import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {ADD_NEW_ROLE, DELETE_ROLE, EDIT_ROLE, GET_ROLE_ID, GET_ROLES} from "../../constants/RolesAndPermissions";


export const onGetRoles = () => {
  console.log("hello onGet ROles")
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/roles'
    ).then(({data}) => {
      console.info("onGetRoles: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_ROLES, payload: data.data.items});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetRoleID = (id) => {
  return {
    type: GET_ROLE_ID,
    payload: id
  }
}


export const onAddRole = (newRole) => {
  console.log("hello onAddRole ROles")
  console.log("onAddRole", newRole);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/roles', newRole).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_NEW_ROLE, payload: data.data.items});
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

export const onDeleteRole = (roleId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/roles/${roleId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: DELETE_ROLE, payload: roleId});
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

export const onEditRole = (role) => {
  console.log("hello onEditRole ROles")
  console.log("onEditRole", role)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/roles/${role.id}`, role).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: EDIT_ROLE, payload: data.data});
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
