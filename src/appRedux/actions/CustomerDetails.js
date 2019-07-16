import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import axios from 'util/Api'
import {GET_FORM_OPTIONS, GET_RAISED_TICKETS} from "../../constants/CustomerDetails";

export const onGetRaisedTickets = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customer/panel/tickets`).then(({data}) => {
      console.info("onGetRaisedTickets: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_RAISED_TICKETS, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};

export const onGetFormOptions = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get(`/customer/panel/tickets/support/form/options`).then(({data}) => {
      console.info("onGetFormOptions: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GET_FORM_OPTIONS, payload: data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};