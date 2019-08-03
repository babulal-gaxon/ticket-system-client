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
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";

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
        title: <IntlMessages id="common.name"/>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
        },
      },
      {
        title: <IntlMessages id="common.description"/>,
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ?
            <IntlMessages id="common.na"/> : record.desc}</span>
        },
      },
      {
        title: <IntlMessages id="common.createdBy"/>,
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.created_by}</span>
        },
      },
      {
        title: <IntlMessages id="common.status"/>,
        dataIndex: 'status_id',
        key: 'Status',
        render: (text, record) => {
          return <Tag color={record.status === 1 ? "green" : "red"}>
            {record.status === 1 ? <IntlMessages id="common.active"/> : <IntlMessages id="common.disabled"/>}
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
        okText={<IntlMessages id="common.yes"/>}
        cancelText={<IntlMessages id="common.no"/>}>
        <i className="icon icon-trash"/>
      </Popconfirm>
    )
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4"><IntlMessages id="setup.defaultDepartmentList"/></Divider>

        <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.dept}
               className="gx-mb-4" pagination={false}/>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}><IntlMessages
              id="common.previous"/></Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}><IntlMessages
              id="common.next"/></Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+><IntlMessages id="common.addNew"/></Button></div>
        </div>
        {this.state.showAddDepartment ?
          <AddNewDepartment showAddDepartment={this.state.showAddDepartment}
                            onToggleAddDepartment={this.onToggleAddDepartment}
                            onAddDepartment={this.props.onAddDepartment}
                            departmentId={this.state.departmentId}
                            onEditDepartment={this.props.onEditDepartment}
                            dept={this.props.dept}
          /> : null}
      </div>
    );
  }
}


const mapStateToProps = ({departments}) => {
  const {dept} = departments;
  return {dept};
};

export default connect(mapStateToProps, {
  onGetDepartments,
  onAddDepartment,
  onEditDepartment,
  onBulkDeleteDepartments
})(FifthStep);

FifthStep.defaultProps = {
  dept: []
};

FifthStep.propTypes = {
  dept: PropTypes.array,
};
