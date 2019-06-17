import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {GET_CUSTOMERS_DATA} from "../../constants/Customers";




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
            //dispatch(showErrorMessage(error));
            console.info("Error****:", error.message);
        });
    }
};
