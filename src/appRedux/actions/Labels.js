import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {ADD_LABELS_DATA, GET_LABELS_DATA} from "../../constants/Labels";


export const onGetLabelData = () => {
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.get('/setup/labels').then(({data}) => {
            console.info("onGetLabels: ", data);
            if (data.success) {
                dispatch({type: FETCH_SUCCESS});
                dispatch({type: GET_LABELS_DATA, payload: data.data.items});
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
        console.log("label hai" , label);
        dispatch({type: FETCH_START});
        axios.post('/setup/labels', label).then(({data}) => {
            console.info("data:", data);
            console.log("horaha success");
            if (data.success) {
                console.log(" sending data", data.data);
                dispatch({type: ADD_LABELS_DATA, payload: data.data});
                dispatch({type: FETCH_SUCCESS});
                console.log("hogya success",);
            } else {
                dispatch({type: FETCH_ERROR, payload: "Network Error"});
            }
        }).catch(function (error) {
            dispatch({type: FETCH_ERROR, payload: error.message});
            console.info("Error****:", error.message);
        });
    }
};



