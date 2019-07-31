import React, {Component} from "react"
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd/lib/index";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Widget from "../../../components/Widget";
import {
  onAddDepartment,
  onBulkActiveDepartments,
  onBulkDeleteDepartments,
  onBulkInActiveDepartments,
  onEditDepartment,
  onGetDepartments,
} from "../../../appRedux/actions/Departments";
import AddNewDepartment from "./AddNewDepartment";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";
import DepartmentsRow from "./DepartmentsRow";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      currentDepartment: null,
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddDepartment: false,
      selectedDepartments: []
    };
    this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
  };

  onGetDepartmentData = (currentPage, itemsPerPage, filterData, updatingContent) => {
    if (Permissions.canDepartmentView()) {
      this.props.onGetDepartments(currentPage, itemsPerPage, filterData, updatingContent)
    }
  };

  onToggleAddDepartment = () => {
    this.setState({showAddDepartment: !this.state.showAddDepartment})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1}, () => {
        this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.currentPage > 1) {
      this.setState({currentPage: this.state.currentPage - 1}, () => {
        this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetDepartmentData(1, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({currentDepartment: null, showAddDepartment: true});
  };

  onEditDepartment = (department) => {
    this.setState({currentDepartment: department, showAddDepartment: true});
  };

  onShowBulkActiveConfirm = () => {
    if (this.state.selectedDepartments.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected departments to ACTIVE?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedDepartments
          };
          this.props.onBulkActiveDepartments(obj);
          this.setState({selectedRowKeys: [], selectedDepartments: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Labels first",
      })
    }
  };

  onShowBulkDisableConfirm = () => {
    if (this.state.selectedDepartments.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected departments to DISABLED?",
        onOk: () => {
          this.props.onBulkInActiveDepartments({ids: this.state.selectedDepartments});
          this.setState({selectedRowKeys: [], selectedDepartments: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Department(s) first",
      })
    }
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedDepartments.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected departments?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedDepartments
          };
          this.props.onBulkDeleteDepartments(obj);
          this.setState({selectedRowKeys: [], selectedDepartments: []});
          this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers, this.state.filterText)
        }
      })
    } else {
      confirm({
        title: "Please Select Department(s) first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canDepartmentEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            Active
          </Menu.Item> : null
        }
        {Permissions.canDepartmentEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            Disable
          </Menu.Item> : null
        }
        {Permissions.canDepartmentDelete() ?
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



  onDeletePopUp = (recordId) => {
    return (
      <Popconfirm
        title="Are you sure to delete this Department?"
        onConfirm={() => {
          this.props.onBulkDeleteDepartments({ids: [recordId]});
          this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
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
    this.setState({itemNumbers: value, currentPage: 1}, () => {
      this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onPageChange = page => {
    this.setState({currentPage: page}, () => {
      this.onGetDepartmentData(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const dept = this.props.dept;
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
          <h4 className="gx-widget-heading">Departments</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>Ticket System</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/setup/departments" className="gx-text-primary">Departments</Link></Breadcrumb.Item>
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
                style={{width: 350}}
                placeholder="Enter keywords to search Departments"
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
          <Table rowKey="id" rowSelection={rowSelection} columns={DepartmentsRow(this)} dataSource={dept}
                 className="gx-mb-4" loading={this.props.updatingContent}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.currentPage,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
        </Widget>
        {this.state.showAddDepartment ?
          <AddNewDepartment showAddDepartment={this.state.showAddDepartment}
                            onToggleAddDepartment={this.onToggleAddDepartment}
                            onAddDepartment={this.props.onAddDepartment}
                            currentDepartment={this.state.currentDepartment}
                            onEditDepartment={this.props.onEditDepartment}
                            /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({departments, commonData}) => {
  const {dept, totalItems} = departments;
  const {updatingContent} = commonData;
  return {dept, totalItems, updatingContent};
};

export default connect(mapStateToProps, {
  onGetDepartments,
  onAddDepartment,
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

