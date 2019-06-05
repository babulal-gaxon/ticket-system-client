import React, {Component} from "react"
import {Badge, Button, Icon, Input, Select, Table} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Widget from "../../../components/Widget/index";
import {
  onAddDepartment,
  onDeleteDepartment,
  onEditDepartment,
  onGetDepartments,
  onToggleAddDepartment
} from "../../../appRedux/actions/Departments";
import AddNewDepartment from "./AddNewDepartment";
import Auxiliary from "../../../util/Auxiliary";
import Permissions from "../../../util/Permissions";

const ButtonGroup = Button.Group;
const { Option } = Select;


class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      departmentId: 0,
      filterText: "",
      itemNumbers: null,
      current: 1
    }
  };
  componentWillMount() {
    this.props.onGetDepartments();
  };
  onCurrentIncrement = () => {
    this.setState({current: this.state.current + 1});
    console.log("current value", this.state.current)
  };
  onCurrentDecrement = () => {
    if(this.state.current !== 1) {
      this.setState({current: this.state.current - 1});
    }
    else{
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
    this.setState({departmentId: 0});
    this.props.onToggleAddDepartment()
  };
  onEditDepartment = (id) => {
    this.setState({departmentId: id})
    this.props.onToggleAddDepartment()
  };
  onSelectOption = () => {
    return <Select defaultValue="Archive" style={{ width: 120 }}>
      <Option value="Archive">Archive</Option>
      <Option value="Delete">Delete</Option>
      <Option value="Disable">Disable</Option>
      <Option value="Export">Export</Option>
    </Select>
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
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc}</span>
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
          return <Badge>
            {record.status === 1 ? "Active" : "Disabled"}
          </Badge>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span> {Permissions.canDepartmentEdit() ? <i className="icon icon-edit gx-mr-3"
                                                              onClick={() => this.onEditDepartment(record.id)}/> : null}
            {Permissions.canDepartmentDelete() ? <i className="icon icon-trash"
                                                    onClick={() => this.props.onDeleteDepartment(record.id)}/> : null}
          </span>
        },
      },
    ];
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
  onPageChange = page => {
    this.setState({
      current: page,
    });
  };
  render() {
    const dept = this.onFilterData();
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (<Auxiliary>
        <Widget
          title={<span>
            {(Permissions.canDepartmentAdd()) ?
              <Button type="primary" className="h4 gx-text-capitalize gx-mb-0"
                      onClick={this.onAddButtonClick}>
                Add New Department</Button> : null}
            <span>{this.onSelectOption()}</span>
          </span>}
          extra={
            <div className="gx-d-flex gx-align-items-center">
              <Input
                placeholder="Enter keywords to search tickets"
                prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
              value={this.state.filterText}
              onChange={this.onFilterTextChange}/>
              <div className="gx-ml-3">
                {this.onShowItemOptions()}
              </div>
              <div className="gx-ml-3">
                <ButtonGroup className="gx-btn-group-flex">
                  <Button className="gx-mb-0" type="default" onClick ={this.onCurrentDecrement} >
                    <i className="icon icon-long-arrow-left"/>
                  </Button>
                  <Button className="gx-mb-0" type="default" onClick ={this.onCurrentIncrement}>
                    <i className="icon icon-long-arrow-right"/>
                  </Button>
                </ButtonGroup>
              </div>
            </div>}>
          {Permissions.canDepartmentView() ?
            <Table rowSelection={rowSelection} columns={this.onGetTableColumns()} dataSource={dept} className="gx-mb-4"
                   pagination = {{pageSize: this.state.itemNumbers,
              current: this.state.current,
                     total:dept.length,
                     showTotal:((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange}}/> : null}
          <div className="gx-d-flex gx-flex-row">
            {/*<span>Showing {dept.length} of {dept.length}</span>*/}
          </div>
        </Widget>
        {this.props.showAddDepartment ?
          <AddNewDepartment showAddDepartment={this.props.showAddDepartment}
                            onToggleAddDepartment={this.props.onToggleAddDepartment}
                            onAddDepartment={this.props.onAddDepartment}
                            departmentId={this.state.departmentId}
                            onEditDepartment={this.props.onEditDepartment}
                            dept={dept}/> : null}
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({departments}) => {
  const {dept, showAddDepartment} = departments;
  return {dept, showAddDepartment};
};

export default connect(mapStateToProps, {
  onGetDepartments,
  onToggleAddDepartment,
  onAddDepartment,
  onDeleteDepartment,
  onEditDepartment
})(Departments);


Departments.defaultProps = {
  dept: [],
  showAddDepartment: false
};

Departments.propTypes = {
  dept: PropTypes.array,
  showAddDepartment: PropTypes.bool
};

