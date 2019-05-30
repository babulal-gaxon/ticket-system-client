import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import TicketList from "./TicketList";
import RecentCustomers from "./RecentCustomers";
import SupportStaff from "./SupportStaff";
import Departments from "./Departments";
import CannedResponses from "./CannedResponses";
import TicketPriorities from "./TicketPriorities";
import TicketStatuses from "./TicketStatuses";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  ticketList: TicketList,
  recentCustomers: RecentCustomers,
  supportStaff:SupportStaff,
  departments: Departments,
  cannedResponses: CannedResponses,
  ticketPriorities: TicketPriorities,
  ticketStatuses: TicketStatuses

});

export default reducers;
