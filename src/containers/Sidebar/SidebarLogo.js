import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {onNavStyleChange, toggleCollapsedSideNav} from "appRedux/actions/Setting";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import {getCompanyLogo} from "../../util/Utills";


class SidebarLogo extends Component {

  render() {
    const {width, themeType, navCollapsed} = this.props;
    let {navStyle} = this.props;
    if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
      navStyle = NAV_STYLE_DRAWER;
    }
    console.log("navStyle", navStyle);
    return (
      <div className="gx-layout-sider-header">

        {(navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) ? <div className="gx-linebar">

          <i
            className={`gx-icon-btn icon icon-${navStyle === NAV_STYLE_MINI_SIDEBAR ? 'menu-unfold' : 'menu-fold'} ${themeType !== THEME_TYPE_LITE ? 'gx-text-white' : ''}`}
            onClick={() => {
              if (navStyle === NAV_STYLE_DRAWER) {
                this.props.toggleCollapsedSideNav(!navCollapsed);
              } else if (navStyle === NAV_STYLE_FIXED) {
                this.props.onNavStyleChange(NAV_STYLE_MINI_SIDEBAR)
              } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
                this.props.toggleCollapsedSideNav(!navCollapsed);
              } else {
                this.props.onNavStyleChange(NAV_STYLE_FIXED)
              }
            }}
          />
        </div> : null}

        <Link to="/" className="gx-site-logo">
          {getCompanyLogo() ? <img alt="" style={{height: 26, width: 100}} src={getCompanyLogo()}/> :
            <img alt="" src={require("assets/images/logo.svg")}/>}
        </Link>

      </div>
    );
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {navStyle, themeType, width, navCollapsed} = auth;
  const {userSettings} = settings;
  return {navStyle, themeType, width, navCollapsed, userSettings}
};

export default connect(mapStateToProps, {
  onNavStyleChange,
  toggleCollapsedSideNav
})(SidebarLogo);
