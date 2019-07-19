import React, {Component} from 'react';
import {Button, Divider, Popconfirm, Table, Tag} from "antd/lib/index";
import AddNewDepartment from "../../SetUp/Departments/AddNewDepartment";
import {connect} from "react-redux";
import {
  onAddDepartment,
  onBulkDeleteDepartments,
  onEditDepartment,
  onGetDepartments
} from "../../../appRedux/actions/Departments";
import InfoView from "../../../components/InfoView";

class FifthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddDepartment: false,
      departmentId: null,
    }
  }

  componentDidMount() {
    this.props.onGetDepartments();
  }

  onToggleAddDepartment = () => {
    this.setState({showAddDepartment: !this.state.showAddDepartment})
  };

  onAddButtonClick = () => {
    this.setState({departmentId: null, showAddDepartment: true});
  };

  onEditDepartment = (id) => {
    this.setState({departmentId: id, showAddDepartment: true});
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
          return <span> <i className="icon icon-edit gx-mr-3"
                           onClick={() => this.onEditDepartment(record.id)}/>
            {this.onDeletePopUp(record.id)}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return (
      <Popconfirm
        title="Are you sure to delete this Department?"
        onConfirm={() => {
          this.props.onBulkDeleteDepartments({ids: [recordId]});
          this.props.onGetDepartments();
        }}
        okText="Yes"
        cancelText="No">
        <i className="icon icon-trash"/>
      </Popconfirm>
    )
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4">Default Department List</Divider>

        <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.dept}
               className="gx-mb-4" pagination={false}/>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
        </div>
        {this.state.showAddDepartment ?
          <AddNewDepartment showAddDepartment={this.state.showAddDepartment}
                            onToggleAddDepartment={this.onToggleAddDepartment}
                            onAddDepartment={this.props.onAddDepartment}
                            departmentId={this.state.departmentId}
                            onEditDepartment={this.props.onEditDepartment}
                            dept={this.props.dept}
          /> : null}
        <InfoView/>
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
  onEditDepartment,
  onBulkDeleteDepartments
})(FifthStep);