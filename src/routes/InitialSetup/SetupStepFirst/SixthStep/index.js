import React, {Component} from 'react';
import {Avatar, Button, Popconfirm, Table} from "antd/lib/index";
import AddNewStaff from "./AddNewStaff";
import Widget from "../../../../components/Widget";
import {connect} from "react-redux";
import {
  onAddSupportStaff,
  onBulkDeleteStaff,
  onEditSupportStaff,
  onGetStaff
} from "../../../../appRedux/actions/SupportStaff";
import {onGetDepartments} from "../../../../appRedux/actions/Departments";
import InfoView from "../../../../components/InfoView";
import {fetchError, fetchStart, fetchSuccess} from "../../../../appRedux/actions";

class SixthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      staffId: null
    }
  }

  componentDidMount() {
    this.props.onGetStaff();
    this.props.onGetDepartments();
  }

  onToggleAddModal = () => {
    this.setState({showAddModal: !this.state.showAddModal})
  };

  onAddButtonClick = () => {
    this.setState({staffId: null, showAddModal: true});
  };

  onEditStaff = (id) => {
    this.setState({staffId: id, showAddModal: true});
  };

  onGetTableColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">
             {record.avatar ?
               <Avatar className="gx-mr-3 gx-size-50" src={record.avatar.src}/> :
               <Avatar className="gx-mr-3 gx-size-50"
                       style={{backgroundColor: '#f56a00'}}>{record.first_name[0].toUpperCase()}</Avatar>}
            {record.first_name + " " + record.last_name} </span>
        }
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">
            {record.departments.length !== 0 ? record.departments.map(department => {
              return department.name
            }).join() : "NA"}
            </span>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span>  <i className="icon icon-edit gx-mr-3"
                            onClick={() => this.onEditStaff(record.id)}/>
            {this.onDeletePopUp(record.id)}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Staff?"
      onConfirm={() => {
        this.props.onBulkDeleteStaff({ids: [recordId]});
        this.props.onGetStaff();
      }}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  render() {
    const {showAddModal} = this.state;
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        {this.props.staffList.length === 0 ?
          <Widget styleName="gx-card-filter gx-mr-2">
            <h3 className="gx-font-weight-bold gx-my-4">No staff member found. Get start to add your staff now!</h3>
            <Button type="primary" onClick={this.onAddButtonClick}>Add New</Button>
          </Widget> :
          <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.staffList}
                 className="gx-mb-4" pagination={false}/>}
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
        </div>
        {showAddModal ?
          <AddNewStaff showAddModal={showAddModal}
                       onToggleAddModal={this.onToggleAddModal}
                       onMoveToNextStep={this.props.onMoveToNextStep}
                       staffList={this.props.staffList}
                       dept={this.props.dept}
                       staffId={this.state.staffId}
                       onEditSupportStaff={this.props.onEditSupportStaff}
                       onAddSupportStaff={this.props.onAddSupportStaff}
                       fetchSuccess={this.props.fetchSuccess}
                       fetchStart={this.props.fetchStart}
                       fetchError={this.props.fetchError}/> : null}
        <InfoView/>
      </div>
    );
  }
}


const mapStateToProps = ({departments, supportStaff}) => {
  const {staffList} = supportStaff;
  const {dept} = departments;
  return {dept, staffList};
};

export default connect(mapStateToProps, {
  onEditSupportStaff,
  onAddSupportStaff,
  onGetDepartments,
  onBulkDeleteStaff,
  onGetStaff,
  fetchSuccess,
  fetchStart,
  fetchError
})(SixthStep);