import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {ADD_NEW_CUSTOMER, EDIT_CUSTOMER_DETAILS, GET_CUSTOMERS_DATA} from "../../constants/Customers";




export const onGetCustomersData = () => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('/companies').then(({data}) => {
            console.info("onGetCustomersData: ", data);
            if (data.success) {
                console.log("data of companies",data.data.items);
                dispatch({type: FETCH_SUCCESS});
                dispatch({type: GET_CUSTOMERS_DATA , payload: data.data.items});
            } else {
                dispatch({type: FETCH_ERROR, payload: data.error});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.info("Error****:", error.message);
        });
    }
};

export const onAddNewCustomer = (customer, successMessage) => {
    console.log("onAddCustomer", customer);
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.post('/companies', customer).then(({data}) => {
            console.info("data:", data);
            if (data.success) {
                console.log(" sending data", data.data);
                dispatch({type: ADD_NEW_CUSTOMER, payload: data.data});
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

export const onEditCustomer = (customer, successMessage) => {
    console.log("onEditCustomer", customer);
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.put(`/companies/${customer.id}`, customer).then(({data}) => {
            console.info("data:", data);
            if (data.success) {
                console.log(" sending data", data.data);
                dispatch({type: EDIT_CUSTOMER_DETAILS, payload: data.data});
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
