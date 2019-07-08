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
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag,
  Tooltip
} from "antd";
import Widget from "../../../components/Widget/index";
import Permissions from "../../../util/Permissions";
import moment from "moment";
import {Link} from "react-router-dom";
import TicketDetail from "./TicketDetail";
import InfoView from "../../../components/InfoView";
import CustomScrollbars from "../../../util/CustomScrollbars";
import {
  getTickedId,
  onDeleteTicket,
  onGetConversationList,
  onGetTickets,
  onSendMessage,
  onUpdateTicketPriority,
  onUpdateTicketStatus
} from "../../../appRedux/actions/TicketList";
import {onGetTicketPriorities} from "../../../appRedux/actions/TicketPriorities";
import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";
import {onGetTicketStatus} from "../../../appRedux/actions/TicketStatuses";
import {connect} from "react-redux";

const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;

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
      showMoreCustomer: false,
      sortParam: "",
      archive: false
    };
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
      this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities,
      this.state.selectedStatuses, this.state.sortParam, this.state.archive);
    this.props.onGetTicketPriorities();
    this.props.onGetStaff();
    this.props.onGetCustomersData();
    this.props.onGetTicketStatus();
  };

  onToggleShowMoreStaff = () => {
    this.setState({showMoreStaff: !this.state.showMoreStaff});
  };

  onToggleShowMoreCustomer = () => {
    this.setState({showMoreCustomer: !this.state.showMoreCustomer});
  };


  onGetPaginatedData = (currentPage, itemsPerPage, filterData, startDate, endDate, selectedStaff, selectedCustomers,
                        selectedPriorities, selectedStatuses, sortingOrder, archive) => {
    if (Permissions.canTicketView()) {
      this.props.onGetTickets(currentPage, itemsPerPage, filterData, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, sortingOrder, archive);
    }
  };

  onSideBarActive = () => {
    this.setState({sideBarActive: !this.state.sideBarActive});
  };

  onFilterTextChange = (e) => {
    const {
      current, itemNumbers, startDate, endDate, selectedStaff,
      selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(current, itemNumbers, this.state.filterText, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onCurrentIncrement = () => {
    const {
      itemNumbers, filterText, startDate, endDate, selectedStaff,
      selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, startDate, endDate, selectedStaff,
          selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
      })
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    const {
      itemNumbers, filterText, startDate, endDate, selectedStaff,
      selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, startDate, endDate, selectedStaff,
          selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
      })
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

  onDropdownChange = (value) => {
    const {
      filterText, startDate, endDate, selectedStaff, selectedCustomers,
      selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, filterText, startDate, endDate,
        selectedStaff, selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
    });
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
              {record.assigned_by ?
                <Tooltip placement="top" title={record.assigned_by.first_name + " " + record.assigned_by.last_name}>
                  {record.assigned_by.avatar ?
                    <Avatar className="gx-mr-3 gx-size-50" src={record.assigned_by.avatar.src}/> :
                    <Avatar className="gx-mr-3 gx-size-50"
                            style={{backgroundColor: '#f56a00'}}>{record.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                </Tooltip> : <Avatar className="gx-size-50 gx-mr-3" src="https://via.placeholder.com/150x150"/>}
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
                <Tag className="gx-ml-2" color="blue">{record.product_name}</Tag>
                <div>Created on {moment(record.created_at.date).format('LL')}</div>
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
          return <Tag color="green">{record.status_name}</Tag>
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
            {this.onShowRowDropdown(record.id)}
      </span>
        },
      },
    ];
  };

  onShowRowDropdown = (ticketId) => {
    const menu = (
      <Menu>
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure to Archive this Ticket?"
            onConfirm={() => this.props.onDeleteTicket({ids: ticketId})}
            okText="Yes"
            cancelText="No">
            Archive
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h"/>
      </Dropdown>
    )
  };

  onSelectTicket = record => {
    this.setState({currentTicket: record})
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedTickets.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Ticket(s)?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedTickets
          };
          this.props.onDeleteTicket(obj);
          this.setState({selectedRowKeys: [], selectedTickets: []});
        }
      })
    } else {
      confirm({
        title: "Please Select Ticket(s) first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowBulkDeleteConfirm}>
          Archive
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
    const {
      itemNumbers, filterText, startDate, endDate, selectedStaff,
      selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    this.setState({current: page}, () => {
      this.onGetPaginatedData(this.state.current, itemNumbers, filterText, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
    });
  };

  onBackToList = () => {
    this.setState({currentTicket: null})
  };

  onStartDateChange = value => {
    const {
      current, itemNumbers, filterText, endDate, selectedStaff,
      selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    this.setState({startDate: value}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, this.state.startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
    });
  };

  onEndDateChange = value => {
    const {
      current, itemNumbers, filterText, startDate, selectedStaff,
      selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    this.setState({endDate: value}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, startDate, this.state.endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
    });
  };

  onGetSidebar = () => {
    const {
      current, itemNumbers, filterText, startDate, endDate, selectedStaff, selectedCustomers, customerFilterText,
      selectedPriorities, selectedStatuses, sortParam, archive, staffFilterText, showMoreStaff, showMoreCustomer
    } = this.state;
    const staffs = showMoreStaff ? this.props.staffList.filter(staff => staff.first_name.indexOf(staffFilterText) !== -1)
      : this.props.staffList.filter(staff => staff.first_name.indexOf(staffFilterText) !== -1).slice(0, 5);
    const customers = showMoreCustomer ? this.props.customersList.filter(customer => customer.first_name.indexOf(customerFilterText) !== -1)
      : this.props.customersList.filter(customer => customer.first_name.indexOf(customerFilterText) !== -1).slice(0, 5);
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
                  value={startDate}
                  placeholder="Select"
                  onChange={this.onStartDateChange}
                  className="gx-my-3"
                  style={{width: "100%"}}
                  format='YYYY/MM/DD'/>
                <DatePicker
                  value={endDate}
                  placeholder="Updated"
                  onChange={this.onEndDateChange}
                  style={{width: "100%"}}/>
              </div>
            </div>
            <div>
              <div className="gx-d-flex gx-justify-content-between gx-mt-5">
                <h4>Filter By Staff</h4>
                <Button type="link" onClick={() => {
                  this.setState({selectedStaff: []}, () => {
                    this.onGetPaginatedData(current, itemNumbers, filterText, startDate, endDate, this.state.selectedStaff,
                      selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
                  })
                }}> Reset</Button>
              </div>
              <Input type="text" value={staffFilterText}
                     onChange={(e) => this.setState({staffFilterText: e.target.value})}/>
              <Checkbox.Group onChange={this.onSelectStaff} value={selectedStaff}>
                {staffs.map(staff => {
                  return <div className="gx-my-2"><Checkbox value={staff.id}>
                    {staff.first_name + " " + staff.last_name}</Checkbox></div>
                })}
              </Checkbox.Group>
              <div>
                <Button type="link" onClick={this.onToggleShowMoreStaff}>
                  {this.state.showMoreStaff ? "View Less" : `${this.props.staffList.length - 5} More`}
                </Button>
              </div>
            </div>
            <div>
              <div className="gx-d-flex gx-justify-content-between gx-mt-5">
                <h4>Select Customer</h4>
                <Button type="link" onClick={() => {
                  this.setState({selectedCustomers: []},
                    () => {
                      this.onGetPaginatedData(current, itemNumbers, filterText, startDate, endDate, selectedStaff,
                        this.state.selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
                    }
                  )
                }}> Reset</Button>
              </div>
              <Input type="text" value={customerFilterText}
                     onChange={(e) => this.setState({customerFilterText: e.target.value})}/>
              <Checkbox.Group onChange={this.onSelectCustomer} value={selectedCustomers}>
                {customers.map(customer => {
                  return <div className="gx-my-2">
                    <Checkbox value={customer.id}>{customer.first_name + " " + customer.last_name}</Checkbox>
                  </div>
                })}
              </Checkbox.Group>
              <div>
                <Button type="link" onClick={this.onToggleShowMoreCustomer}>
                  {this.state.showMoreCustomer ? "View Less" : `${this.props.customersList.length - 5} More`}
                </Button>
              </div>
            </div>
            <div className="gx-mt-5">
              <h4>Priority</h4>
              <Input type="text"/>
              <Checkbox.Group onChange={this.onSelectPriorities} value={selectedPriorities}>
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
              <Checkbox.Group onChange={this.onSelectStatuses} value={selectedStatuses}>
                {this.props.statuses.map(status => {
                  return <div className="gx-my-2">
                    <Checkbox value={status.id}>{status.name}</Checkbox>
                  </div>
                })}
              </Checkbox.Group>
            </div>
            <Button type="primary" className="gx-mt-3" onClick={this.onSetArchive}>Archive</Button>
          </div>
        </div>
      </CustomScrollbars>
    </div>
  };

  onSelectStaff = checkedList => {
    const {
      current, itemNumbers, filterText, startDate, endDate,
      selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    this.setState({selectedStaff: checkedList}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, startDate, endDate, this.state.selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
    });
  };

  onSelectCustomer = checkedList => {
    const {
      current, itemNumbers, filterText, startDate, endDate, selectedStaff,
      selectedPriorities, selectedStatuses, sortParam, archive
    } = this.state;
    this.setState({selectedCustomers: checkedList}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, startDate, endDate, selectedStaff,
        this.state.selectedCustomers, selectedPriorities, selectedStatuses, sortParam, archive)
    });
  };

  onSelectPriorities = checkedList => {
    const {
      current, itemNumbers, filterText, startDate, endDate, selectedStaff,
      selectedCustomers, selectedStatuses, sortParam, archive
    } = this.state;
    this.setState({selectedPriorities: checkedList}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, startDate, endDate, selectedStaff,
        selectedCustomers, this.state.selectedPriorities, selectedStatuses, sortParam, archive)
    });
  };

  onSelectStatuses = checkedList => {
    const {
      current, itemNumbers, filterText, startDate, endDate, selectedStaff,
      selectedCustomers, selectedPriorities, sortParam, archive
    } = this.state;
    this.setState({selectedStatuses: checkedList}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, this.state.selectedStatuses, sortParam, archive)
    });
  };

  onSetArchive = () => {
    const {
      current, itemNumbers, filterText, startDate, endDate, selectedStaff,
      selectedCustomers, selectedPriorities, selectedStatuses, sortParam
    } = this.state;
    this.setState({archive: !this.state.archive}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, sortParam, this.state.archive)
    });
  };

  onSortDropdown = () => {
    const menu = (
      <Menu>
        <Menu.Item key="earliest" value="earliest" onClick={(e) => this.onSetSortParam(e.key)}>
          By Earliest
        </Menu.Item>
        <Menu.Item key="latest" onClick={(e) => this.onSetSortParam(e.key)}>
          By latest
        </Menu.Item>
        <Menu.Item key="priority" onClick={(e) => this.onSetSortParam(e.key)}>
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

  onSetSortParam = key => {
    const {
      current, itemNumbers, filterText, startDate, endDate, selectedStaff,
      selectedCustomers, selectedPriorities, selectedStatuses, archive
    } = this.state;
    this.setState({sortParam: key}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, this.state.sortParam, archive)
    });
  };


  render() {
    const {selectedRowKeys, currentTicket} = this.state;
    const tickets = this.props.tickets;
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
                <Table key="allTickets" rowSelection={rowSelection} columns={this.onTicketRowData()}
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
            <TicketDetail currentTicket={this.state.currentTicket}
                          priorities={this.props.priorities}
                          statuses={this.props.statuses}
                          onBackToList={this.onBackToList}
                          history={this.props.history}/>}
          <InfoView/>
        </div>
        {this.state.sideBarActive ? this.onGetSidebar() : null}
      </div>
    );
  }
}

const mapStateToProps = ({ticketList, supportStaff, customers, ticketPriorities, ticketStatuses}) => {
  const {tickets, totalItems, conversation} = ticketList;
  const {staffList} = supportStaff;
  const {customersList} = customers;
  const {priorities} = ticketPriorities;
  const {statuses} = ticketStatuses;
  return {tickets, priorities, staffList, customersList, statuses, totalItems, conversation};
};

export default connect(mapStateToProps, {
  onGetTickets,
  onGetTicketPriorities,
  onGetStaff,
  onGetCustomersData,
  onGetTicketStatus,
  onDeleteTicket,
  getTickedId,
  onUpdateTicketStatus,
  onUpdateTicketPriority,
  onGetConversationList,
  onSendMessage
})(AllTickets)
;

AllTickets.defaultProps = {};

AllTickets.propTypes = {};