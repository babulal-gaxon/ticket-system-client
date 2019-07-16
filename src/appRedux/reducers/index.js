import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import CustomerDetails from "./CustomerDetails";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  customerDetails: CustomerDetails

});

export default reducers;
