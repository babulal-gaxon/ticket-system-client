import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const SetUp = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/setup`}/>
    <Route path={`${match.url}/departments`} component={asyncComponent(() => import('./Departments/index'))}/>
    <Route path={`${match.url}/canned-responses`} component={asyncComponent(() => import('./CannedResponses/index'))}/>
    <Route path={`${match.url}/ticket-priorities`}
           component={asyncComponent(() => import('./TicketPriorities/index'))}/>
    <Route path={`${match.url}/ticket-statuses`} component={asyncComponent(() => import('./TicketStatuses/index'))}/>
    <Route path={`${match.url}/services`} component={asyncComponent(() => import('./Services/index'))}/>
    <Route path={`${match.url}/products`} component={asyncComponent(() => import('./Products/index'))}/>
  </Switch>
);

export default SetUp;
