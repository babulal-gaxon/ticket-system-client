import React, {Component} from "react"
import {Badge, Button, Icon, Input, Table} from "antd";
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

const ButtonGroup = Button.Group;

class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      departmentId: 0
    }
  };
  componentWillMount() {
    this.props.onGetDepartments();
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
  onGetTableColumns = () => {
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
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.user_id}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'Status',
        render: (text, record) => {
          return <Badge>
            {record.status}
          </Badge>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span> <i className="icon icon-edit gx-mr-3" onClick={() => this.onEditDepartment(record.id)}/>
            <i className="icon icon-trash" onClick={() => this.props.onDeleteDepartment(record.id)}/>
          </span>
        },
      },
    ];
  };
  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <Widget
        title={<div>
          <Button type="primary" className="h4 gx-text-capitalize gx-mb-0" onClick={this.onAddButtonClick}>
            Add New Department</Button>
          {this.props.showAddDepartment ?
            <AddNewDepartment showAddDepartment={this.props.showAddDepartment}
                              onToggleAddDepartment={this.props.onToggleAddDepartment}
                              onAddDepartment={this.props.onAddDepartment}
                              departmentId= {this.state.departmentId}
                              onEditDepartment={this.props.onEditDepartment}
                              dept={this.props.dept}/> : null}
        </div>}
        extra={
        <div className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
          <Input
            placeholder="Enter keywords to search tickets"
            prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
          <ButtonGroup>
            <Button type="default">
              <i className="icon icon-long-arrow-left"/>
            </Button>
            <Button type="default">
              <i className="icon icon-long-arrow-right"/>
            </Button>
          </ButtonGroup>
        </div>
        }>
        <Table rowSelection={rowSelection} columns={this.onGetTableColumns()} dataSource={this.props.dept}
               className="gx-mb-4"/>
        <div className="gx-d-flex gx-flex-row">
        </div>
        <div>
        </div>
      </Widget>
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

