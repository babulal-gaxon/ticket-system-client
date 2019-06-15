import {ADD_LABELS_DATA, DELETE_LABEL, EDIT_LABEL_DATA, GET_LABELS_DATA} from "../../constants/Labels";

const initialState = {
    labelList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LABELS_DATA :
            return {
                ...state,
                labelList: action.payload
            };

        case ADD_LABELS_DATA :
            return {
                ...state,
                labelList: state.labelList.concat(action.payload)
            };

        case DELETE_LABEL :
            const updatedLabelList = state.labelList.filter((labelList) => (labelList.id !== action.payload));
            return {
                ...state,
                labelList:updatedLabelList
            };

        case EDIT_LABEL_DATA :
            const updateLabelList = state.labelList.map((labelList) => labelList.id === action.payload.id ? action.payload : labelList);
            return {
                ...state,
                labelList:updateLabelList
            }
        default:
            return state;
    }
}