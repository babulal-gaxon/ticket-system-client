import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const Settings = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/settings`}/>
    <Route path={`${match.url}/general-settings`} component={asyncComponent(() => import('./GeneralSettings/index'))}/>
    <Route path={`${match.url}/localization`} component={asyncComponent(() => import('./Localization/index'))}/>
    <Route path={`${match.url}/email`} component={asyncComponent(() => import('./Email/index'))}/>
    <Route path={`${match.url}/customer-panel`} component={asyncComponent(() => import('./CustomerPanel/index'))}/>
    <Route path={`${match.url}/ticket-settings`} component={asyncComponent(() => import('./TicketSettings/index'))}/>
  </Switch>
);

export default Settings