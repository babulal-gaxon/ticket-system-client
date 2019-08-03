import React, {Component} from "react"
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table} from "antd/lib/index";
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
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

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
    const {messages} = this.props.intl;
    if (this.state.selectedDepartments.length !== 0) {
      confirm({
        title: messages["departments.message.active"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedDepartments
          };
          this.props.onBulkActiveDepartments(obj);
          this.setState({selectedRowKeys: [], selectedDepartments: []})
        }
      })
    } else {
      Modal.info({
        title: messages["departments.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDisableConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedDepartments.length !== 0) {
      confirm({
        title: messages["departments.message.disable"],
        onOk: () => {
          this.props.onBulkInActiveDepartments({ids: this.state.selectedDepartments});
          this.setState({selectedRowKeys: [], selectedDepartments: []})
        }
      })
    } else {
      Modal.info({
        title: messages["departments.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedDepartments.length !== 0) {
      confirm({
        title: messages["departments.message.delete"],
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
      Modal.info({
        title: messages["departments.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canDepartmentEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            <IntlMessages id="common.active"/>
          </Menu.Item> : null
        }
        {Permissions.canDepartmentEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            <IntlMessages id="common.disable"/>
          </Menu.Item> : null
        }
        {Permissions.canDepartmentDelete() ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            <IntlMessages id="common.delete"/>
          </Menu.Item> : null
        }
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <IntlMessages id="common.bulkActions"/> <Icon type="down"/>
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
        okText={<IntlMessages id="common.yes"/>}
        cancelText={<IntlMessages id="common.no"/>}>
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
    const {messages} = this.props.intl;
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
          <h4 className="gx-widget-heading"><IntlMessages id="departments.title"/></h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item><IntlMessages id="common.ticketSystem"/></Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/setup/departments" className="gx-text-primary"><IntlMessages id="departments.title"/></Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canDepartmentAdd()) ?
                <Button type="primary" className="gx-btn-lg"
                        onClick={this.onAddButtonClick}>
                  <IntlMessages id="departments.new"/></Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                style={{width: 350}}
                placeholder={messages["departments.search.placeholder"]}
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
                   showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                     <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                     <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
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
})(injectIntl(Departments));


Departments.defaultProps = {
  dept: [],
  totalItems: null
};

Departments.propTypes = {
  dept: PropTypes.array,
  totalItems: PropTypes.number
};

