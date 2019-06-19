import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_SUPPORT_STAFF, BULK_DELETE_SUPPORT_STAFF, DISABLE_STAFF_STATUS,
  EDIT_SUPPORT_STAFF,
  GET_STAFF_ID,
  GET_SUPPORT_STAFF
} from "../../constants/SupportStaff";


export const onGetStaff = (currentPage, itemsPerPage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/staffs?page=${currentPage}&per_page=${itemsPerPage}`
    ).then(({data}) => {
      console.info("onGetStaff: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_SUPPORT_STAFF, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetStaffId = (id) => {
  return {
    type: GET_STAFF_ID,
    payload: id
  }
};


export const onAddSupportStaff = (staffMember, history, successMessage) => {
  console.log("onAddSupportStaff", staffMember);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/staffs', staffMember).then((data) => {
      console.info("data:", data);
      console.log("i m just befor success", data.data);
      if (data.data.success) {
        console.log(" sending data of staff", data.data);
        dispatch({type: ADD_SUPPORT_STAFF, payload: data.data.data});
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

export const onBulkDeleteStaff = (staffIds, successMessage) => {
  console.log("in action", staffIds)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/staffs/delete', staffIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_SUPPORT_STAFF, payload: data.data});
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


export const onEditSupportStaff = (staffMember, history, successMessage) => {
  console.log("history", history);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/staffs/${staffMember.id}`, staffMember).then(({data}) => {
      console.log("in edit staff", data)
      if (data.success) {
        dispatch({type: EDIT_SUPPORT_STAFF, payload: data.data});
        history.goBack();
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

export const onDisableSupportStaff = (staffMember, successMessage) => {
  console.log("disable staffMember",staffMember );
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/staffs/${staffMember.id}`, staffMember).then(({data}) => {
      console.log("in edit staff", data);
      if (data.success) {
        dispatch({type: DISABLE_STAFF_STATUS, payload: data.data});
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

