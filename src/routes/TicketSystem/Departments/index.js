import React, {Component} from "react"
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, message, Popconfirm, Select, Table, Tag, Modal} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Widget from "../../../components/Widget/index";
import {
  onAddDepartment,
  onBulkActiveDepartments,
  onBulkDeleteDepartments,
  onBulkInActiveDepartments,
  onDeleteDepartment,
  onEditDepartment,
  onGetDepartments,
} from "../../../appRedux/actions/Departments";
import AddNewDepartment from "./AddNewDepartment";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      departmentId: 0,
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddDepartment: false,
      selectedDepartments: []
    }
  };
  componentWillMount() {
    this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers);
  };
  onGetDepartmentData = (currentPage, itemsPerPage) => {
    if (Permissions.canDepartmentView()) {
      this.props.onGetDepartments(currentPage, itemsPerPage)
    }
  };
  onToggleAddDepartment = () => {
    this.setState({showAddDepartment: !this.state.showAddDepartment})
  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1}, () => {this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers)});
    } else {
      return null;
    }

  };
  onCurrentDecrement = () => {
    if (this.state.currentPage !== 1) {
      this.setState({currentPage: this.state.currentPage - 1}, () => {this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers)});
    } else {
      return null;
    }

  };
  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value})
  };
  onFilterData = () => {
    return this.props.dept.filter(department => department.name.indexOf(this.state.filterText) !== -1);
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onAddButtonClick = () => {
    this.setState({departmentId: 0, showAddDepartment: true});
  };
  onEditDepartment = (id) => {
    this.setState({departmentId: id, showAddDepartment: true});
  };
  onShowBulkActiveConfirm = () => {
    if(this.state.selectedDepartments.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected departments to ACTIVE?",
        onOk: () => {
          const obj = {
            department_ids: this.state.selectedDepartments
          };
          this.props.onBulkActiveDepartments(obj, this.onStatusChangeMessage);
          this.setState({selectedRowKeys: [], selectedDepartments: []})
        },
        onCancel() {
          console.log('Cancel');
        }
      })
    }
    else {
      confirm({
          title: "Please Select Roles first",
        })
    }
  };
  onShowBulkDisableConfirm = () => {
    if(this.state.selectedDepartments.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected departments to DISABLED?",
        onOk: () => {
          this.props.onBulkInActiveDepartments({department_ids: this.state.selectedDepartments}, this.onStatusChangeMessage);
          this.setState({selectedRowKeys: [], selectedDepartments: []})
        }
      })
    }
      else {
        confirm({
          title: "Please Select Roles first",
        })
    }
  };
  onShowBulkDeleteConfirm = () => {
    if(this.state.selectedDepartments.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected departments?",
        onOk: () => {
          const obj = {
            department_ids: this.state.selectedDepartments
          };
          this.props.onBulkDeleteDepartments(obj, this.onDeleteSuccessMessage);
          this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedDepartments: []});
        }
      })
    }
    else {
         confirm({
          title: "Please Select Roles first",
        })
    }
  };
  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
          Active
        </Menu.Item>
        <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
          Disable
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
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ? "NA" : record.desc}</span>
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
        dataIndex: 'status_id',
        key: 'Status',
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
          return <span> {Permissions.canDepartmentEdit() ? <i className="icon icon-edit gx-mr-3"
                                                              onClick={() => this.onEditDepartment(record.id)}/> : null}
            {Permissions.canDepartmentDelete() ? this.onDeletePopUp(record.id)
              : null}
          </span>
        },
      },
    ];
  };
  onDeleteSuccessMessage = () => {
    message.success('The selected department(s) has been deleted successfully.');
  };
  onStatusChangeMessage = () => {
    message.success('The status of selected departments has been changed successfully.');
  };
  onDeletePopUp = (recordId) => {
    return (
      <Popconfirm
        title="Are you sure to delete this Department?"
        onConfirm={() => {
          this.props.onDeleteDepartment(recordId, this.onDeleteSuccessMessage);
          this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers);
        }}
        okText="Yes"
        cancelText="No">
        <i className="icon icon-trash"/>
      </Popconfirm>
    )
  };
  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };
  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, currentPage:1})
    this.onGetDepartmentData(1, value);
  };
  onPageChange = page => {
    this.setState({
      currentPage: page
    }, () => {this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers)});
  };
  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const dept = this.onFilterData();
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedDepartments: ids, selectedRowKeys: selectedRowKeys})
      }
    };
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4>Departments</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/ticket-system/departments">Ticket System</Link></Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">Departments</Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canDepartmentAdd()) ?
                <Button type="primary" className="gx-btn-lg"
                        onClick={this.onAddButtonClick}>
                  Add New Department</Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                style={{width: 200}}
                placeholder="Enter keywords to search tickets"
                value={this.state.filterText}
                onChange={this.onFilterTextChange}/>
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
          <Table rowSelection={rowSelection} columns={this.onGetTableColumns()} dataSource={dept} className="gx-mb-4"
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.currentPage,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        {this.state.showAddDepartment ?
          <AddNewDepartment showAddDepartment={this.state.showAddDepartment}
                            onToggleAddDepartment={this.onToggleAddDepartment}
                            onAddDepartment={this.props.onAddDepartment}
                            departmentId={this.state.departmentId}
                            onEditDepartment={this.props.onEditDepartment}
                            dept={dept}/> : null}
      </div>
    );
  }
}

const mapStateToProps = ({departments}) => {
  const {dept, totalItems} = departments;
  return {dept, totalItems};
};

export default connect(mapStateToProps, {
  onGetDepartments,
  onAddDepartment,
  onDeleteDepartment,
  onEditDepartment,
  onBulkDeleteDepartments,
  onBulkActiveDepartments,
  onBulkInActiveDepartments
})(Departments);


Departments.defaultProps = {
  dept: [],
  totalItems: null
};

Departments.propTypes = {
  dept: PropTypes.array,
  totalItems: PropTypes.number
};

