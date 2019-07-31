import React, {Component} from "react";
import {Button, Dropdown, Layout, Menu, Popover} from "antd";
import {Link, withRouter} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import languageData from "./languageData";
import {switchLanguage, toggleCollapsedSideNav} from "../../appRedux/actions/Setting";
import SearchBox from "../../components/SearchBox";
import UserInfo from "components/UserInfo";
import Auxiliary from "util/Auxiliary";


import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE} from "../../constants/ThemeSetting";
import {connect} from "react-redux";
import UserProfile from "../Sidebar/UserProfile";
import Permissions from "../../util/Permissions";

const {Header} = Layout;

class Topbar extends Component {

  state = {
    searchText: '',
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language =>
          <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
            this.props.switchLanguage(language)
          }>
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
            <span className="gx-language-text">{language.name}</span>
          </li>
        )}
      </ul>
    </CustomScrollbars>);

  updateSearchChatUser = (evt) => {
    this.setState({
      searchText: evt.target.value,
    });
  };

  onAddNewTicket = () => {
    this.props.history.push('/manage-tickets/add-new-ticket')
  };

  onAddNewCustomer = () => {
    this.props.history.push('/customers/add-customers')
  };

  onAddNewStaff = () => {
    this.props.history.push('/staff/add-new-member')
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canTicketAdd() ?
          <Menu.Item key="1" onClick={this.onAddNewTicket}>
            <i className="icon icon-add"/> Add New Ticket
          </Menu.Item> : null
        }
        {Permissions.canCustomerAdd() ?
          <Menu.Item key="2" onClick={this.onAddNewCustomer}>
            <i className="icon icon-add"/> Add New Customer
          </Menu.Item> : null
        }
        {Permissions.canStaffAdd() ?
          <Menu.Item key="3" onClick={this.onAddNewStaff}>
            <i className="icon icon-add"/> Add New Staff
          </Menu.Item> : null
        }
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <span className="gx-mr-2"><i className="icon icon-add-circle"/></span>
        <span>New</span>
      </Button>
    </Dropdown>
  };


  render() {
    const {locale, width, navCollapsed, navStyle} = this.props;
    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
            <div className="gx-linebar gx-mr-3">
              <i className="gx-icon-btn icon icon-menu"
                 onClick={() => {
                   this.props.toggleCollapsedSideNav(!navCollapsed);
                 }}
              />
            </div> : null}

          <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
            <img alt="" src={require("assets/images/logo.svg")}/></Link>

          <div className="gx-mr-4">{this.onSelectOption()}</div>
          <Link to="/">
            <span><i className="icon icon-menu-right"/></span>
            <span className="gx-ml-2">How it works</span>
          </Link>
          <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
              <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={
                <SearchBox styleName="gx-popover-search-bar"
                           placeholder="Search in app..."
                           onChange={this.updateSearchChatUser.bind(this)}
                           value={this.state.searchText}/>
              } trigger="click">
                <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>
              </Popover>
            </li>

            <li className="gx-sidebar-notifications">
              <UserProfile/>
            </li>
            <li className="gx-language" style={{display: 'none'}}>
              <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={this.languageMenu()}
                       trigger="click">
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${locale.icon}`}/>
                  <span className="gx-pl-2 gx-language-name">{locale.name}</span>
                  <i className="icon icon-chevron-down gx-pl-2"/>
                </span>
              </Popover>
            </li>
            {width >= TAB_SIZE ? null :
              <Auxiliary>
                <li className="gx-user-nav"><UserInfo/></li>
              </Auxiliary>
            }
          </ul>
        </Header>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {locale, navStyle, navCollapsed, width} = settings;
  return {locale, navStyle, navCollapsed, width}
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(Topbar));
