import {GET_CUSTOMERS_DATA} from "../../constants/Customers";

const initialState = {
    customersList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMERS_DATA :
            return {
                ...state,
                customersList: action.payload,
            };

        // case ADD_LABELS_DATA :
        //     return {
        //         ...state,
        //         labelList: state.labelList.concat(action.payload)
        //     };
        //
        // case DELETE_LABEL :
        //     const updatedLabelList = state.labelList.filter((labelList) => (labelList.id !== action.payload));
        //     return {
        //         ...state,
        //         labelList:updatedLabelList
        //     };
        //
        // case EDIT_LABEL_DATA :
        //     const updateLabelList = state.labelList.map((labelList) => labelList.id === action.payload.id ? action.payload : labelList);
        //     return {
        //         ...state,
        //         labelList:updateLabelList
        //     }
        default:
            return state;
    }
}