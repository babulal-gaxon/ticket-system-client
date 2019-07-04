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

import {
  getTickedId,
  onDeleteTicket,
  onGetConversationList,
  onGetTickets,
  onSendMessage,
  onUpdateTicketPriority,
  onUpdateTicketStatus,
} from "../../../appRedux/actions/TicketList";
import Widget from "../../../components/Widget/index";
import Permissions from "../../../util/Permissions";
import moment from "moment";
import {Link} from "react-router-dom";
import TicketDetail from "./TicketDetail";
import InfoView from "../../../components/InfoView";
import {onGetTicketPriorities} from "../../../appRedux/actions/TicketPriorities";
import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";
import {onGetTicketStatus} from "../../../appRedux/actions/TicketStatuses";
import {connect} from "react-redux";
import CustomScrollbars from "../../../util/CustomScrollbars";

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
      showMoreCustomer: false,
      sortParam: "",
      archive: false
    };
  };

  onToggleShowMoreStaff = () => {
    this.setState({showMoreStaff: !this.state.showMoreStaff});
  };

  onToggleShowMoreCustomer = () => {
    this.setState({showMoreCustomer: !this.state.showMoreCustomer});
  };

  componentWillMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
      this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers
      , this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive);
    this.props.onGetTicketPriorities();
    this.props.onGetStaff();
    this.props.onGetCustomersData();
    this.props.onGetTicketStatus();
  };

  onGetPaginatedData = (currentPage, itemsPerPage, filterData, startDate, endDate, selectedStaff, selectedCustomers,
                        selectedPriorities, selectedStatuses, sortingOrder, archive) => {
    if (Permissions.canTicketView()) {
      this.props.onGetTickets(currentPage, itemsPerPage, filterData, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, sortingOrder, archive);
    }
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({tickets: nextProps.tickets})
  };

  onSideBarActive = () => {
    this.setState({sideBarActive: !this.state.sideBarActive});
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
        this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers
        , this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive);
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
          this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers
          , this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
          this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers
          , this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
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

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
        this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers
        , this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
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
              <Tooltip placement="top" title={record.assigned_by.first_name + " " + record.assigned_by.last_name}>
                {record.assigned_by.avatar ?
                  <Avatar className="gx-mr-3 gx-size-50" src={record.assigned_by.avatar.src}/> :
                  <Avatar className="gx-mr-3 gx-size-50"
                          style={{backgroundColor: '#f56a00'}}>{record.assigned_by.first_name[0].toUpperCase()}</Avatar>}
              </Tooltip>
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
        title: "Are you sure to delete the selected Tickets?",
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
        title: "Please Select Roles first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowBulkDeleteConfirm}>
          Archive
        </Menu.Item>
        <Menu.Item key="2" onClick={this.onShowBulkDeleteConfirm}>
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
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
        this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers
        , this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive);
    });
  };

  onBackToList = () => {
    this.setState({currentTicket: null})
  };

  onStartDateChange = value => {
    console.log("start date", value)
    this.setState({startDate: value}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate, this.state.endDate,
        this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities,
        this.state.selectedStatuses, this.state.sortParam, this.state.archive)
    });
  };

  onEndDateChange = value => {
    this.setState({endDate: value}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate, this.state.endDate,
        this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
    });
  };

  onGetSidebar = () => {
    const staffs = this.state.showMoreStaff ? this.props.staffList : this.props.staffList.slice(0, 5);
    const customers = this.state.showMoreCustomer ? this.props.customersList : this.props.customersList.slice(0, 5);
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
                  style={{width: "100%"}}
                  format='YYYY/MM/DD'/>
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
                <Button type="link" onClick={() => {
                  this.setState({selectedStaff: []}, () => {
                    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
                      this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers
                      , this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
                  })
                }}> Reset</Button>
              </div>
              <Input type="text" value={this.state.StaffFilterText}
                     onChange={(e) => this.setState({StaffFilterText: e.target.value})}/>
              <Checkbox.Group onChange={this.onSelectStaff} value={this.state.selectedStaff}>
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
                      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate,
                        this.state.endDate, this.state.selectedStaff, this.state.selectedCustomers
                        , this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
                    }
                  )
                }}> Reset</Button>
              </div>
              <Input type="text"/>
              <Checkbox.Group onChange={this.onSelectCustomer} value={this.state.selectedCustomers}>
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
            <Button type="primary" className="gx-mt-3" onClick={this.onSetArchive}>Archive</Button>
          </div>
        </div>
      </CustomScrollbars>
    </div>
  };

  onSelectStaff = checkedList => {
    this.setState({selectedStaff: checkedList}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate, this.state.endDate,
        this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
    });
  };

  onSelectCustomer = checkedList => {
    this.setState({selectedCustomers: checkedList}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate, this.state.endDate,
        this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
    });
  };

  onSelectPriorities = checkedList => {
    this.setState({selectedPriorities: checkedList}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate, this.state.endDate,
        this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
    });
  };

  onSelectStatuses = checkedList => {
    this.setState({selectedStatuses: checkedList}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate, this.state.endDate,
        this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
    });
  };

  onSetArchive = () => {
    this.setState({archive: !this.state.archive}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate, this.state.endDate,
        this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
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
    this.setState({sortParam: key}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.startDate, this.state.endDate,
        this.state.selectedStaff, this.state.selectedCustomers, this.state.selectedPriorities, this.state.selectedStatuses, this.state.sortParam, this.state.archive)
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
})(AllTickets);

AllTickets.defaultProps = {};

AllTickets.propTypes = {};