import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {
  ADD_SUPPORT_STAFF,
  DELETE_SUPPORT_STAFF,
  EDIT_SUPPORT_STAFF, GET_STAFF_ID,
  GET_SUPPORT_STAFF
} from "../../constants/SupportStaff";


export const onGetStaff = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/staffs'
    ).then(({data}) => {
      console.info("onGetStaff: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_SUPPORT_STAFF, payload: data.data.items});
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


export const onAddSupportStaff = (staffMember) => {
  console.log("onAddSupportStaff", staffMember)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/staffs', staffMember).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data)
        dispatch({type: ADD_SUPPORT_STAFF, payload: data.data});
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

export const onDeleteSupportStaff = (staffId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/staffs/${staffId}`).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        dispatch({type: DELETE_SUPPORT_STAFF, payload: staffId});
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

export const onEditSupportStaff = (staffMember) => {
  return(dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/staffs/${staffMember.id}`, staffMember).then(({data}) => {
      console.log("in edit staff", data)
      if(data.success) {
        dispatch({type: EDIT_SUPPORT_STAFF, payload: data.data});
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

