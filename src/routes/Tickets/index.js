import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../../util/asyncComponent";

const CustomerPage = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/`}/>
    <Route path={`${match.url}/`} component={asyncComponent(() => import('./TicketList'))}/>
    <Route path={`${match.url}/ticket/:id`} component={asyncComponent(() => import('./TicketDetail'))}/>
  </Switch>
);

export default CustomerPage;
