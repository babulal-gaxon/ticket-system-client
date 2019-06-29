import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {
  ADD_SUPPORT_STAFF, BULK_DELETE_SUPPORT_STAFF, DISABLE_STAFF_STATUS,
  EDIT_SUPPORT_STAFF,
  GET_STAFF_ID,
  GET_SUPPORT_STAFF, UPLOAD_PROFILE_IMAGE
} from "../../constants/SupportStaff";


export const onGetStaff = (currentPage, itemsPerPage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/staffs?page=${currentPage}&per_page=${itemsPerPage}`
    ).then(({data}) => {
      console.info("onGetStaff: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_SUPPORT_STAFF, payload: data});
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


export const onAddSupportStaff = (staffMember, history) => {
  console.log("onAddSupportStaff", staffMember);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/staffs', staffMember).then((data) => {
      console.log("i m just before success", data.data);
      if (data.data.success) {
        console.log(" sending data of staff", data.data);
        dispatch({type: ADD_SUPPORT_STAFF, payload: data.data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Staff has been added successfully"});
        history.goBack();
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeleteStaff = (staffIds) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/staffs/delete', staffIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_SUPPORT_STAFF, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Staff(s) has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditSupportStaff = (staffMember, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/staffs/${staffMember.id}`, staffMember).then(({data}) => {
      if (data.success) {
        dispatch({type: EDIT_SUPPORT_STAFF, payload: data.data});
        history.goBack();
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Staff details has been edited successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDisableSupportStaff = (staffMember) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/staffs/${staffMember.id}`, staffMember).then(({data}) => {
      console.log("in edit staff", data);
      if (data.success) {
        dispatch({type: DISABLE_STAFF_STATUS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Selected staff has been changed to disabled successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddProfileImage = (imageFile) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post("/uploads/temporary/media", imageFile, {
      headers: {
        'Content-Type': "multipart/form-data"
      }}).then(({data}) => {
      if (data.success) {
        dispatch({type: UPLOAD_PROFILE_IMAGE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Profile Pic has been uploaded successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

