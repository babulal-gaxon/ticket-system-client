import {ADD_LABELS_DATA, GET_LABELS_DATA} from "../../constants/Labels";

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

        case ADD_LABELS_DATA : return {
            ...state,
            labelList: state.labelList.concat(action.payload)
        };

        default:
            return state;
    }
}