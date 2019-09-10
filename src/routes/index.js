import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={lazy(() => import('./Dashboard'))}/>
      <Route path={`${match.url}manage-tickets`} component={lazy(() => import('./ManageTickets'))}/>
      <Route path={`${match.url}staff`} component={lazy(() => import('./Staff'))}/>
      <Route path={`${match.url}roles-permissions`} component={lazy(() => import('./RolesAndPermissions'))}/>
      <Route path={`${match.url}customers`} component={lazy(() => import('./Customers'))}/>
      <Route path={`${match.url}setup`} component={lazy(() => import('./SetUp'))}/>
      <Route path={`${match.url}settings`} component={lazy(() => import('./Settings'))}/>
      <Route path={`${match.url}profile`} component={lazy(() => import('./Profile'))}/>
    </Switch>
  </div>
);

export default App;
