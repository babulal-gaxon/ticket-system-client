import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import TicketListing from "./TicketListing";
import RecentCustomers from "./RecentCustomers";
import SupportStaff from "./SupportStaff";
import Departments from "./Departments";
import CannedResponses from "./CannedResponses";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  ticketListing: TicketListing,
  recentCustomers: RecentCustomers,
  supportStaff:SupportStaff,
  departments: Departments,
  cannedResponses: CannedResponses

});

export default reducers;
