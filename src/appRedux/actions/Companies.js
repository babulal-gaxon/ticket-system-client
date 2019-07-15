import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {ADD_NEW_COMPANY, DELETE_COMPANIES, EDIT_COMPANY_DETAILS, GET_COMPANY_DATA} from "../../constants/Companies";

export const onGetCompaniesData = (currentPage, itemsPerPage, filterData) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/setup/customer/companies`, {
        params: {
          page: currentPage,
          per_page: itemsPerPage,
          search: filterData
        }
      }
    ).then(({data}) => {
      console.info("onGetCompaniesData: ", data);
      if (data.success) {
        console.log("data of companies", data.data.items);
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_COMPANY_DATA, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onAddNewCompany = (company) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/customer/companies', company
    ).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: ADD_NEW_COMPANY, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Company has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onEditCompany = (company) => {
  console.log("onEditCompany", company);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.put(`/setup/customer/companies/${company.id}`, company).then(({data}) => {
      console.info("data:", data);
      if (data.success) {
        console.log(" sending data", data.data);
        dispatch({type: EDIT_COMPANY_DETAILS, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Company details has been added successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onDeleteCompanies = (companyIds) => {
  console.log("in action", companyIds);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('/setup/customer/companies/delete', companyIds).then(({data}) => {
      if (data.success) {
        dispatch({type: DELETE_COMPANIES, payload: data.data});
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SHOW_MESSAGE, payload: "The Company has been deleted successfully"});
      } else {
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};


