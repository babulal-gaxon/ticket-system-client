import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../../util/asyncComponent";

const Staff = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/roles-permissions`}/>
    <Route path={`${match.url}/all`} component={asyncComponent(() => import('./RolesList/index'))}/>
    <Route path={`${match.url}/add-new`} component={asyncComponent(() => import('./AddNewRole/index'))}/>
  </Switch>
);

export default Staff;
