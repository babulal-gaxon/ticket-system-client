import React, {Component} from "react";
import {Layout} from 'antd';
import {connect} from "react-redux";
import UserInfo from "components/UserInfo";
import HorizontalNav from "../HorizontalNav";
import {Link} from "react-router-dom";
import {switchLanguage, toggleCollapsedSideNav} from "../../../appRedux/actions/Setting";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {Header} = Layout;

class InsideHeader extends Component {

  state = {
    searchText: '',
  };


  render() {
    const {navCollapsed, currentTicket} = this.props;
    const {messages} = this.props.intl;

    return (
      <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">

        <Header
          className="gx-header-horizontal-main">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex">
              <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
                <i className="gx-icon-btn icon icon-menu"
                   onClick={() => {
                     this.props.toggleCollapsedSideNav(!navCollapsed);
                   }}
                />
              </div>
              <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
                <img alt="" src={require("assets/images/w-logo.png")}/></Link>
              <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                <img alt="" src={require("assets/images/logo.png")}/></Link>

              <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
                <HorizontalNav/>
              </div>
              <ul className="gx-header-notifications gx-ml-auto">

                <li className="gx-notify">
                  <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
                </li>

                <li className="gx-user-nav"><UserInfo/></li>
              </ul>
            </div>
          </div>
        </Header>


        <div className="gx-p-5 gx-ml-5 gx-mt-3">
          <h1 className="gx-text-white">{currentTicket ? currentTicket.title : <IntlMessages id="header.supportRequest"/>}</h1>
          <p
            className="gx-text-white">{currentTicket ? messages["header.ticketIdMessage"] + currentTicket.id : <IntlMessages id="header.ticketMessage"/>}</p>


        </div>
      </div>
    );
  }
}

const mapStateToProps = ({settings, ticketsData}) => {
  const {locale, navCollapsed} = settings;
  const {currentTicket} = ticketsData;
  return {locale, navCollapsed, currentTicket}
};
export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(injectIntl(InsideHeader));
