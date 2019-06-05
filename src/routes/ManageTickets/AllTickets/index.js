import React, {Component} from "react";
import {Button, DatePicker, Icon, Input, Select, Table} from "antd";
import {connect} from "react-redux";

import {
  onAddTickets,
  onBackToList,
  onGetPriorities,
  onGetTickets,
  onSelectTicket,
  onToggleAddTicket,
  onUpdateTickets
} from "../../../appRedux/actions/TicketList";
import Widget from "../../../components/Widget/index";
import AddNewTicket from "../AddNewTicket/index";
import {onSupportStaff} from "../../../appRedux/actions/SupportStaff";
import IntlMessages from "../../../util/IntlMessages";
import TicketDetail from "./TicketDetail";
import InfoView from '../../../components/InfoView'
import Permissions from "../../../util/Permissions";
import {ticketColumn} from "./data";
import PropTypes from "prop-types";

const ButtonGroup = Button.Group;
const Option = Select.Option;

class AllTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
      sideBarActive: false,
      startDate: null,
      endDate: null
    };
  };

  componentWillMount() {
    if (Permissions.canTicketView()) {
      this.props.onGetTickets();
    }
    this.props.onGetPriorities();
    this.props.onSupportStaff();
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onDropdownChange = (value) => {
    this.setState({itemNumbers: value});
  };
  onCurrentIncrement = () => {
    this.setState({current: this.state.current + 1});
  };
  onCurrentDecrement = () => {
    this.setState({current: this.state.current - 1});
  };
  onSideBarActive = () => {
    this.setState({sideBarActive: !this.state.sideBarActive});
  };
  onStartDateChange = value => {
    this.setState({startDate: value});
  };
  onEndDateChange = value => {
    this.setState({endDate: value});
  };
  getSidebar = () => {
    return <div className="gx-main-layout-sidenav gx-d-none gx-d-lg-flex">
      <div className="gx-main-layout-side">
        <div className="gx-main-layout-side-header">
          <h4 className="gx-font-weight-medium">Filter Tickets</h4>
        </div>
        <div className="gx-main-layout-nav">
          <label>Date</label>
          <div>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={this.state.startDate}
              placeholder="Start Date"
              onChange={this.onStartDateChange}/>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={this.state.endDate}
              placeholder="End Date"
              onChange={this.onEndDateChange}/>
          </div>
          <ul className="gx-main-layout-nav">
            <h5>Category</h5>
            <li className="gx-main-layout-nav-label">
              <i className="icon icon-tickets"/>
              <IntlMessages id="sidebar.dashboard.all.tickets"/>
            </li>
            <li className="gx-main-layout-nav-label">
              <i className="icon icon-ticket-new"/>
              <IntlMessages id="sidebar.dashboard.add.new.ticket"/>
            </li>
            <li className="gx-main-layout-nav-label">
              <i className="icon icon-schedule"/>
              <IntlMessages id="sidebar.dashboard.snoozes"/>
            </li>
          </ul>
          <ul>
            <h5>Products</h5>
            <li>
              <i className="icon icon-tag-o"/>
              <IntlMessages id="sidebar.dashboard.jumbo.react"/>
            </li>
            <li>
              <i className="icon icon-tag-o"/>
              <IntlMessages id="sidebar.dashboard.mouldify"/>
            </li>
            <li>
              <i className="icon icon-tag-o"/>
              <IntlMessages id="sidebar.dashboard.cisr.wp.theme"/>
            </li>
            <li>
              <i className="icon icon-tag-o"/>
              <IntlMessages id="sidebar.dashboard.jumbo.react"/>
            </li>
          </ul>
          <ul>
            <h5>Priority</h5>
            <li>
              <i className="icon icon-tag-new"/>
              <span> <IntlMessages id="sidebar.dashboard.critical"/></span>
            </li>
            <li>
              <i className="icon icon-tag-new"/>
              <IntlMessages id="sidebar.dashboard.moderate"/>
            </li>
            <li>
              <i className="icon icon-tag-new"/>
              <IntlMessages id="sidebar.dashboard.default"/>
            </li>
          </ul>
          <Button style={{backgroundColor: "green"}} block>
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  };
  getTicketShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={`gx-main-content ${this.state.sideBarActive ? "gx-main-layout-has-sider" : ""}`}>
        {this.state.sideBarActive ? this.getSidebar() : null}
        <div className="gx-main-layout-content">
          <Widget styleName="gx-card-filter"
                  title={<div className="gx-filter-btn-view gx-filter-btn-view-mins">
                    <Button type="default" className="gx-filter-btn gx-filter-btn-rtl-round"
                            onClick={this.onSideBarActive}>
                      <i className="icon icon-filter"/>
                    </Button>
                    {Permissions.canTicketAdd() ? <Button type="primary" className="gx-btn-lg"
                                                          onClick={this.props.onToggleAddTicket}>
                      Add New
                    </Button> : null}

                  </div>}
                  extra={
                    <div className="gx-d-flex gx-align-items-center">
                      <Input
                        placeholder="Enter keywords to search tickets"
                        prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                      <div className="gx-ml-3">
                        {this.getTicketShowOptions()}
                      </div>
                      <div className="gx-ml-3">
                        <ButtonGroup className="gx-btn-group-flex">
                          <Button className="gx-mb-0" type="default" onClick={this.onCurrentDecrement}>
                            <i className="icon icon-long-arrow-left"/>
                          </Button>
                          <Button className="gx-mb-0" type="default" onClick={this.onCurrentIncrement}>
                            <i className="icon icon-long-arrow-right"/>
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>}>
            {this.props.currentTicket ?
              <TicketDetail ticket={this.props.currentTicket} onUpdateTickets={this.props.onUpdateTickets}
                            onBackToList={this.props.onBackToList}/> :
              (Permissions.canTicketView()) ?
                <Table key={Math.random()} rowSelection={rowSelection} columns={ticketColumn}
                       dataSource={this.props.tickets}
                       pagination={{pageSize: this.state.itemNumbers}}
                       className="gx-table-responsive"
                       onRow={(record) => ({
                         onClick: () => {
                           if (Permissions.canViewTicketDetail()) {
                             this.props.onSelectTicket(record)
                           }
                         }
                       })}
                /> : null}
            <div className="gx-d-flex gx-flex-row">
              {this.getTicketShowOptions()}
            </div>
            <div>
            </div>
          </Widget>
          {this.props.showAddTicket ?
            <AddNewTicket showAddTicket={this.props.showAddTicket}
                          onToggleAddTicket={this.props.onToggleAddTicket}
                          onAddTickets={this.props.onAddTickets}
                          priorities={this.props.priorities}
                          staff={this.props.staff}/> : null}
        </div>
        <InfoView/>
      </div>
    );
  }
}

const mapStateToProps = ({ticketList, supportStaff}) => {
  const {tickets, showAddTicket, priorities, currentTicket} = ticketList;
  const {staff} = supportStaff;
  return {tickets, showAddTicket, priorities, staff, currentTicket};
};

export default connect(mapStateToProps, {
  onGetTickets,
  onToggleAddTicket,
  onAddTickets,
  onGetPriorities,
  onSupportStaff,
  onSelectTicket,
  onUpdateTickets,
  onBackToList
})(AllTickets);

AllTickets.defaultProps = {
  showAddTicket: false,
  currentTicket: ""
};

AllTickets.propTypes = {
  currentTicket: PropTypes.object,
  showAddTicket: PropTypes.bool,
};