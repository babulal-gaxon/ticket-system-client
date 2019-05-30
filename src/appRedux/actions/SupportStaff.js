import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {SUPPORT_STAFF} from "../../constants/SupportStaff";


export const onSupportStaff = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.get('/setup/staffs'
    ).then(({data}) => {
      console.info("onSupportStaff: ", data);
      if (data.success) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SUPPORT_STAFF, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.info("Error****:", error.message);
    });
  }
};