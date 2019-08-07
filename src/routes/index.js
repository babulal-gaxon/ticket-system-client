import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "../util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}tickets`} component={asyncComponent(() => import('./Tickets/TicketList'))}/>
      <Route path={`${match.url}ticket/:id`} component={asyncComponent(() => import('./Tickets/TicketDetail'))}/>
      <Route path={`${match.url}profile`} component={asyncComponent(() => import('./Profile'))}/>
    </Switch>
  </div>
);

export default App;
