import {
  ADD_LABELS_DATA,
  DELETE_LABEL,
  EDIT_LABEL_DATA,
  GET_LABELS_DATA,
  STATUS_TO_ACTIVE,
  STATUS_TO_DISABLED
} from "../../constants/Labels";

const initialState = {
  labelList: [],
  totalItems: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LABELS_DATA :
      return {
        ...state,
        labelList: action.payload.data,
        totalItems: action.payload.meta.total
      };

    case ADD_LABELS_DATA :
      return {
        ...state,
        labelList: [action.payload, ...state.labelList],
        totalItems: state.totalItems + 1
      };

    case DELETE_LABEL :
      const updatedLabels = state.labelList.filter(label => {
        return (action.payload.indexOf(label.id) === -1) ?
          label : null
      });
      return {
        ...state,
        labelList: updatedLabels,
        totalItems: state.totalItems - action.payload.length
      };

    case EDIT_LABEL_DATA :
      const updateLabelList = state.labelList.map((labelList) => labelList.id === action.payload.id ? action.payload : labelList);
      return {
        ...state,
        labelList: updateLabelList
      };

    case STATUS_TO_ACTIVE:
      const activateLabels = state.labelList.map(label => {
        if (action.payload.indexOf(label.id) !== -1) {
          label.status = 1;
          return label;
        }
        return label;
      });
      return {
        ...state,
        labelList: activateLabels
      };

    case STATUS_TO_DISABLED:
      const deActivateLabels = state.labelList.map(label => {
        if (action.payload.indexOf(label.id) !== -1) {
          label.status = 0;
          return label;
        }
        return label;
      });
      return {
        ...state,
        labelList: deActivateLabels
      };
    default:
      return state;
  }
}
