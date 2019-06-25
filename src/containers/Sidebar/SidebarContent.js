import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

const SubMenu = Menu.SubMenu;


class SidebarContent extends Component {

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

  render() {
    const {themeType, navStyle, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Auxiliary>
        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              <SubMenu key="dashboard"
                       title={<span> <i className="icon icon-dashboard"/>
                         <IntlMessages id="sidebar.dashboard"/></span>}>

              <Menu.Item key="dashboard">
                <Link to="/dashboard"><i className="icon icon-tickets"/>
                  <IntlMessages id="sidebar.dashboard.tickets"/></Link>
              </Menu.Item>

              </SubMenu>

              <SubMenu key ="ManageTickets"
                       title={<span><i className="icon icon-widgets"/>
                       <IntlMessages id="sidebar.dashboard.manage.tickets"/></span>}>

                <Menu.Item key="allTickets">
                  <Link to ="/manage-tickets/all-tickets"><i className="icon icon-tickets"/>
                    <IntlMessages id="sidebar.dashboard.all.tickets"/></Link>
                </Menu.Item>

                <Menu.Item key="addNewTicket">
                  <Link to ="/manage-tickets/add-new-ticket"><i className="icon icon-ticket-new"/>
                    <IntlMessages id="sidebar.dashboard.add.new.ticket"/></Link>
                </Menu.Item>
              </SubMenu>

                <Menu.Item key="allStaffMembers">
                  <Link to ="/staff/all-members"><i className="icon icon-tickets"/>
                    <IntlMessages id= "sidebar.dashboard.staff"/></Link>
                </Menu.Item>

              <SubMenu key ="Customers"
                       title={<span><i className="icon icon-customer"/>
                       <IntlMessages id="sidebar.dashboard.customers"/></span>}>

                <Menu.Item key="allCustomers">
                  <Link to ="/customers/all-customers"><i className="icon icon-tag"/>
                    <IntlMessages id= "sidebar.dashboard.all.customers"/></Link>
                </Menu.Item>

                <Menu.Item key="companies">
                  <Link to ="/customers/companies"><i className="icon icon-company"/>
                    <IntlMessages id="sidebar.dashboard.companies"/></Link>
                </Menu.Item>
              </SubMenu>

                <SubMenu key ="Setup"
                         title={<span><i className="icon icon-setup-outline"/>
                       <IntlMessages id="sidebar.dashboard.setup"/></span>}>

                    <Menu.Item key="customersLabel">
                        <Link to ="/setup/customers-label"><i className="icon icon-tag"/>
                            <IntlMessages id= "sidebar.dashboard.customers.label"/></Link>
                    </Menu.Item>

                    <Menu.Item key="aboutCompany">
                        <Link to ="/setup/about-company"><i className="icon icon-company"/>
                            <IntlMessages id="sidebar.dashboard.about.company"/></Link>
                    </Menu.Item>
                </SubMenu>

              <SubMenu key ="TicketSystem"
                       title={<span><i className="icon icon-ticket-new"/>
                       <IntlMessages id="sidebar.dashboard.ticket.system"/></span>}>

                <Menu.Item key="Departments">
                  <Link to ="/ticket-system/departments"><i className="icon icon-company"/>
                    <IntlMessages id="sidebar.dashboard.departments"/></Link>
                </Menu.Item>

                <Menu.Item key="CannedResponses">
                  <Link to ="/ticket-system/canned-responses"><i className="icon icon-chat-bubble"/>
                    <IntlMessages id="sidebar.dashboard.canned.responses"/></Link>
                </Menu.Item>

                <Menu.Item key="TicketPriorities">
                  <Link to ="/ticket-system/ticket-priorities"><i className="icon icon-attendance"/>
                    <IntlMessages id="sidebar.dashboard.ticket.priorities"/></Link>
                </Menu.Item>

                <Menu.Item key="TicketStatuses">
                  <Link to ="/ticket-system/ticket-statuses"><i className="icon icon-assignment"/>
                    <IntlMessages id="sidebar.dashboard.ticket.statuses"/></Link>
                </Menu.Item>

                <Menu.Item key="EmailTemplates">
                  <Link to ="/ticket-system/email-templates"><i className="icon icon-email-template"/>
                    <IntlMessages id="sidebar.dashboard.email.templates"/></Link>
                </Menu.Item>

                <Menu.Item key="TicketSettings">
                  <Link to ="/ticket-system/ticket-settings"><i className="icon icon-customizer"/>
                    <IntlMessages id="sidebar.dashboard.ticket.settings"/></Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu key ="settings"
                       title={<span><i className="icon icon-setting"/>
                       <IntlMessages id="sidebar.dashboard.settings"/></span>}>

                <Menu.Item key="generalSettings">
                  <Link to ="/settings/general-settings"><i className="icon icon-extra-components"/>
                    <IntlMessages id="sidebar.dashboard.general.setting"/></Link>
                </Menu.Item>

                <Menu.Item key="localization">
                  <Link to ="/settings/localization"><i className="icon icon-map-directions"/>
                    <IntlMessages id="sidebar.dashboard.localization"/></Link>
                </Menu.Item>

                <Menu.Item key="email">
                  <Link to ="/settings/email"><i className="icon icon-mail-open"/>
                    <IntlMessages id="sidebar.dashboard.email"/></Link>
                </Menu.Item>

                <Menu.Item key="customerPanel">
                  <Link to ="/settings/customer-panel"><i className="icon icon-customer-panel"/>
                    <IntlMessages id="sidebar.dashboard.customer.panel"/></Link>
                </Menu.Item>

                <Menu.Item key="aboutSystem">
                  <Link to ="/settings/about-system"><i className="icon icon-sweet-alert"/>
                    <IntlMessages id="sidebar.dashboard.about.system"/></Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

