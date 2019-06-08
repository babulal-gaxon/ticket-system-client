import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {RECENT_CUSTOMERS} from "../../constants/RecentCustomers";


export const onGetCustomers = () => {

  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/companies'
    ).then(({data}) => {
      console.info("onRecentCustomers: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: RECENT_CUSTOMERS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};