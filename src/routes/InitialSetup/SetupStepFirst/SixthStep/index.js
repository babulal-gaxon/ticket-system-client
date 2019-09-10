import React, {Component} from 'react';
import {Avatar, Button, Table, Modal} from "antd";
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
import {fetchError, fetchStart, fetchSuccess} from "../../../../appRedux/actions";
import PropTypes from "prop-types";
import IntlMessages from "../../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const confirm = Modal.confirm;

class SixthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      selectedStaff: null
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
    this.setState({selectedStaff: null, showAddModal: true});
  };

  onEditStaff = (staff) => {
    this.setState({selectedStaff: staff, showAddModal: true});
  };

  onGetTableColumns = () => {
    return [
      {
        title: <IntlMessages id="common.name"/>,
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
        title: <IntlMessages id="common.departmentHeading"/>,
        dataIndex: 'department',
        key: 'department',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">
            {record.departments.length !== 0 ? record.departments.map(department => {
              return department.name
            }).join() : <IntlMessages id="common.na"/>}
            </span>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span>  <i className="icon icon-edit gx-mr-3 gx-pointer"
                            onClick={() => this.onEditStaff(record)}/>
            <i className="icon icon-trash gx-pointer" onClick={() => this.onDeletePopUp(record.id)}/>
          </span>
        },
      },
    ];
  };


  onDeletePopUp = (recordId) => {
    const {messages} = this.props.intl;
    confirm({
      title: messages["staff.message.delete"],
      okText: messages["common.yes"],
      cancelText: messages["common.no"],
      onOk: () => {
        this.props.onBulkDeleteStaff({ids: [recordId]}, null, this);
        this.props.onGetStaff();
      }
    })
  };

  render() {
    const {showAddModal} = this.state;

    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        {this.props.staffList.length === 0 ?
          <Widget styleName="gx-card-filter gx-mr-2">
            <h3 className="gx-font-weight-bold gx-my-4"><IntlMessages id="setup.message.noStaffFound"/></h3>
            <Button type="primary" onClick={this.onAddButtonClick}><IntlMessages id="common.addNew"/></Button>
          </Widget> :
          <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.staffList}
                 className="gx-mb-4" pagination={false}/>}
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}><IntlMessages
              id="common.previous"/></Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}><IntlMessages
              id="common.next"/></Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+<IntlMessages id="common.addNew"/></Button></div>
        </div>
        {showAddModal ?
          <AddNewStaff showAddModal={showAddModal}
                       onToggleAddModal={this.onToggleAddModal}
                       onMoveToNextStep={this.props.onMoveToNextStep}
                       dept={this.props.dept}
                       selectedStaff={this.state.selectedStaff}
                       onEditSupportStaff={this.props.onEditSupportStaff}
                       onAddSupportStaff={this.props.onAddSupportStaff}
                       fetchSuccess={this.props.fetchSuccess}
                       fetchStart={this.props.fetchStart}
                       fetchError={this.props.fetchError}/> : null}
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
})(injectIntl(SixthStep));

SixthStep.defaultProps = {
  dept: [],
  staffList: []
};

SixthStep.propTypes = {
  dept: PropTypes.array,
  staffList: PropTypes.array
};
