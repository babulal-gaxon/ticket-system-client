import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import TicketList from "./TicketList";
import SupportStaff from "./SupportStaff";
import Departments from "./Departments";
import CannedResponses from "./CannedResponses";
import TicketPriorities from "./TicketPriorities";
import TicketStatuses from "./TicketStatuses";
import RolesAndPermissions from "./RolesAndPermissions";
import Labels from "./Labels";
import Customers from "./Customers";
import Companies from "./Companies";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  commonData: Common,
  ticketList: TicketList,
  supportStaff: SupportStaff,
  departments: Departments,
  cannedResponses: CannedResponses,
  ticketPriorities: TicketPriorities,
  ticketStatuses: TicketStatuses,
  rolesAndPermissions: RolesAndPermissions,
  labelsList: Labels,
  customers: Customers,
  companies: Companies
});

export default reducers;
