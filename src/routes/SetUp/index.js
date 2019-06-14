import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "../../util/asyncComponent";

const SetUp = ({match}) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/setup/customers-label`}/>
        <Route path={`${match.url}/customers-label`} component={asyncComponent(() => import('./CustomersLabel/index'))}/>
        <Route path={`${match.url}/about-company`} component={asyncComponent(() => import('./AboutCompany/index'))}/>
    </Switch>
);

export default SetUp;
