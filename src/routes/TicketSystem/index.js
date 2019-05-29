import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const TicketSystem = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/ticket-system`}/>
    <Route path={`${match.url}/departments`} component={asyncComponent(() => import('./Departments/index'))}/>
    <Route path={`${match.url}/canned-responses`} component={asyncComponent(() => import('./CannedResponses/index'))}/>
    <Route path={`${match.url}/ticket-priorities`} component={asyncComponent(() => import('./TicketPriorities/index'))}/>
    <Route path={`${match.url}/ticket-statuses`} component={asyncComponent(() => import('./TicketStatuses/index'))}/>
    <Route path={`${match.url}/email-templates`} component={asyncComponent(() => import('./EmailTemplates/index'))}/>
    <Route path={`${match.url}/ticket-settings`} component={asyncComponent(() => import('./TicketSettings/index'))}/>

  </Switch>
);

export default TicketSystem;
