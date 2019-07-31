import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {
  ADD_NEW_ROLE,
  BULK_DELETE_ROLES,
  EDIT_ROLE,
  GET_ROLE_DETAIL,
  GET_ROLES,
  NULLIFY_SELECTED_ROLE
} from "../../constants/RolesAndPermissions";


export const onGetRoles = (currentPage, itemsPerPage, filterText, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get('/roles', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterText
      }
    }).then(({data}) => {
      console.info("onGetRoles: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_ROLES, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDisableSelectedRole = () => {
  return {
    type: NULLIFY_SELECTED_ROLE
  }
};


export const onAddRole = (newRole, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/roles', newRole).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: ADD_NEW_ROLE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        dispatch({type: SHOW_MESSAGE, payload: "The Role has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};


export const onBulkDeleteRoles = (roleIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('roles/delete', roleIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_ROLES, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Role(s) has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditRole = (role, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/roles/${role.id}`, role).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: EDIT_ROLE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        history.goBack();
        dispatch({type: SHOW_MESSAGE, payload: "The Role details has been updated successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};


export const onGetRoleDetail = (roleId, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/roles/${roleId}`
    ).then(({data}) => {
      console.info("onGetRoles: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_ROLE_DETAIL, payload: data.data});
        history.push("/roles-permissions/add-new")
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};
