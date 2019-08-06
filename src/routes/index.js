import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "../util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}tickets`} component={asyncComponent(() => import('./Tickets'))}/>
      <Route path={`${match.url}profile`} component={asyncComponent(() => import('./Profile'))}/>
    </Switch>
  </div>
);

export default App;
