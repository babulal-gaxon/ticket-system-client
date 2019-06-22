import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../../util/asyncComponent";

const Customers = ({match}) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/all-customers`}/>
        <Route path={`${match.url}/all-customers`} component={asyncComponent(() => import('./AllCustomers/index'))}/>
        <Route path={`${match.url}/add-customers`} component={asyncComponent(() => import('./AllCustomers/AddNewCustomers'))}/>
        <Route path={`${match.url}/companies`} component={asyncComponent(() => import('./Companies/index'))}/>
    </Switch>
);

export default Customers;
