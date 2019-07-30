import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "../../util/asyncComponent";

const Customers = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/all-customers`}/>
    <Route path={`${match.url}/all-customers`} component={asyncComponent(() => import('./AllCustomers/index'))}/>
    <Route path={`${match.url}/add-customers`}
           component={asyncComponent(() => import('./AllCustomers/AddNewCustomers'))}/>
    <Route path={`${match.url}/customer-detail`}
           component={asyncComponent(() => import('./AllCustomers/CustomerDetails/CustomerDetails'))}/>
    <Route path={`${match.url}/companies`} component={asyncComponent(() => import('./Companies/index'))}/>
    <Route path={`${match.url}/labels`} component={asyncComponent(() => import('./CustomersLabel/index'))}/>
  </Switch>
);

export default Customers;
