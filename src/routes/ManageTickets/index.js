import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../../util/asyncComponent";

const ManageTickets = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/all-tickets`}/>
    <Route path={`${match.url}/all-tickets`} component={asyncComponent(() => import('./AllTickets/index'))}/>
    <Route path={`${match.url}/add-new-ticket`} component={asyncComponent(() => import('./AddNewTicket/index'))}/>
    <Route path={`${match.url}/ticket-detail`} component={asyncComponent(() => import('./AllTickets/TicketDetail'))}/>
  </Switch>
);

export default ManageTickets;
