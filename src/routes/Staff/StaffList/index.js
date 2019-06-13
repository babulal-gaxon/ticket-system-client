import React, {Component} from "react"
import {Avatar, Button, Dropdown, Icon, Input, Menu, Popconfirm, Select, Table, Tag} from "antd/lib/index";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {
  onAddSupportStaff,
  onDeleteSupportStaff,
  onEditSupportStaff,
  onGetStaff,
  onGetStaffId
} from "../../../appRedux/actions/SupportStaff";
import StaffDetail from "./StaffDetail";
import {Breadcrumb} from "antd";


const ButtonGroup = Button.Group;
const {Option} = Select;

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddStaff: false,
      currentMember: null
    };
  };

  componentWillMount() {
    this.props.onGetStaff();
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.staffList.length / this.state.itemNumbers);
    console.log("pages", pages)
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1});
    } else {
      return null;
    }
  };
  onCurrentDecrement = () => {
    if (this.state.currentPage !== 1) {
      this.setState({currentPage: this.state.currentPage - 1});
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
    return this.props.staffList.filter(staff => staff.first_name.indexOf(this.state.filterText) !== -1);
  };
  onSelectOption = () => {
    return <Select defaultValue="Archive" style={{width: 120}}>
      <Option value="Archive">Archive</Option>
      <Option value="Delete">Delete</Option>
      <Option value="Disable">Disable</Option>
      <Option value="Export">Export</Option>
    </Select>
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
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.hourly_rate}</span>
        },
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: (text, record) => {
          console.log("one record", record)
          return <span className="gx-email gx-d-inline-block gx-mr-2">
            {record.departments.map(department => {
              return department.name
            }).join()}
            </span>
        },
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.designation}</span>
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
  onShowRowDropdown = (staffId) => {
    const menu = (
      <Menu>
        <Menu.Item key="2" onClick={() => {
          this.props.onGetStaffId(staffId);
          this.props.history.push('/staff/add-new-member')
        }}>
          Edit
        </Menu.Item>
        <Menu.Item key="3">
          Disable
        </Menu.Item>
        <Menu.Item key="3">
          Notes
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure delete this Ticket?"
            onConfirm={() => this.props.onDeleteSupportStaff(staffId)}
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
    this.setState({itemNumbers: value})
  };
  onBackToList = () => {
    this.setState({currentMember: null})
  };

  render() {
    const staffList = this.onFilterData();
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    console.log("in Show staffList", this.props.staffList);
    return (
      <div className="gx-main-content">
        {this.state.currentMember === null ?
          <Widget
            title={<span>
            <h4>Staffs</h4>
            <Breadcrumb>
    <Breadcrumb.Item>Staffs</Breadcrumb.Item>
  </Breadcrumb>
            <Button type="primary" className="h4 gx-text-capitalize gx-mb-0 gx-mt-4"
                    onClick={this.onAddButtonClick}>
              Add New Staff</Button>
            <span className="gx-mt-4">{this.onSelectOption()}</span>
          </span>}
            extra={
              <div className="gx-d-flex gx-align-items-center">
                <Input
                  placeholder="Enter keywords to search Staff"
                  prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                  value={this.state.filterText}
                  onChange={this.onFilterTextChange}
                />
                <div className="gx-ml-3">
                  {this.onShowItemOptions()}
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

            <Table rowSelection={rowSelection} columns={this.staffRowData()}
                   dataSource={staffList}
                   pagination={{
                     pageSize: this.state.itemNumbers,
                     current: this.state.currentPage,
                     total: staffList.length,
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
      </div>
    );
  }
}


const mapStateToProps = ({supportStaff}) => {
  const {staffList} = supportStaff;
  return {staffList};
};


export default connect(mapStateToProps, {
  onGetStaff,
  onGetStaffId,
  onAddSupportStaff,
  onEditSupportStaff,
  onDeleteSupportStaff
})(StaffList);

StaffList.defaultProps = {
  staffList: []
};

StaffList.propTypes = {
  staffList: PropTypes.array
};