import React, {Component} from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Icon,
  Input,
  Menu,
  message,
  Select,
  Table,
  Tag,
  Tooltip
} from "antd";

import {getTickedId, onDeleteTicket, onGetTickets,} from "../../../appRedux/actions/TicketList";
import Widget from "../../../components/Widget/index";
import Permissions from "../../../util/Permissions";
import moment from "moment";
import DropdownButton from "./DropdownButton";
import {Link} from "react-router-dom";
import TicketDetail from "./TicketDetail";
import InfoView from "../../../components/InfoView";
import {onGetTicketPriorities} from "../../../appRedux/actions/TicketPriorities";
import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";
import {onGetTicketStatus} from "../../../appRedux/actions/TicketStatuses";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import CustomScrollbars from "../../../util/CustomScrollbars";

const Option = Select.Option;
const Search = Input.Search;

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
      filteredCustomers: [],
      currentTicket: null,
      selectedTickets: [],
      selectedStaff: [],
      selectedCustomers: [],
      selectedPriorities: [],
      selectedStatuses: [],
      staffFilterText: "",
      customerFilterText: "",
      priorityFilterText: "",
      statusFilterText: "",
      showMoreStaff: false,
      showMoreCustomer: false
    };
  };

  onToggleShowMoreStaff = () => {
    this.setState({showMoreStaff: !this.state.showMoreStaff});
  };

  onToggleShowMoreCustomer = () => {
    this.setState({showMoreCustomer: !this.state.showMoreCustomer});
  };

  componentWillMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers);
    this.props.onGetTicketPriorities();
    this.props.onGetStaff();
    this.props.onGetCustomersData();
    this.props.onGetTicketStatus();
  };

  onGetPaginatedData = (currentPage, itemsPerPage) => {
    if (Permissions.canTicketView()) {
      this.props.onGetTickets(currentPage, itemsPerPage);
    }
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({tickets: nextProps.tickets})
  };

  onSideBarActive = () => {
    this.setState({sideBarActive: !this.state.sideBarActive});
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value})
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers)
    });
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers)
      });
    } else {
      return null;
    }
  };

  onGetTicketShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange} className="gx-mx-2">
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onAddButtonClick = () => {
    this.props.getTickedId(null);
    this.props.history.push('/manage-tickets/add-new-ticket')
  };

  onTicketRowData = () => {
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
                <div>Created on {moment(record.created_at).format('LL')}</div>
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
          return <span onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
      <DropdownButton onDeleteTicket={this.props.onDeleteTicket} ticketId={record.id}>
        <i className="icon icon-ellipse-h"/>
      </DropdownButton>
      </span>
        },
      },
    ];
  };

  onSelectTicket = record => {
    this.setState({currentTicket: record})
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          Archive
        </Menu.Item>
        <Menu.Item key="2" onClick={() => {
        }}>
          Delete
        </Menu.Item>
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers)
    });
  };

  onBackToList = () => {
    this.setState({currentTicket: null})
  };

  onStartDateChange = value => {
    this.setState({startDate: value});
  };

  onEndDateChange = value => {
    this.setState({endDate: value});
  };

  onGetSidebar = () => {
    const staffs = this.state.showMoreStaff ? this.props.staffList : this.props.staffList.slice(0,5);
    const customers = this.state.showMoreCustomer ? this.props.customersList : this.props.customersList.slice(0,5);
    return <div className="gx-main-layout-sidenav gx-d-none gx-d-lg-flex">
      <CustomScrollbars className="gx-layout-sider-scrollbar">
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
                placeholder="Select"
                onChange={this.onStartDateChange}
                className="gx-my-3"
                style={{width: "100%"}}/>
              <DatePicker
                value={this.state.endDate}
                placeholder="Updated"
                onChange={this.onEndDateChange}
                style={{width: "100%"}}/>
            </div>
          </div>
          <div>
            <div className="gx-d-flex gx-justify-content-between gx-mt-5">
              <h4>Filter By Staff</h4>
              <span> Reset</span>
            </div>
            <Input type="text" value={this.state.StaffFilterText}
                   onChange = {(e) => this.setState({StaffFilterText: e.target.value})}/>
            <Checkbox.Group onChange={this.onSelectStaff} value={this.state.selectedStaff}>
              {staffs.map(staff => {
                return <div className="gx-my-2"><Checkbox value={staff.id}>
                  {staff.first_name + " " + staff.last_name}</Checkbox></div>
              })}
            </Checkbox.Group>
            <div onClick={this.onToggleShowMoreStaff}>
              {this.state.showMoreStaff ?"View Less" : `${this.props.staffList.length - 5} More`}
            </div>
          </div>
          <div>
            <div className="gx-d-flex gx-justify-content-between gx-mt-5">
              <h4>Select Customer</h4>
              <span> Reset</span>
            </div>
            <Input type="text"/>
            <Checkbox.Group onChange={this.onSelectCustomer} value={this.state.selectedCustomers}>
              {customers.map(customer => {
                return <div className="gx-my-2">
                  <Checkbox value={customer.id}>{customer.first_name + " " + customer.last_name}</Checkbox>
                </div>
              })}
            </Checkbox.Group>
            <div onClick={this.onToggleShowMoreCustomer}>
              {this.state.showMoreCustomer ?"View Less" : `${this.props.customersList.length - 5} More`}
            </div>
          </div>
          <div className="gx-mt-5">
            <h4>Priority</h4>
            <Input type="text"/>
            <Checkbox.Group onChange={this.onSelectPriorities} value={this.state.selectedPriorities}>
              {this.props.priorities.map(priority => {
                return <div className="gx-my-2">
                  <Checkbox value={priority.id}>{priority.name}</Checkbox>
                </div>
              })}
            </Checkbox.Group>
          </div>
          <div className="gx-mt-5">
            <h4>Status</h4>
            <Input type="text"/>
            <Checkbox.Group onChange={this.onSelectStatuses} value={this.state.selectedStatuses}>
              {this.props.statuses.map(status => {
                return <div className="gx-my-2">
                  <Checkbox value={status.id}>{status.name}</Checkbox>
                </div>
              })}
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </CustomScrollbars>
    </div>
  };

  onSelectStaff = checkedList => {
    this.setState({selectedStaff: checkedList});
  };

  onSelectCustomer = checkedList => {
    this.setState({selectedCustomers: checkedList});
  };

  onSelectPriorities = checkedList => {
    this.setState({selectedPriorities: checkedList})
  };

  onSelectStatuses = checkedList => {
    this.setState({selectedStatuses: checkedList})
  };

  onSortDropdown = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onSortByEarliest}>
          By Earliest
        </Menu.Item>
        <Menu.Item key="2" onClick={this.onSortByLatest}>
          By latest
        </Menu.Item>
        <Menu.Item key="3" onClick={this.onSortByPriority}>
          By Highest Priority
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          Sort By <Icon type="down"/>
        </Button>
      </Dropdown>
    )
  };

  onSortByLatest = () => {
    const updatedTickets = this.state.tickets.sort((a, b) => {
      const aMoment = moment(a.created_at);
      const bMoment = moment(b.created_at);
      return bMoment.valueOf() - aMoment.valueOf();
    });
    this.setState({tickets: updatedTickets}, () => {
      message.success('The Tickets has been sorted successfully.');
    });
  };

  onSortByEarliest = () => {
    const updatedTickets = this.state.tickets.sort((a, b) => {
      const aMoment = moment(a.created_at);
      const bMoment = moment(b.created_at);
      return aMoment.valueOf() - bMoment.valueOf();
    });
    this.setState({tickets: updatedTickets}, () => {
      message.success('The Tickets has been sorted successfully.');
    });
  };

  onSortByPriority = () => {
    const updatedTickets = this.state.tickets.sort((a, b) => {
      return b.priority_id - a.priority_id
    });
    this.setState({tickets: updatedTickets}, () => {
      message.success('The Tickets has been sorted successfully.');
    });
  };

  onSortTickets = () => {
    return this.state.tickets.filter(ticket => {
      let flag = true;
      const aMoment = moment(ticket.created_at);
      const bMoment = moment(this.state.startDate);
      if (ticket.title.indexOf(this.state.filterText) === -1) {
        flag = false;
      }
      if (!flag && aMoment.valueOf() !== bMoment.valueOf()) {
        console.log("Date checking", this.state.startDate);
        flag = false;
      }
      this.state.filteredCustomers.map(filtered => {
        if (filtered === ticket.user_id) {
          return ticket;
        }
      });
      if (flag) {
        return ticket;
      }
    });
  };

  render() {
    console.log("selectedd", this.state.StaffFilterText);
    const {selectedRowKeys, currentTicket} = this.state;
    const tickets = this.onSortTickets();
    let ids;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedTickets: ids, selectedRowKeys: selectedRowKeys})
      }
    };
    return (
      <div className={`gx-main-content ${this.state.sideBarActive ? "gx-main-layout-has-sider" : ""}`}>
        <div className="gx-main-layout-content">
          {currentTicket === null ?
            <Widget styleName="gx-card-filter">
              <h4>Tickets</h4>
              <Breadcrumb className="gx-mb-4">
                <Breadcrumb.Item>
                  <Link to="/manage-tickets/all-tickets">Manage Tickets</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className="gx-text-primary">
                  <Link to="/manage-tickets/all-tickets">Tickets</Link>
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className="gx-d-flex gx-justify-content-between">
                <div className="gx-d-flex">
                  {Permissions.canTicketAdd() ?
                    <Button type="primary" onClick={this.onAddButtonClick}>
                      Add New
                    </Button>
                    : null}
                  <span>{this.onSelectOption()}</span>
                </div>
                <div className="gx-d-flex">
                  <div className="gx-mr-3">
                    {this.onSortDropdown()}
                  </div>
                  <Search
                    placeholder="Search tickets here"
                    style={{width: 350}}
                    value={this.state.filterText}
                    onChange={this.onFilterTextChange}/>
                  <div className="gx-ml-3">
                    {this.onGetTicketShowOptions()}
                  </div>
                  <div className="gx-mx-3">
                    <Button.Group>
                      <Button type="default" onClick={this.onCurrentDecrement}>
                        <i className="icon icon-long-arrow-left"/>
                      </Button>
                      <Button type="default" onClick={this.onCurrentIncrement}>
                        <i className="icon icon-long-arrow-right"/>
                      </Button>
                    </Button.Group>
                  </div>
                  <Button type="default" style={{marginRight: -25}} className="gx-filter-btn gx-filter-btn-rtl-round"
                          onClick={this.onSideBarActive}>
                    <i className="icon icon-filter"/>
                  </Button>
                </div>
              </div>
              {(Permissions.canTicketView()) ?
                <Table key={Math.random()} rowSelection={rowSelection} columns={this.onTicketRowData()}
                       dataSource={tickets}
                       pagination={{
                         pageSize: this.state.itemNumbers,
                         current: this.state.current,
                         total: this.props.totalItems,
                         showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                         onChange: this.onPageChange
                       }}
                       className="gx-table-responsive"
                       onRow={(record) => ({
                         onClick: () => {
                           if (Permissions.canViewTicketDetail()) {
                             this.onSelectTicket(record)
                           }
                         }
                       })}
                /> : null}
            </Widget> :
            <TicketDetail ticket={this.props.currentTicket}
                          onBackToList={this.onBackToList}/>}
          <InfoView/>
        </div>
        {this.state.sideBarActive ? this.onGetSidebar() : null}
      </div>
    );
  }
}

const mapStateToProps = ({ticketList, supportStaff, customers, ticketPriorities, ticketStatuses}) => {
  const {tickets, currentTicket} = ticketList;
  const {staffList} = supportStaff;
  const {customersList} = customers;
  const {priorities} = ticketPriorities;
  const {statuses} = ticketStatuses;
  return {tickets, priorities, staffList, currentTicket, customersList, statuses};
};

export default connect(mapStateToProps, {
  onGetTickets,
  onGetTicketPriorities,
  onGetStaff,
  onGetCustomersData,
  onGetTicketStatus,
  onDeleteTicket,
  getTickedId
})(AllTickets);

AllTickets.defaultProps = {
  currentTicket: ""
};

AllTickets.propTypes = {
  currentTicket: PropTypes.object,
};