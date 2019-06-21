import React, {Component} from "react";
import {Avatar, Button, DatePicker, Dropdown, Icon, Input, Menu, Select, Table, Tag, Tooltip} from "antd";
import {connect} from "react-redux";

import {
  onAddTickets,
  onBackToList,
  onDeleteTicket,
  onGetTickets,
  onSelectTicket,
  onUpdateTickets
} from "../../../appRedux/actions/TicketList";
import Widget from "../../../components/Widget/index";
import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import TicketDetail from "./TicketDetail";
import InfoView from '../../../components/InfoView'
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";
import {onGetTicketPriorities} from "../../../appRedux/actions/TicketPriorities";
import {onGetTicketStatus} from "../../../appRedux/actions/TicketStatuses";
import moment from "moment";
import DropdownButton from "./DropdownButton";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";

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
      endDate: null,
      filterText: "",
      tickets: [],
      filteredCustomers: []
    };
  };
  onFilteredCustomerData = (e, data) =>{
    console.log("khasjhda", data)
    data.checked = e.target.checked;
    const obj =
      {checked: data.checked,
    id: data.id};
    if(e.target.checked) {
      this.setState({ filteredCustomers: this.state.filteredCustomers.concat(obj)})
    }
    else {
      this.state.filteredCustomers.filter(item=>!item.check)
    }
    console.log("filteredCustomers in Function", this.state.filteredCustomers)
  };
  componentWillMount() {
    if (Permissions.canTicketView()) {
      this.props.onGetTickets();
    }
    this.props.onGetTicketPriorities();
    this.props.onGetStaff();
    this.props.onGetCustomersData();
    this.props.onGetTicketStatus();
  };
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({tickets: nextProps.tickets})
  };
  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value})
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onDropdownChange = (value) => {
    this.setState({itemNumbers: value});
  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.tickets.length/this.state.itemNumbers);
    if(this.state.current < pages ) {
      this.setState({current: this.state.current + 1});
    }
    else {
      return null;
    }
  };
  onCurrentDecrement = () => {
    if(this.state.current !== 1) {
      this.setState({current: this.state.current - 1});
    }
    else {
      return null;
    }
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
  onGetSidebar = () => {
    return <div className="gx-main-layout-sidenav gx-d-none gx-d-lg-flex">
      <div className="gx-main-layout-side">
        <div className="gx-main-layout-side-header">
          <h4 className="gx-font-weight-medium">Filter Tickets</h4>
        </div>
        <div className="gx-main-layout-nav">
          <div>
          <label>Filter By Date</label>
          <div>
            <DatePicker
              value={this.state.startDate}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="Select"
              onChange={this.onStartDateChange}/>
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              value={this.state.endDate}
              placeholder="Updated"
              onChange={this.onEndDateChange}/>
          </div>
          </div>

          <div>
            <span>
            <label>Filter By Product</label>
              <span> Reset</span>
            </span>
            <Input type="text"/>
            {this.props.staffList.map(employee=> {
              employee.checked= false;
             return <div>
               <input type="checkbox" checked={employee.checked} onChange = {(e) => this.onFilteredCustomerData(e,employee)}/>
            <span>{employee.staff_name}</span>
            </div>
            })}
          </div>



          <div>
            <span>
            <label>Select Customer</label>
              <span> Reset</span>
            </span>
            <Input type="text"/>
            {this.props.customersList.map(customer=> {
              customer.checked = false;
              return <div>
                <input type="checkbox" checked={customer.checked} onChange = {(e) => this.onFilteredCustomerData(e,customer)}/>
                <span>{customer.company_name}</span>
              </div>
            })}
          </div>
          <div>
            <label>Priority</label>
            <Input type="text"/>
            {this.props.priorities.map(priority=> {
              return <div>
                <input type="checkbox"/>
                <span>{priority.name}</span>
              </div>
            })}
          </div>
          <div>
            <label>Status</label>
            <Input type="text"/>
            {this.props.statuses.map(status=> {
              return <div>
                <input type="checkbox"/>
                <span>{status.name}</span>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  };
  onGetTicketShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };
  onAddButtonClick = () => {
  this.props.history.push('/manage-tickets/add-new-ticket')
  };
  onSortDropdown = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick = {this.onSortByEarliest}>
         By Earliest
        </Menu.Item>
        <Menu.Item key="2" onClick = {this.onSortByLatest}>
          By latest
        </Menu.Item>
        <Menu.Item key="3" onClick = {this.onSortByPriority}>
          By Highest Priority
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Sort By <Icon type="down" />
      </Button>
    </Dropdown>
    )
  };
  ticketRowData = () => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.id}</span>
        },
      },
      {
        title: 'Ticket Detail',
        dataIndex: 'title',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">

              <Tooltip placement="top" title={record.assigned_by}>
                <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
              </Tooltip>

              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
                <Tag className="gx-ml-2" color="blue">Demo Product</Tag>
                <div>Created at {record.created_at}</div>
              </div>
            </div>
          )
        },
      },
      {
        title: 'Assign to',
        dataIndex: '',
        render: (text, record) => {
          return (
            <Tooltip placement="top" title="dummy data">
              <Avatar className="gx-size-36" src="https://via.placeholder.com/150x150"/>
            </Tooltip>
          )
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        render: (text, record) => {
          return <Tag color="red">{record.status_name}</Tag>
        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority_name',
        render: (text, record) => {
          return <Tag color={record.priority_color_code}> {record.priority_name}</Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        render: (text, record) => {
          return <span onClick = {(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
      <DropdownButton onDeleteTicket ={this.props.onDeleteTicket} ticketId = {record.id}>
        <i className="icon icon-ellipse-h" />
      </DropdownButton>
      </span>
        },
      },
    ];
  };
  onSortByLatest = () => {
    const updatedTickets = this.state.tickets.sort((a,b) => {
      const aMoment = moment(a.created_at);
      const bMoment = moment(b.created_at);
      return bMoment.valueOf() - aMoment.valueOf();
    });
    this.setState({tickets:updatedTickets});
  };
  onSortByEarliest = () => {
    const updatedTickets = this.state.tickets.sort((a,b) => {
      const aMoment = moment(a.created_at);
      const bMoment = moment(b.created_at);
      return aMoment.valueOf() - bMoment.valueOf();
    });
    this.setState({tickets:updatedTickets});
  };
  onSortByPriority = () => {
    console.log("in sorting of priorities", this.state.tickets)
    const updatedTickets = this.state.tickets.sort((a,b) => {
      return b.priority_id -  a.priority_id
    });
    console.log("after sorting of priorities", updatedTickets)
    this.setState({tickets:updatedTickets});
  };
  onPageChange = page => {
    this.setState({
      current: page,
    });
  };
  onSortTickets = () => {
    return this.state.tickets.filter(ticket => {
      let flag = true;
      const aMoment = moment(ticket.created_at);
      const bMoment = moment(this.state.startDate);
     if(ticket.title.indexOf(this.state.filterText) === -1)
      {
        flag = false;
      }
     if(!flag && aMoment.valueOf() !== bMoment.valueOf()){
       console.log("Date checking", this.state.startDate);
       flag = false;
     }
     this.state.filteredCustomers.map(filtered => {
       if(filtered === ticket.user_id) {
         return ticket;
       }
     });
      if(flag){
        return ticket;
      }
    });
  };
  render() {
    console.log("onFilteredCustomerData in Render", this.state.filteredCustomers)
    const {selectedRowKeys} = this.state;
    const tickets = this.onSortTickets();
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={`gx-main-content ${this.state.sideBarActive ? "gx-main-layout-has-sider" : ""}`}>
        {this.state.sideBarActive ? this.onGetSidebar() : null}
        <div className="gx-main-layout-content">
          {this.props.currentTicket === null ?
          <Widget styleName="gx-card-filter"
             title={<div className="gx-filter-btn-view gx-filter-btn-view-mins">
                    <Button type="default" className="gx-filter-btn gx-filter-btn-rtl-round"
                            onClick={this.onSideBarActive}>
                      <i className="icon icon-filter"/>
                    </Button>
                    {Permissions.canTicketAdd() ? <Button type="primary" className="gx-btn-lg"
                                                          onClick={this.onAddButtonClick}>
                      Add New
                    </Button> : null}
                  </div>}
                  extra={
                    <div className="gx-d-flex gx-align-items-center">
                      <Input
                        placeholder="Enter keywords to search tickets"
                        prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        value={this.state.filterText}
                      onChange ={this.onFilterTextChange}/>
                      <div className="gx-ml-3">
                        {this.onGetTicketShowOptions()}
                      </div>
                      <div className="gx-ml-3">
                        {this.onSortDropdown()}
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
                    </div>} >

            { (Permissions.canTicketView()) ?
                <Table key={Math.random()} rowSelection={rowSelection} columns={this.ticketRowData()}
                       dataSource={tickets}
                       pagination={{pageSize: this.state.itemNumbers,
                         current: this.state.current,
                         total: tickets.length,
                         showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                         onChange: this.onPageChange
                       }}
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
              {this.onGetTicketShowOptions()}
            </div>
            <div>
            </div>
          </Widget> :  <TicketDetail ticket={this.props.currentTicket} onUpdateTickets={this.props.onUpdateTickets}
                                     onBackToList={this.props.onBackToList}/>}
        </div>
        <InfoView/>
      </div>
    );
  }
}

const mapStateToProps = ({ticketList, supportStaff, customers,ticketPriorities, ticketStatuses}) => {
  const {tickets, currentTicket} = ticketList;
  const {staffList} = supportStaff;
  const {customersList} =  customers;
  const {priorities} = ticketPriorities;
  const {statuses} = ticketStatuses;
  return {tickets, priorities, staffList, currentTicket,customersList, statuses};
};

export default connect(mapStateToProps, {
  onGetTickets,
  onAddTickets,
  onGetTicketPriorities,
  onGetStaff,
  onSelectTicket,
  onUpdateTickets,
  onBackToList,
  onGetCustomersData,
  onGetTicketStatus,
  onDeleteTicket
})(AllTickets);

AllTickets.defaultProps = {
  currentTicket: ""
};

AllTickets.propTypes = {
  currentTicket: PropTypes.object,
};