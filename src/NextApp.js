import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import "assets/vendors/style";
import "styles/wieldy.less";
import configureStore from "./appRedux/store";
import App from "./containers/App/index";


export const store = configureStore();

const NextApp = () =>
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </BrowserRouter>
  </Provider>;


export default NextApp;
