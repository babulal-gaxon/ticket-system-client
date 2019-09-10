import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu, Progress} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {withRouter} from "react-router";
import moment from "moment";
import {getFormattedDate} from "../../util/Utills";

const SubMenu = Menu.SubMenu;


class SidebarContent extends Component {

  state = {
    key: ""
  };

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  menuClickHandle = (item) => {
    console.log("key", item.key);
    this.setState({key: item.key})
  };

  getCurrentTimeStamp() {
    const date = moment().format('YYYY-MM-DD h:mm:ss');
     return getFormattedDate(date)
  };

  render() {
    console.log("dater", this.getCurrentTimeStamp())
    const {themeType, history, todayTickets} = this.props;
    const {pathname} = history.location;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[0];
    return (
      <div className="gx-main-layout-content">
        <SidebarLogo/>
        <CustomScrollbars className="gx-layout-sider-scrollbar">

          <div className="gx-sidebar-content">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              <Menu.Item key="dashboard">
                <Link to="/dashboard"><i className="icon icon-dashboard"/>
                  <IntlMessages id="sidebar.dashboard"/></Link>
              </Menu.Item>


              <Menu.Item key="manage-tickets/all-tickets">
                <Link to="/manage-tickets/all-tickets"><i className="icon icon-widgets"/>
                  <IntlMessages id="sidebar.dashboard.manage.tickets"/></Link>
              </Menu.Item>

              <SubMenu key="customers"
                       title={<span><i className="icon icon-customer"/>
                       <IntlMessages id="sidebar.dashboard.customers"/></span>}>

                <Menu.Item key="customers/all-customers">
                  <Link to="/customers/all-customers"><i className="icon icon-tag"/>
                    <IntlMessages id="sidebar.dashboard.all.customers"/></Link>
                </Menu.Item>

                <Menu.Item key="customers/companies">
                  <Link to="/customers/companies"><i className="icon icon-company"/>
                    <IntlMessages id="sidebar.dashboard.companies"/></Link>
                </Menu.Item>

                <Menu.Item key="customers/labels">
                  <Link to="/customers/labels"><i className="icon icon-tag"/>
                    <IntlMessages id="sidebar.dashboard.customers.label"/></Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="staff/all-members">
                <Link to="/staff/all-members"><i className="icon icon-customers"/>
                  <IntlMessages id="sidebar.dashboard.staff"/></Link>
              </Menu.Item>

              <Menu.Item key="roles-permissions/all">
                <Link to="/roles-permissions/all"><i className="icon icon-lock-screen"/>
                  <IntlMessages id="sidebar.dashboard.roles.and.permissions"/></Link>
              </Menu.Item>

              <SubMenu key="settings"
                       title={<span><i className="icon icon-setting"/>
                       <IntlMessages id="sidebar.dashboard.settings"/></span>}>

                <Menu.Item key="settings/general-settings">
                  <Link to="/settings/general-settings"><i className="icon icon-extra-components"/>
                    <IntlMessages id="sidebar.dashboard.general.setting"/></Link>
                </Menu.Item>

                <Menu.Item key="settings/localization">
                  <Link to="/settings/localization"><i className="icon icon-map-directions"/>
                    <IntlMessages id="sidebar.dashboard.localization"/></Link>
                </Menu.Item>

                <Menu.Item key="settings/customer-panel">
                  <Link to="/settings/customer-panel"><i className="icon icon-customer-panel"/>
                    <IntlMessages id="sidebar.dashboard.customer.panel"/></Link>
                </Menu.Item>

                <Menu.Item key="settings/ticket-settings">
                  <Link to="/settings/ticket-settings"><i className="icon icon-customizer"/>
                    <IntlMessages id="sidebar.dashboard.ticket.settings"/></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key="setup"
                       title={<span><i className="icon icon-setup-outline"/>
                       <IntlMessages id="sidebar.dashboard.setup"/></span>}>

                <Menu.Item key="setup/departments">
                  <Link to="/setup/departments"><i className="icon icon-company"/>
                    <IntlMessages id="sidebar.dashboard.departments"/></Link>
                </Menu.Item>

                <Menu.Item key="setup/canned-responses">
                  <Link to="/setup/canned-responses"><i className="icon icon-chat-bubble"/>
                    <IntlMessages id="sidebar.dashboard.canned.responses"/></Link>
                </Menu.Item>

                <Menu.Item key="setup/ticket-priorities">
                  <Link to="/setup/ticket-priorities"><i className="icon icon-attendance"/>
                    <IntlMessages id="sidebar.dashboard.ticket.priorities"/></Link>
                </Menu.Item>

                <Menu.Item key="setup/ticket-statuses">
                  <Link to="/setup/ticket-statuses"><i className="icon icon-assignment"/>
                    <IntlMessages id="sidebar.dashboard.ticket.statuses"/></Link>
                </Menu.Item>

                <Menu.Item key="setup/services">
                  <Link to="/setup/services"><i className="icon icon-message"/>
                    <IntlMessages id="sidebar.dashboard.services"/></Link>
                </Menu.Item>

                <Menu.Item key="setup/products">
                  <Link to="/setup/products"><i className="icon icon-product-list"/>
                    <IntlMessages id="sidebar.dashboard.products"/></Link>
                </Menu.Item>
              </SubMenu>

            </Menu>
            {todayTickets && todayTickets.length > 0 ?
              <div>
                <div className="gx-d-flex gx-justify-content-between gx-px-3 gx-mt-5">
                  <div className="gx-widget-heading gx-text-white"><IntlMessages id="common.today"/></div>
                  <div>{this.getCurrentTimeStamp()}</div>
                </div>

                <div className="gx-my-3 gx-px-3">
                  {todayTickets.map(ticket => {
                    let percent = 0;
                    if (ticket.tickets_count !== 0) {
                      percent = (ticket.resolved_tickets_count / ticket.tickets_count) * 100;
                    }
                    return <div className="gx-mb-2" key={ticket.name}>
                      <i className="icon icon-circle gx-fs-sm" style={{color: ticket.color_code, fontSize: 10}}/>
                      <span className="gx-ml-2 gx-text-white">{ticket.name}</span>
                      <Progress percent={percent} size="small" showInfo={false} strokeWidth={3}
                                strokeColor={ticket.color_code}/>
                      <div className="gx-d-flex gx-justify-content-between">
                        <div>{ticket.tickets_count} tickets</div>
                        <div>{ticket.resolved_tickets_count} Closed</div>
                      </div>
                    </div>
                  })}
                </div>
              </div> : null}
          </div>
        </CustomScrollbars>
      </div>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings, dashboard}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  const {todayTickets} = dashboard;
  return {navStyle, themeType, locale, pathname, todayTickets}
};
export default withRouter(connect(mapStateToProps)(SidebarContent));

