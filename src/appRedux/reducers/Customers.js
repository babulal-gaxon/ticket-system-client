import {ADD_NEW_CUSTOMER, GET_CUSTOMERS_DATA} from "../../constants/Customers";

const initialState = {
    customersList: [],
    totalItems: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMERS_DATA :
            return {
                ...state,
                customersList: action.payload,
            };

        case ADD_NEW_CUSTOMER:
            return {
                ...state,
                customersList:[action.payload, ...state.customersList],
                totalItems: state.totalItems + 1
            }


        default:
            return state;
    }
}