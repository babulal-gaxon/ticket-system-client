import React, {Component} from "react";
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Select, Table} from "antd";
import Widget from "../../../components/Widget/index";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";
import {onDeleteTicket, onGetFilterOptions, onGetTickets} from "../../../appRedux/actions/TicketList";
import {onSearchCustomers} from "../../../appRedux/actions/Customers";
import {connect} from "react-redux";
import FilterBar from "./FilterBar";
import PropTypes from "prop-types";
import TicketRow from "./TicketRow";

const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;

class AllTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      selectedStaff: [],
      selectedCustomers: [],
      selectedPriorities: [],
      selectedStatuses: [],
      showMoreStaff: false,
      archive: false,
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
    this.onGetPaginatedData(false, this.state.current, this.state.itemNumbers, this.state.filterText, this.state.sortParam);
    this.props.onSearchCustomers();
    this.props.onGetFilterOptions();
  }

  onGetPaginatedData = (updatingContent, currentPage, itemsPerPage, filterData, sortingOrder, startDate, endDate, selectedStaff,
                        selectedCustomers, selectedPriorities, selectedStatuses, archive, onGetTickets) => {
    if (Permissions.canTicketView()) {
      this.props.onGetTickets(updatingContent, currentPage, itemsPerPage, filterData, sortingOrder, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, archive, onGetTickets);
    }
  };

  updateState = (stateData) => {
    this.setState({...stateData}, () => {
      const {current, itemNumbers, filterText, sortParam, startDate, endDate, selectedStaff, selectedCustomers, selectedPriorities, selectedStatuses, archive} = this.state;
      this.onGetPaginatedData(true, current, itemNumbers, filterText, sortParam, startDate, endDate, selectedStaff,
        selectedCustomers, selectedPriorities, selectedStatuses, archive)
    });
  };

  onToggleShowMoreStaff = () => {
    this.setState({showMoreStaff: !this.state.showMoreStaff});
  };
  onSideBarActive = () => {
    this.setState({sideBarActive: !this.state.sideBarActive});
  };

  onFilterTextChange = (e) => {
    const {itemNumbers, sortParam} = this.state;
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(true, 1, itemNumbers, this.state.filterText, sortParam)
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
        this.onGetPaginatedData(true, this.state.current, itemNumbers, filterText, sortParam)
      })
    }
  };

  onCurrentDecrement = () => {
    const {itemNumbers, filterText, sortParam} = this.state;
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(true, this.state.current, itemNumbers, filterText, sortParam)
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
      this.onGetPaginatedData(true, this.state.current, this.state.itemNumbers, filterText, sortParam)
    });
  };

  onAddButtonClick = () => {
    this.props.history.push('/manage-tickets/add-new-ticket')
  };

  onGetTicketDetail = record => {
    this.props.history.push(`/manage-tickets/ticket-detail?id=${record.id}`);
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
      Modal.info({
        title: "Please Select Ticket(s) first",
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {(Permissions.canTicketView()) ?
          <Menu.Item key="1" onClick={this.onShowBulkDeleteConfirm}>
            Archive
          </Menu.Item> : null}
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
      this.onGetPaginatedData(true, this.state.current, itemNumbers, filterText, sortParam)
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
    const {current, itemNumbers, filterText} = this.state;
    this.setState({sortParam: key}, () => {
      this.onGetPaginatedData(true, current, itemNumbers, filterText, this.state.sortParam)
    });
  };

  render() {
    const {current, filterText, itemNumbers, sortParam, endDate, selectedStaff, selectedCustomers, selectedPriorities, selectedStatuses, archive, startDate} = this.state;
    const {selectedRowKeys} = this.state;
    const {tickets, filterData, customersList} = this.props;
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
          <Widget styleName="gx-card-filter">
            <h4 className="gx-widget-heading">Tickets</h4>
            <Breadcrumb className="gx-mb-4">
              <Breadcrumb.Item>
                <Link to="/manage-tickets/all-tickets">Manage Tickets</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/manage-tickets/all-tickets" className="gx-text-primary">Tickets</Link>
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
                {(Permissions.canTicketView()) ?
                  <Button type="default" style={{marginRight: -25}} className="gx-filter-btn gx-filter-btn-rtl-round"
                          onClick={this.onSideBarActive}>
                    <i className="icon icon-filter"/>
                  </Button> : null}
              </div>
            </div>
            <Table rowKey="id" rowSelection={rowSelection} columns={TicketRow(this)}
                   dataSource={tickets}
                   loading={this.props.updatingContent}
                   pagination={{
                     pageSize: itemNumbers,
                     current: current,
                     total: this.props.totalItems,
                     showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                     onChange: this.onPageChange
                   }}
                   className="gx-table-responsive"
                   onRow={(record) => ({
                     onClick: () => {
                       if (Permissions.canViewTicketDetail()) {
                         this.onGetTicketDetail(record)
                       }
                     }
                   })}
            />
          </Widget>
        </div>
        {this.state.sideBarActive ?
          <FilterBar current={current}
                     itemNumbers={itemNumbers}
                     filterText={filterText}
                     sortParam={sortParam}
                     onGetPaginatedData={this.onGetPaginatedData}
                     staffList={filterData.staffs}
                     startDate={startDate}
                     endDate={endDate}
                     selectedStaff={selectedStaff}
                     selectedCustomers={selectedCustomers}
                     selectedPriorities={selectedPriorities}
                     selectedStatuses={selectedStatuses}
                     archive={archive}
                     updateState={this.updateState}
                     customersList={customersList}
                     priorities={filterData.priority}
                     statuses={filterData.status}
                     onToggleShowMoreStaff={this.onToggleShowMoreStaff}
                     onSearchCustomers={this.props.onSearchCustomers}
          />

          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ticketList, customers, commonData}) => {
  const {tickets, totalItems, filterData} = ticketList;
  const {customersList} = customers;
  const {updatingContent} = commonData;
  return {tickets, customersList, totalItems, filterData, updatingContent};
};

export default connect(mapStateToProps, {
  onGetTickets,
  onSearchCustomers,
  onDeleteTicket,
  onGetFilterOptions
})(AllTickets)
;

AllTickets.defaultProps = {
  tickets: [],
  totalItems: null,
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
  filterData: PropTypes.object,
  customersList: PropTypes.array
};
