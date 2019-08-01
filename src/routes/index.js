import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "../util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./Dashboard'))}/>
      <Route path={`${match.url}manage-tickets`} component={asyncComponent(() => import('./ManageTickets'))}/>
      <Route path={`${match.url}staff`} component={asyncComponent(() => import('./Staff'))}/>
      <Route path={`${match.url}roles-permissions`} component={asyncComponent(() => import('./RolesAndPermissions'))}/>
      <Route path={`${match.url}customers`} component={asyncComponent(() => import('./Customers'))}/>
      <Route path={`${match.url}setup`} component={asyncComponent(() => import('./SetUp'))}/>
      <Route path={`${match.url}settings`} component={asyncComponent(() => import('./Settings'))}/>
      <Route path={`${match.url}profile`} component={asyncComponent(() => import('./Profile'))}/>
    </Switch>
  </div>
);

export default App;
