import React, {Component} from "react"
import {connect} from "react-redux";

import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {
  onAddSupportStaff,
  onBulkDeleteStaff, onDisableSupportStaff,
  onEditSupportStaff,
  onGetStaff,
  onGetStaffId
} from "../../../appRedux/actions/SupportStaff";
import StaffDetail from "./StaffDetail";
import {
  Breadcrumb,
  Avatar,
  Button,
  Dropdown,
  Input,
  Menu,
  Popconfirm,
  Table,
  Tag,
  Select,
  Modal,
  Icon,
  message
} from "antd";
import InfoView from "../../../components/InfoView";


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
      currentMember: null,
      selectedStaff: []
    };
  };

  componentWillMount() {
    this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers);
  };

  onGetStaffDataPaginated = (currentPage, itemsPerPage) => {
    this.props.onGetStaff(currentPage, itemsPerPage);
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    console.log("pages", pages)
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1},() => {this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers)});
    } else {
      return null;
    }
  };
  onCurrentDecrement = () => {
    if (this.state.currentPage !== 1) {
      this.setState({currentPage: this.state.currentPage - 1}, () => {this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers)});
    } else {
      return null;
    }
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value})
  };
  onAddButtonClick = () => {
    this.props.onGetStaffId(0);
    this.props.history.push('/staff/add-new-member')
  };
  onFilterData = () => {
    console.log("in filter Data", this.props.staffList);
    return this.props.staffList.filter(staff => {
      const name = staff.first_name + " " + staff.last_name;
      if(name.indexOf(this.state.filterText) !== -1) {
        return staff
      }
    });
  };
  onDeleteSuccessMessage = () => {
    message.success('The selected Staff has been deleted successfully.');
  };
  onShowBulkDeleteConfirm = () => {
    if(this.state.selectedStaff.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Staffs?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedStaff
          };
          this.props.onBulkDeleteStaff(obj, this.onDeleteSuccessMessage);
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedStaff: []});
        }
      })
    }
    else {
      confirm({
        title: "Please Select Staffs first",
      })
    }
  };
    onSelectOption = () => {
      const menu = (
        <Menu>
          <Menu.Item key="1">
            Archive
          </Menu.Item>
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            Delete
          </Menu.Item>
        </Menu>
      );
      return <Dropdown overlay={menu} trigger={['click']}>
        <Button>
          Bulk Actions <Icon type="down" />
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
             <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
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
            style={{color:record.hourly_rate === null ? "red" : "" }}>{record.hourly_rate === null ? "NA" : `$${record.hourly_rate}/Hour`}</span>
        },
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: (text, record) => {
          console.log("record departments", record.departments, record.id);
          return <span className="gx-email gx-d-inline-block gx-mr-2">
            {record.departments.length !==0 ? record.departments.map(department => {
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
          return <span className="gx-email gx-d-inline-block gx-mr-2" style={{color:record.designation === null ? "red" : "" }}>
            {record.designation === null ? "NA" : record.designation}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return <Tag color={record.account_status === 1 ? "green" : "red"}>
            {record.account_status === 1 ? "Active" : "Disabled"}
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
  onStaffDisableSuccess = () => {
    message.success('The status of Staff has been changed to Disable successfully.');
  };
  onDisableStaff = (staffId) => {
    const selectedStaff = this.props.staffList.find(staff => staff.id === staffId);
    selectedStaff.account_status = 0;
    this.props.onDisableSupportStaff(selectedStaff, this.onStaffDisableSuccess)
  };
  onShowRowDropdown = (staffId) => {
    const menu = (
      <Menu>
        <Menu.Item key="2" onClick={() => {
          this.props.onGetStaffId(staffId);
          this.props.history.push('/staff/add-new-member')
        }}>
          Edit
        </Menu.Item>
        <Menu.Item key="3" onClick = {() => {this.onDisableStaff(staffId)}}>
          Disable
        </Menu.Item>
        <Menu.Item key="3">
          Notes
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure to delete this Staff?"
            onConfirm={() => {
              this.props.onBulkDeleteStaff({ids:[staffId]}, this.onDeleteSuccessMessage)
              this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers)}}
            okText="Yes"
            cancelText="No">
            Delete
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
  onSelectStaff = (currentMember) => {
    this.setState({currentMember: currentMember})
  };
  onPageChange = page => {
    this.setState({
      currentPage: page,
    },() => {this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers)});
  };
  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };
  onDropdownChange = (value) => {
    this.setState({itemNumbers: value}, () => {this.onGetStaffDataPaginated(1, this.state.itemNumbers)})
  };
  onBackToList = () => {
    this.setState({currentMember: null})
  };
  render() {
    const selectedRowKeys =  this.state.selectedRowKeys;
    const staffList = this.onFilterData();
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedStaff:ids, selectedRowKeys: selectedRowKeys})
      }};
    return (
      <div className="gx-main-content">
        {this.state.currentMember === null ?
          <Widget styleName="gx-card-filter">
            <h4>Staffs</h4>
            <Breadcrumb className="gx-mb-3">
              <Breadcrumb.Item>Staffs</Breadcrumb.Item>
            </Breadcrumb>
            <div className="gx-d-flex gx-justify-content-between">
              <div className="gx-d-flex">
            <Button type="primary" className="gx-btn-lg"
                    onClick={this.onAddButtonClick}>
              Add New Staff</Button>
            <span>{this.onSelectOption()}</span>
              </div>
              <div className="gx-d-flex">
                <Search
                  placeholder=" Search Staff Here"
                  value={this.state.filterText}
                  onChange={this.onFilterTextChange}
                  style={{width: 200}}
                />
                <div className="gx-ml-3">
                  {this.onShowItemOptions()}
                </div>
                  <ButtonGroup className="gx-ml-3">
                    <Button type="default" onClick={this.onCurrentDecrement}>
                      <i className="icon icon-long-arrow-left"/>
                    </Button>
                    <Button  type="default" onClick={this.onCurrentIncrement}>
                      <i className="icon icon-long-arrow-right"/>
                    </Button>
                  </ButtonGroup>
                </div>
              </div>

            <Table rowSelection={rowSelection} columns={this.staffRowData()}
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
                     onClick: () => this.onSelectStaff(record)
                   })}/>
            <div className="gx-d-flex gx-flex-row">
            </div>
          </Widget> : <StaffDetail staff={this.state.currentMember} onBackToList={this.onBackToList}
                                   onGetStaffId={this.props.onGetStaffId} history={this.props.history}/>}
                                   <InfoView />
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
  onAddSupportStaff,
  onEditSupportStaff,
  onBulkDeleteStaff,
  onDisableSupportStaff
})(StaffList);

StaffList.defaultProps = {
  staffList: []
};

StaffList.propTypes = {
  staffList: PropTypes.array
};