import React, {Component} from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
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
import {
  getTickedId,
  onDeleteTicket,
  onGetFilterOptions,
  onGetTickets,
  onSelectTicket
} from "../../../appRedux/actions/TicketList";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";
import {connect} from "react-redux";
import FilterBar from "./FilterBar";
import PropTypes from "prop-types";

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
      filterText: "",
      selectedTickets: [],
      sortParam: "",
    };
  };

  componentDidMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, this.state.sortParam);
    this.props.onGetCustomersData();
    this.props.onGetFilterOptions();
  }

  onGetPaginatedData = (currentPage, itemsPerPage, filterData, sortingOrder, startDate, endDate, selectedStaff,
                        selectedCustomers, selectedPriorities, selectedStatuses, archive) => {
    if (Permissions.canTicketView()) {
      this.props.onGetTickets(currentPage, itemsPerPage, filterData, sortingOrder, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, archive);
    }
  };

  onSideBarActive = () => {
    this.setState({sideBarActive: !this.state.sideBarActive});
  };

  onFilterTextChange = (e) => {
    const {itemNumbers, sortParam} = this.state;
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(1, itemNumbers, this.state.filterText, sortParam)
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onCurrentIncrement = () => {
    const {itemNumbers, filterText, sortParam} = this.state;
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, sortParam)
      })
    }
  };

  onCurrentDecrement = () => {
    const {itemNumbers, filterText, sortParam} = this.state;
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, sortParam)
      })
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
    const {filterText, sortParam} = this.state;
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, filterText, sortParam)
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
        key: 'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.id}</span>
        },
      },
      {
        title: 'Ticket Detail',
        dataIndex: 'title',
        key: 'title',
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
        dataIndex: 'assignTo',
        key: 'assign_to',
        render: (text, record) => {
          return (<div>
              {record.assigned_to ?
                <Tooltip placement="top" title={record.assigned_to.first_name + " " + record.assigned_to.last_name}
                         key={record.assigned_to.user_id}>
                  {record.assigned_to.avatar ?
                    <Avatar className="gx-mr-3 gx-size-36" src={record.assigned_to.avatar.src}/> :
                    <Avatar className="gx-mr-3 gx-size-36"
                            style={{backgroundColor: '#f56a00'}}>{record.assigned_to.first_name[0].toUpperCase()}</Avatar>}
                </Tooltip>
                :
                <Tooltip placement="top" title="Not assigned">
                  <Avatar className="gx-size-36"/>
                </Tooltip>}
            </div>
          )
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'status_id',
        render: (text, record) => {
          return <Tag color="green">{record.status_name}</Tag>
        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority_name',
        key: 'priority_name',
        render: (text, record) => {
          return <Tag color={record.priority_color_code}> {record.priority_name}</Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
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
    this.props.onSelectTicket(record);
    this.setState({sideBarActive: false})
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
    const {itemNumbers, filterText, sortParam} = this.state;
    this.setState({current: page}, () => {
      this.onGetPaginatedData(this.state.current, itemNumbers, filterText, sortParam)
    });
  };

  onBackToList = () => {
    this.setState({currentTicket: null})
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
    const {current, itemNumbers, filterText} = this.state;
    this.setState({sortParam: key}, () => {
      this.onGetPaginatedData(current, itemNumbers, filterText, this.state.sortParam)
    });
  };

  render() {
    const {current, filterText, itemNumbers, totalItems, sortParam} = this.state;
    const {selectedRowKeys} = this.state;
    const {tickets, currentTicket, filterData, customersList} = this.props;
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
                    value={filterText}
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
                <Table rowKey="id" rowSelection={rowSelection} columns={this.onTicketRowData()}
                       dataSource={tickets}
                       pagination={{
                         pageSize: itemNumbers,
                         current: current,
                         total: totalItems,
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
            <TicketDetail/>
          }
          <InfoView/>
        </div>
        {this.state.sideBarActive ?
          <FilterBar current={current}
                     itemNumbers={itemNumbers}
                     filterText={filterText}
                     sortParam={sortParam}
                     onGetPaginatedData={this.onGetPaginatedData}
                     staffList={filterData.staffs}
                     customersList={customersList}
                     priorities={filterData.priority}
                     statuses={filterData.status}
                     onGetCustomersData={this.props.onGetCustomersData}
          />

          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ticketList, customers}) => {
  const {tickets, totalItems, currentTicket, filterData} = ticketList;
  const {customersList} = customers;
  return {tickets, customersList, totalItems, currentTicket, filterData};
};

export default connect(mapStateToProps, {
  onGetTickets,
  onGetCustomersData,
  onDeleteTicket,
  getTickedId,
  onSelectTicket,
  onGetFilterOptions
})(AllTickets)
;

AllTickets.defaultProps = {
  tickets: [],
  totalItems: null,
  currentTicket: null,
  filterData: {
    status: [],
    priority: [],
    staffs: []
  },
  customersList: []
};

AllTickets.propTypes = {
  tickets: PropTypes.array,
  totalItems: PropTypes.number,
  currentTicket: PropTypes.object,
  filterData: PropTypes.object,
  customersList: PropTypes.array
};