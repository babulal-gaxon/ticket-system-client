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
import {onGetUserPermission} from "../../appRedux/actions/Auth";
import CircularProgress from "../../components/CircularProgress/index";
import ForgetPassword from "../PasswordReset/ForgetPassword";
import VerifyPassword from "../PasswordReset/VerifyPassword";
import InitialSetup from "../../routes/InitialSetup";
import {onCheckInitialSetup} from "../../appRedux/actions/InitialSetup";
import Permissions from "../../util/Permissions";
import {setUserDefaultSetting, switchLanguage} from "../../appRedux/actions";
import {setCompanyFavIcon, setUserSetting} from "../../util/Utills";

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

  constructor(props) {
    super(props);
    props.onCheckInitialSetup();
    if (localStorage.getItem('settings')) {
      const userSetting = JSON.parse(localStorage.getItem('settings'));
      props.setUserDefaultSetting(userSetting);
      props.switchLanguage(userSetting.settings.locale.default_language);
      Permissions.setPermissions(userSetting.permissions);
      setUserSetting(userSetting.settings);
      setCompanyFavIcon();
    }
  }

  componentWillMount() {
    if (this.props.initURL === '' && !this.props.history.location.pathname.startsWith('/reset/password')) {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    if (this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.props.token;
      this.props.onGetUserPermission(this.props.history)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token === null && nextProps.token !== this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
      this.props.onGetUserPermission(this.props.history)
    }
  }


  render() {

    const {match, location, locale, token, initURL, isSetupRequired, loadingUser, totalPendingSteps} = this.props;
    if (loadingUser) {
      return <div className="gx-loader-view gx-h-100">
        <CircularProgress className=""/>
      </div>
    }
    if (location.pathname === '/' || (token !== null && location.pathname === '/signin')) {
      if (token === null) {
        if (isSetupRequired) {
          return (<Redirect to={'/initial-setup'}/>);
        } else {
          return (<Redirect to={'/signin'}/>);
        }
      } else if (initURL === '' || initURL === '/' || initURL === '/initial-setup' || initURL === '/signin') {
        if (totalPendingSteps === 1) {
          return (<Redirect to={'/settings/general-settings'}/>);
        } else {
          return (<Redirect to={'/dashboard'}/>);
        }
      } else {
        if (totalPendingSteps === 1) {
          return (<Redirect to={'/settings/general-settings'}/>);
        } else {
          return (<Redirect to={initURL}/>);
        }
      }
    }
    const currentAppLocale = AppLocale[locale];

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
            <RestrictedRoute path={`${match.url}`} token={isSetupRequired ? null : token} component={MainApp}/>
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    )
  }
}

const mapStateToProps = ({settings, auth, initialSetup}) => {
  const {locale} = settings;
  const {token, initURL, loadingUser} = auth;
  const {isSetupRequired, totalPendingSteps} = initialSetup;
  return {locale, token, initURL, loadingUser, isSetupRequired, totalPendingSteps}
};

export default connect(mapStateToProps, {
  setInitUrl,
  setThemeType,
  switchLanguage,
  onNavStyleChange,
  onLayoutTypeChange,
  onGetUserPermission,
  setUserDefaultSetting,
  onCheckInitialSetup,

})(App);
