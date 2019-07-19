import React, {Component} from "react"
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd/lib/index";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {
  onAddTicketStatus,
  onBulkActiveStatuses,
  onBulkDeleteStatuses,
  onBulkInActiveStatuses,
  onEditTicketStatus,
  onGetTicketStatus
} from "../../../appRedux/actions/TicketStatuses";
import AddNewStatus from "./AddNewStatus";
import Widget from "../../../components/Widget";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;


class TicketStatuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      statusId: null,
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddStatus: false,
      selectedStatus: []
    };
  };

  componentDidMount() {
    this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText);
  }

  onGetStatusData = (currentPage, itemsPerPage, filterText) => {
    if (Permissions.canStatusView()) {
      this.props.onGetTicketStatus(currentPage, itemsPerPage, filterText);
    }
  };

  onToggleAddStatus = () => {
    this.setState({showAddStatus: !this.state.showAddStatus})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText)
      });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value} ,() => {
      this.onGetStatusData(1, this.state.itemNumbers, this.state.filterText)
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({statusId: null, showAddStatus: true});
  };

  onEditStatus = (id) => {
    this.setState({statusId: id, showAddStatus: true});
  };

  onShowBulkActiveConfirm = () => {
    if (this.state.selectedStatus.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Statuses to ACTIVE?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedStatus
          };
          this.props.onBulkActiveStatuses(obj);
          this.setState({selectedRowKeys: [], selectedStatus: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Statuses first",
      })
    }
  };

  onShowBulkDisableConfirm = () => {
    if (this.state.selectedStatus.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Statuses to DISABLED?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedStatus
          };
          this.props.onBulkInActiveStatuses(obj);
          this.setState({selectedRowKeys: [], selectedStatus: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Statuses first",
      })
    }
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedStatus.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Statuses?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedStatus
          };
          this.props.onBulkDeleteStatuses(obj);
          this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText);
          this.setState({selectedRowKeys: [], selectedStatus: []});
        }
      })
    } else {
      confirm({
        title: "Please Select Statuses first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canStatusEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            Active
          </Menu.Item> : null
        }
        {Permissions.canStatusEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            Disable
          </Menu.Item> : null
        }
        {Permissions.canStatusDelete() ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            Delete
          </Menu.Item> : null
        }
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onGetTableColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
        },
      },
      {
        title: 'Number of Orders',
        dataIndex: 'numberOfOrders',
        key: 'numberOfOrders',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.tickets_count}</span>
        },
      },
      {
        title: 'Color Code',
        dataIndex: 'colorCode',
        key: 'colorCode',
        render: (text, record) => {
          return <Tag color={record.color_code}>
            <span style={{color: record.color_code}}>{record.color_code}</span></Tag>
        },
      },
      {
        title: 'Default',
        dataIndex: 'default',
        key: 'default',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2"
                       style={{color: record.is_default === 1 ? "blue" : ""}}>{
            record.is_default === 1 ? "Default" : "Set Default"}</span>
        },
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.created_by}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return <Tag color={record.status === 1 ? "green" : "red"}>
            {record.status === 1 ? "Active" : "Disabled"}
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span> {Permissions.canStatusEdit() ? <i className="icon icon-edit gx-mr-3"
                                                          onClick={() => this.onEditStatus(record.id)}/> : null}
            {Permissions.canStatusDelete() ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Status?"
      onConfirm={() => {
        this.props.onBulkDeleteStatuses({ids: [recordId]});
        this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText);
      }}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  onPageChange = page => {
    this.setState({
      current: page
    }, () => {
      this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText)
    })
  };

  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText)
    });
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const statuses = this.props.statuses;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedStatus: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-font-weight-bold">Ticket Status</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>Ticket System</Breadcrumb.Item>
          <Breadcrumb.Item >
            <Link to="/setup/ticket-Statuses" className="gx-text-primary">Ticket Status</Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canStatusAdd() ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  Add New Status</Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Enter keywords to search Status"
                style={{width: 350}}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
              />
              <div className="gx-ml-3">
                {this.onShowItemOptions()}
              </div>
              <ButtonGroup className="gx-ml-3">
                <Button type="default" onClick={this.onCurrentDecrement}>
                  <i className="icon icon-long-arrow-left"/>
                </Button>
                <Button type="default" onClick={this.onCurrentIncrement}>
                  <i className="icon icon-long-arrow-right"/>
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                 dataSource={statuses} className="gx-mb-4"
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
        </Widget>
        {this.state.showAddStatus ?
          <AddNewStatus showAddStatus={this.state.showAddStatus}
                        onToggleAddStatus={this.onToggleAddStatus}
                        onAddTicketStatus={this.props.onAddTicketStatus}
                        statusId={this.state.statusId}
                        onEditTicketStatus={this.props.onEditTicketStatus}
                        statuses={statuses}/> : null}
        <InfoView/>
      </div>
    );
  }
}

const mapStateToProps = ({ticketStatuses}) => {
  const {statuses, totalItems} = ticketStatuses;
  return {statuses, totalItems};
};

export default connect(mapStateToProps, {
  onGetTicketStatus,
  onAddTicketStatus,
  onEditTicketStatus,
  onBulkActiveStatuses,
  onBulkInActiveStatuses,
  onBulkDeleteStatuses
})(TicketStatuses);


TicketStatuses.defaultProps = {
  statuses: [],
  totalItems: null
};

TicketStatuses.propTypes = {
  statuses: PropTypes.array,
  totalItems: PropTypes.number
};