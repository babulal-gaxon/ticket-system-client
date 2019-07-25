import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {LocaleProvider} from "antd";
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import {setInitUrl} from "appRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "appRedux/actions/Setting";
import axios from 'util/Api';
import {onCheckInitialSetup, onGetUserInfo} from "../../appRedux/actions/Auth";
import CircularProgress from "../../components/CircularProgress/index";
import ForgetPassword from "../PasswordReset/ForgetPassword";
import VerifyPassword from "../PasswordReset/VerifyPassword";
import InitialSetup from "../../routes/InitialSetup";

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


class App extends PureComponent {
  componentWillMount() {
    this.props.onCheckInitialSetup();
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    if (this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.props.token;
      this.props.onGetUserInfo(this.props.history)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps: ", nextProps.token);
    if (this.props.token === null && nextProps.token !== this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
      this.props.onGetUserInfo(this.props.history)
    }
  }


  render() {
    const {match, location, locale, token, initURL, initialSteps, loadingUser} = this.props;
    if (loadingUser) {
      return <div className="gx-loader-view gx-h-100">
        <CircularProgress className=""/>
      </div>
    }
    if (location.pathname === '/') {
      if (token === null) {
        if (Object.keys(initialSteps).length > 0) {
          return (<Redirect to={'/initial-setup'}/>);
        } else {
          return (<Redirect to={'/signin'}/>);
        }
      } else if (initURL === '' || initURL === '/' || initURL === '/initial-setup' || initURL === '/signin') {
        return (<Redirect to={'/dashboard'}/>);
      } else {
        return (<Redirect to={initURL}/>);
      }
    }
    const currentAppLocale = AppLocale[locale.locale];

    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>

          <Switch>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/initial-setup' component={InitialSetup}/>
            <Route exact path='/reset-password' component={ForgetPassword}/>
            <Route exact path='/reset/password' component={VerifyPassword}/>
            <RestrictedRoute path={`${match.url}`} token={token} initialSteps={initialSteps} component={MainApp}/>
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {locale} = settings;
  const {token, initURL, loadingUser, initialSteps, loadingInitialSteps} = auth;
  return {locale, token, initURL, loadingUser, initialSteps, loadingInitialSteps}
};

export default connect(mapStateToProps, {
  setInitUrl,
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
  onGetUserInfo,
  onCheckInitialSetup
})(App);
