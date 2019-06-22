import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {
  ADD_NEW_COMPANY,
  DELETE_COMPANIES,
  EDIT_COMPANY_DETAILS,
  EDIT_COMPANY_LOGO,
  GET_COMPANY_DATA
} from "../../constants/Companies";

export const onGetCompaniesData = (currentPage, itemsPerPage) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/customer/companies?page=${currentPage}&per_page=${itemsPerPage}`
    ).then(({data}) => {
      console.info("onGetCompaniesData: ", data);
      if (data.success) {
        console.log("data of companies", data.data.items);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_COMPANY_DATA, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddNewCompany = (company, successMessage) => {
  console.log("onAddNewCompany", company);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/customer/companies', company, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_NEW_COMPANY, payload: data.data});
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

export const onEditCompany = (company, successMessage) => {
  console.log("onEditCompany", company);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/customer/companies/${company.id}`, company).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_COMPANY_DETAILS, payload: data.data});
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

export const onDeleteCompanies = (companyIds, successMessage, reload, currentPage, itemsPerPage) => {
  console.log("in action", companyIds);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/customer/companies/delete', companyIds).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_COMPANIES, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        reload(currentPage, itemsPerPage);
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

export const onAddProfileImage = (imageFile) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post("/uploads/temporary/media", imageFile, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        dispatch({type: EDIT_COMPANY_LOGO, payload: data.data});
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