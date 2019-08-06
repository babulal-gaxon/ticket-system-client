import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../../util/asyncComponent";

const CustomerPage = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/all-tickets`}/>
    <Route path={`${match.url}/`} component={asyncComponent(() => import('./AllTickets/index'))}/>
    <Route path={`${match.url}/ticket-detail`} component={asyncComponent(() => import('./AllTickets/TicketDetails'))}/>
  </Switch>
);

export default CustomerPage;
