import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, UPDATING_CONTENT} from "../../constants/ActionTypes";
import {
  ADD_STAFF_NOTE,
  ADD_SUPPORT_STAFF,
  BULK_DELETE_SUPPORT_STAFF,
  DELETE_STAFF_NOTE,
  EDIT_STAFF_NOTE,
  EDIT_SUPPORT_STAFF,
  GET_STAFF_NOTES,
  GET_STAFF_TICKETS,
  GET_SUPPORT_STAFF,
  NULLIFY_STAFF,
  SELECT_CURRENT_STAFF,
  STAFF_STATUS_CHANGE
} from "../../constants/SupportStaff";
import {showErrorMessage} from "./Auth";

export const onGetStaff = (currentPage, itemsPerPage, filterText, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.get(`/setup/staffs`, {
      params: {
        page: currentPage,
        per_page: itemsPerPage,
        search: filterText
      }
    }).then(({data}) => {
      console.info("onGetStaff: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_SUPPORT_STAFF, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onSetCurrentStaff = (staff) => {
  return {
    type: SELECT_CURRENT_STAFF,
    payload: staff
  }
};


export const onAddSupportStaff = (staffMember, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/staffs', staffMember).then(({data}) => {
      console.log("onAddSupportStaff", data);
      if (data.success) {
        dispatch({type: ADD_SUPPORT_STAFF, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Staff has been added successfully"});
        if (history) {
          history.goBack();
        }
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onBulkDeleteStaff = (staffIds, history) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/staffs/delete', staffIds).then(({data}) => {
      if (data.success) {
        dispatch({type: BULK_DELETE_SUPPORT_STAFF, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        if (history) {
          history.goBack();
        }
        dispatch({type: SHOW_MESSAGE, payload: "The Staff(s) has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
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
        dispatch({type: FETCH_SUCCESS});
        if (history) {
          history.goBack();
        }
        dispatch({type: SHOW_MESSAGE, payload: "The Staff details has been edited successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onChangeStaffStatus = (staffId, status, updatingContent) => {
  return (dispatch) => {
    if (updatingContent) {
      dispatch({type: UPDATING_CONTENT});
    } else {
      dispatch({type: FETCH_START});
    }
    axios.post(`/setup/staffs/status/${status}`, staffId).then(({data}) => {
      if (data.success) {
        dispatch({type: STAFF_STATUS_CHANGE, payload: {id: data.data, status: status}});
        dispatch({type: FETCH_SUCCESS});
        dispatch({
          type: SHOW_MESSAGE,
          payload: `The Status of Staff has been changed to ${status === 0 ? "disabled" : "enabled"} successfully`
        });
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddProfileImage = (imageFile, context) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post("/uploads/temporary/media", imageFile, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        context.updateProfilePic(data.data);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Profile Pic has been uploaded successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetStaffNotes = (staffId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/staffs/${staffId}/notes`).then(({data}) => {
      console.info("onGetStaffNotes: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_STAFF_NOTES, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddStaffNote = (staffId, Note) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post(`/setup/staffs/${staffId}/notes`, Note).then(({data}) => {
      console.log(" sending data of staff", data.data);
      if (data.success) {
        dispatch({type: ADD_STAFF_NOTE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Notes has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditStaffNotes = (note) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/staffs/notes/${note.id}`, note).then(({data}) => {
      if (data.success) {
        dispatch({type: EDIT_STAFF_NOTE, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Note has been edited successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteStaffNotes = (noteId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.delete(`/setup/staffs/notes/${noteId}`).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_STAFF_NOTE, payload: noteId});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Note has been Deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetStaffTickets = (staffId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/staffs/${staffId}/tickets`).then(({data}) => {
      console.info("onGetStaffTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_STAFF_TICKETS, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetStaffDetail = (staffId) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/staffs/${staffId}`).then(({data}) => {
      console.info("onGetStaffDetail: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SELECT_CURRENT_STAFF, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch(showErrorMessage(error));
      console.info("Error****:", error.message);
    });
  }
};

export const onNullifyCurrentStaff = () => {
  return {
    type: NULLIFY_STAFF
  }
};
