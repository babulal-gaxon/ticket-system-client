import React, {Component} from "react";
import {Layout, Select} from 'antd';
import {connect} from "react-redux";
import UserInfo from "components/UserInfo";
import HorizontalNav from "../HorizontalNav";
import {Link} from "react-router-dom";
import {switchLanguage, toggleCollapsedSideNav} from "../../../appRedux/actions/Setting";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";
import {onUpdateTicketPriority, onUpdateTickets} from "../../../appRedux/actions";
import EditTicketDetailsModal from "../../../routes/Tickets/TicketDetail/EditTicketDetailsModal";

const {Header} = Layout;
const {Option} = Select;

class InsideHeader extends Component {

  state = {
    searchText: '',
    selectedPriority: null,
    showEditModal: false
  };

  onShowPriorityDropdown = () => {
    const currentTicket = this.props.currentTicket;
    return <Select defaultValue={currentTicket.priority_id} onChange={this.onPriorityChange} style={{width: 120}}>
      {this.props.formOptions.priorities.map(priority => {
        return <Option value={priority.id} key={priority.id}>{priority.name}</Option>
      })
      }
    </Select>
  };

  onToggleEditModal = () => {
    this.setState({showEditModal: !this.state.showEditModal})
  };

  onPriorityChange = value => {
    const currentTicket = this.props.currentTicket;
    this.setState({selectedPriority: value},
      () => this.props.onUpdateTicketPriority(currentTicket.id, this.state.selectedPriority, this))
  };


  render() {
    const {navCollapsed, currentTicket} = this.props;
    const {messages} = this.props.intl;
    const {showEditModal} = this.state;

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

        <div className="gx-header-horizontal-main">
          <div className="gx-container">
            <div className="gx-header-horizontal-main-flex gx-justify-content-between gx-py-5">
              <div>
                <div className="gx-d-flex gx-align-items-center">
                  <h1 className="gx-text-white gx-mb-0">{currentTicket ? currentTicket.title :
                    <IntlMessages id="header.supportRequest"/>}</h1>
                  {currentTicket ? <span className="gx-text-white gx-pointer gx-ml-5" onClick={this.onToggleEditModal}><i
                    className="icon icon-edit gx-mr-2"/><IntlMessages id="tickets.edit"/></span> : null}
                </div>
                <p
                  className="gx-text-white">{currentTicket ? messages["header.ticketIdMessage"] + currentTicket.id :
                  <IntlMessages id="header.ticketMessage"/>}</p>
              </div>

              <div>{currentTicket ? this.onShowPriorityDropdown() : null}</div>
            </div>
          </div>
        </div>
        {showEditModal ?
          <EditTicketDetailsModal
            onToggleEditModal={this.onToggleEditModal}
            currentTicket={currentTicket}
            showEditModal={showEditModal}
            onUpdateTickets={this.props.onUpdateTickets}
          />
          : null}

      </div>
    );
  }
}

const mapStateToProps = ({settings, ticketsData}) => {
  const {locale, navCollapsed} = settings;
  const {currentTicket, formOptions} = ticketsData;
  return {locale, navCollapsed, currentTicket, formOptions}
};
export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage, onUpdateTicketPriority, onUpdateTickets})(injectIntl(InsideHeader));
