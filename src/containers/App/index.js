import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {LocaleProvider} from "antd";
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import {setInitUrl} from "appRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "appRedux/actions/Setting";
import axios from 'util/Api';
import CircularProgress from "../../components/CircularProgress/index";

const RestrictedRoute = ({component: Component, token, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      token
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />}
  />;


class App extends Component {

  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    console.log("this.props.token", this.props.token);
    if (this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.props.token;
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps: ", nextProps.token);
    if (nextProps.token !== this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
    }
  }

  render() {
    const {match, location, locale, token, initURL, loadingUser} = this.props;

    if (location.pathname === '/') {
      if (token === null) {
        return (<Redirect to={'/signin'}/>);
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return (<Redirect to={'/dashboard'}/>);
      } else {
        return (<Redirect to={initURL}/>);
      }
    }

    if (loadingUser) {
      return <div className="gx-loader-view gx-h-100">
        <CircularProgress className=""/>
      </div>
    }
    const currentAppLocale = AppLocale[locale.locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>

          <Switch>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/signup' component={SignUp}/>
            <RestrictedRoute path={`${match.url}`} token={token} component={MainApp}/>
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {locale} = settings;
  const {token, initURL, loadingUser} = auth;
  return {locale, token, initURL, loadingUser}
};

export default connect(mapStateToProps, {
  setInitUrl,
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
})(App);
