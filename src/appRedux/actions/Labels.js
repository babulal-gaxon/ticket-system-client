import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import {
  ADD_LABELS_DATA,
  DELETE_LABEL,
  EDIT_LABEL_DATA,
  GET_LABELS_DATA,
  STATUS_TO_ACTIVE,
  STATUS_TO_DISABLED
} from "../../constants/Labels";


export const onGetLabelData = (currentPage, itemsPerPage, searchData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/labels', {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: searchData
      }
    }).then(({data}) => {
      console.info("onGetLabels: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_LABELS_DATA, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      //dispatch(showErrorMessage(error));
      console.info("Error****:", error.message);
    });
  }
};


export const onAddLabelsData = (label) => {
  console.log("onAddLabelsData", label);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/labels', label).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_LABELS_DATA, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The New Label has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteLabel = (labelId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/setup/labels/delete`, labelId).then(({data}) => {
      console.info("data", data);
      if (data.success) {
        dispatch({type: DELETE_LABEL, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Selected Label has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onChangeToActiveStatus = (labelId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/setup/labels/status/1`, labelId).then(({data}) => {
      if (data.success) {
        dispatch({type: STATUS_TO_ACTIVE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Label(s) has been changed to Active successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onChangeToDisableStatus = (labelId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/setup/labels/status/0`, labelId).then(({data}) => {
      if (data.success) {
        dispatch({type: STATUS_TO_DISABLED, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Status of Label(s) has been changed to Disabled successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditLabelsData = (label) => {
  console.log("Edit label", label);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/labels/${label.id}`, label).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_LABEL_DATA, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Label details has been edited successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};




