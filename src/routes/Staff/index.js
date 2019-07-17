import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../../util/asyncComponent";

const Staff = ({match}) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/staff/all-members`}/>
        <Route path={`${match.url}/all-members`} component={asyncComponent(() => import('./StaffList/index'))}/>
        <Route path={`${match.url}/add-new-member`} component={asyncComponent(() => import('./AddNewStaff/index'))}/>
      <Route path={`${match.url}/member-detail`} component={asyncComponent(() => import('./StaffList/StaffDetail/index'))}/>
    </Switch>
);

export default Staff;
