import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {GET_DASHBOARD_DATA} from "../../constants/Dashboard";

export const onGetDashboardData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/analytics/dashboard`).then(({data}) => {
      console.info("onGetDashboardData: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_DASHBOARD_DATA, payload: data.data});
      } else if (data.message) {
        dispatch({type: FETCH_ERROR, payload: data.message});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.errors[0]});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};