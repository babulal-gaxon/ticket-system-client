import React, {Component} from "react"
import Widget from "../../../components/Widget/index";
import {Button, Icon, Input, Table,Badge} from "antd";
import {connect} from "react-redux";
import {
  onAddDepartment, onDeleteDepartment, onGetDepartments,
  onToggleAddDepartment
} from "../../../appRedux/actions/Departments";
import AddNewDepartment from "./AddNewDepartment";


class Departments extends Component {
  constructor(props) {
    super(props);
    this.state= {
      selectedRowKeys: [],
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  componentWillMount() {
    this.props.onGetDepartments();
  }

  render() {
    const ButtonGroup = Button.Group;
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const columns = [

      {
        title: 'ID',
        dataIndex: 'id',
        key:'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.id}</span>

        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key:'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
        },

      },
      {
        title: 'Description',
        dataIndex: 'description',
        key:'description',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc}</span>
        },
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key:'createdBy',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.user_id}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key:'Status',
        render: (text, record) => {
          return <Badge>
            {record.status}
          </Badge>
        },
      },
      {
        title: '',
        dataIndex: '',
        key:'empty',
        render: (text, record) => {
          return <span> <i className="icon icon-edit gx-mr-3"/>
            <i className="icon icon-trash" onClick = {() => this.props.onDeleteDepartment(record.id)}/>
          </span>
        },
      },
]
    return (

      <Widget
        title={<div>
          <Button type="primary" className="h4 gx-text-capitalize gx-mb-0" onClick = {this.props.onToggleAddDepartment}>
            Add New Department</Button>


          {this.props.showAddDepartment ?
            <AddNewDepartment showAddDepartment ={this.props.showAddDepartment}
                              onToggleAddDepartment={this.props.onToggleAddDepartment}
                          onAddDepartment={this.props.onAddDepartment}/> : null}
        </div>} extra={
        <div className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
          <Input
            placeholder="Enter keywords to search tickets"
            prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
          />
          <ButtonGroup>
            <Button type="default" >
              <i className="icon icon-long-arrow-left"/>
            </Button>
            <Button type="default" >
              <i className="icon icon-long-arrow-right"/>
            </Button>
          </ButtonGroup>
        </div>
      } >
          <Table  rowSelection={rowSelection} columns={columns} dataSource={this.props.dept}
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
  }


export default connect(mapStateToProps, {
  onGetDepartments,
  onToggleAddDepartment,
  onAddDepartment,
  onDeleteDepartment
})(Departments);
