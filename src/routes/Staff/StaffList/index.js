import React, {Component} from "react"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {
  onBulkDeleteStaff,
  onDisableSupportStaff,
  onGetStaff,
  onGetStaffId
} from "../../../appRedux/actions/SupportStaff";
import {Avatar, Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd";
import InfoView from "../../../components/InfoView";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";


const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddStaff: false,
      selectedStaff: []
    };
  };

  componentDidMount() {
    this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
  }

  onGetStaffDataPaginated = (currentPage, itemsPerPage, filterText) => {
    if (Permissions.canStaffView()) {
      this.props.onGetStaff(currentPage, itemsPerPage, filterText);
    }
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1},
        () => {
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
        });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.currentPage > 1) {
      this.setState({currentPage: this.state.currentPage - 1},
        () => {
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
        });
    } else {
      return null;
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetStaffDataPaginated(1, this.state.itemNumbers, this.state.filterText)
    })
  };

  onAddButtonClick = () => {
    this.props.onGetStaffId(null);
    this.props.history.push('/staff/add-new-member')
  };


  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedStaff.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Staffs?",
        onOk: () => {
          this.props.onBulkDeleteStaff({ids: this.state.selectedStaff});
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedStaff: []});
        }
      })
    } else {
      confirm({
        title: "Please Select Staffs first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowBulkDeleteConfirm}>
          Archive
        </Menu.Item>
        {(Permissions.canStaffDelete()) ?
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

  staffRowData = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">
             {record.avatar ?
               <Avatar className="gx-mr-3 gx-size-50" src={record.avatar.src}/> :
               <Avatar className="gx-mr-3 gx-size-50"
                       style={{backgroundColor: '#f56a00'}}>{record.first_name[0].toUpperCase()}</Avatar>}
            {record.first_name + " " + record.last_name} </span>
        }
      },
      {
        title: 'Hourly Rate',
        dataIndex: 'hourlyRate',
        key: 'hourlyRate',
        render: (text, record) => {
          return <span
            className="gx-email gx-d-inline-block gx-mr-2"
            style={{color: record.hourly_rate === null ? "red" : ""}}>
            {record.hourly_rate === null ? "NA" : `$${record.hourly_rate}/Hour`}</span>
        },
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">
            {record.departments.length !== 0 ? record.departments.map(department => {
              return department.name
            }).join() : "NA"}
            </span>
        },
      },
      {
        title: 'Designation',
        dataIndex: 'designation',
        key: 'designation',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2"
                       style={{color: record.designation === null ? "red" : ""}}>
            {record.designation === null ? "NA" : record.designation}</span>
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

  onDisableStaff = (staffId) => {
    const selectedStaff = this.props.staffList.find(staff => staff.id === staffId);
    selectedStaff.account_status = 0;
    this.props.onDisableSupportStaff(selectedStaff)
  };

  onShowRowDropdown = (staffId) => {
    const menu = (
      <Menu>
        {(Permissions.canStaffEdit()) ?
          <Menu.Item key="2" onClick={() => {
            this.props.onGetStaffId(staffId);
            this.props.history.push('/staff/add-new-member')
          }}>
            Edit
          </Menu.Item> : null
        }
        {(Permissions.canStaffEdit()) ?
          <Menu.Item key="3">
            <Popconfirm
              title="Are you sure to Disable this Staff?"
              onConfirm={() => {
                this.onDisableStaff(staffId)
              }}
              okText="Yes"
              cancelText="No">
              Disable
            </Popconfirm>
          </Menu.Item> : null
        }
        <Menu.Divider/>
        {(Permissions.canStaffDelete()) ?
          <Menu.Item key="4">
            <Popconfirm
              title="Are you sure to delete this Staff?"
              onConfirm={() => {
                this.props.onBulkDeleteStaff({ids: [staffId]});
                this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
              }}
              okText="Yes"
              cancelText="No">
              Delete
            </Popconfirm>
          </Menu.Item> : null
        }
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h"/>
      </Dropdown>
    )
  };

  onSelectStaff = (currentMember) => {
    this.props.history.push(`/staff/member-detail?id=${currentMember.id}`)
  };

  onPageChange = page => {
    this.setState({
      currentPage: page,
    }, () => {
      this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
    });
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
      this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
    })
  };

  onBackToList = () => {
    this.setState({currentMember: null})
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const staffList = this.props.staffList;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedStaff: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-font-weight-bold">Staffs</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/staff/all-members" className="gx-text-primary">Staffs</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canStaffAdd() ?
                <Button type="primary" className="gx-btn-lg"
                        onClick={this.onAddButtonClick}>
                  Add New Staff</Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder=" Search Staff Here"
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
                style={{width: 350}}
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
          <Table rowKey="id" rowSelection={rowSelection} columns={this.staffRowData()}
                 dataSource={staffList}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.currentPage,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive gx-mb-4"
                 onRow={(record) => ({
                   onClick: () => {
                     if (Permissions.canViewStaffDetail()) {
                       this.onSelectStaff(record)
                     }
                   }
                 })}/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        <InfoView/>
      </div>
    );
  }
}


const mapStateToProps = ({supportStaff}) => {
  const {staffList, totalItems} = supportStaff;
  return {staffList, totalItems};
};


export default connect(mapStateToProps, {
  onGetStaff,
  onGetStaffId,
  onBulkDeleteStaff,
  onDisableSupportStaff
})(StaffList);

StaffList.defaultProps = {
  staffList: [],
  totalItems: null
};

StaffList.propTypes = {
  staffList: PropTypes.array,
  totalItems: PropTypes.number,
  onGetStaff: PropTypes.func,
  onGetStaffId: PropTypes.func,
  onBulkDeleteStaff: PropTypes.func,
  onDisableSupportStaff: PropTypes.func
};