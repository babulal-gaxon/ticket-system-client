import axios from 'util/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../../constants/ActionTypes";
import {ADD_LABELS_DATA, DELETE_LABEL, EDIT_LABEL_DATA, GET_LABELS_DATA} from "../../constants/Labels";


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
        dispatch({type: FETCH_START});
        axios.post('/setup/labels', label).then(({data}) => {
            console.info("data:", data);
            if (data.success) {
                console.log(" sending data", data.data);
                dispatch({type: ADD_LABELS_DATA, payload: data.data});
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

export const onDeleteLabel =(labelId) =>{
    console.log("onDeleteLabel", labelId);
    return (dispatch) =>{
        dispatch({type: FETCH_START});
        axios.delete(`/setup/labels/${labelId}`).then(({data})=>{
            console.info("data", data);
            if(data.success){
                dispatch({type: DELETE_LABEL, payload: labelId});
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

export const onEditLabelsData =(label)=>{
    console.log("Edit label", label);
    return (dispatch) => {
        dispatch({type: FETCH_START});
        axios.put(`/setup/labels/${label.id}`, label).then(({data}) => {
            console.info("data:", data);
            if (data.success) {
                console.log(" sending data", data.data);
                dispatch({type: EDIT_LABEL_DATA, payload: data.data});
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




