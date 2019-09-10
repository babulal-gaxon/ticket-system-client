import React, {Component} from 'react';
import {Button, Divider, Modal, Table, Tag} from "antd";
import AddNewStatus from "../../SetUp/TicketStatuses/AddNewStatus";
import {connect} from "react-redux";
import {
  onAddTicketStatus,
  onBulkDeleteStatuses,
  onEditTicketStatus,
  onGetTicketStatus
} from "../../../appRedux/actions/TicketStatuses";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const confirm = Modal.confirm;

class EighthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddStatus: false,
      currentStatus: null
    }
  }

  componentDidMount() {
    this.props.onGetTicketStatus();
  }

  onToggleAddStatus = () => {
    this.setState({showAddStatus: !this.state.showAddStatus})
  };

  onAddButtonClick = () => {
    this.setState({currentStatus: null, showAddStatus: true});
  };

  onEditStatus = (status) => {
    this.setState({currentStatus: status, showAddStatus: true});
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
        title: <IntlMessages id="common.colorCode"/>,
        dataIndex: 'colorCode',
        key: 'colorCode',
        render: (text, record) => {
          return <Tag color={record.color_code}>
            <span style={{color: record.color_code}}>{record.color_code}</span></Tag>
        },
      },
      {
        title: <IntlMessages id="common.default"/>,
        dataIndex: 'default',
        key: 'default',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2"
                       style={{color: record.is_default === 1 ? "blue" : ""}}>{
            record.is_default === 1 ? <IntlMessages id="common.default"/> :
              <IntlMessages id="common.setDefault"/>}</span>
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
        dataIndex: 'status',
        key: 'status',
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
          return <span> {Permissions.canStatusEdit() ? <i className="icon icon-edit gx-mr-3 gx-pointer"
                                                          onClick={() => this.onEditStatus(record)}/> : null}
            {Permissions.canStatusDelete() ? <i className="icon icon-trash gx-pointer" onClick={() => this.onDeletePopUp(record.id)}/> : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    const {messages} = this.props.intl;
    confirm({
      title: messages["statuses.message.delete"],
      okText: messages["common.yes"],
      cancelText: messages["common.no"],
      onOk: () => {
        this.props.onBulkDeleteStatuses({ids: [recordId]}, this);
        this.props.onGetTicketStatus();
      }
    })
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4"><IntlMessages id="setup.defaultStatusList"/></Divider>
        <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.statuses}
               className="gx-mb-4" pagination={false}/>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}><IntlMessages
              id="common.previous"/></Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}><IntlMessages
              id="common.next"/></Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+<IntlMessages id="common.addNew"/></Button></div>
        </div>
        {this.state.showAddStatus ?
          <AddNewStatus showAddStatus={this.state.showAddStatus}
                        onToggleAddStatus={this.onToggleAddStatus}
                        onAddTicketStatus={this.props.onAddTicketStatus}
                        currentStatus={this.state.currentStatus}
                        onEditTicketStatus={this.props.onEditTicketStatus}
                        statuses={this.props.statuses}/> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ticketStatuses}) => {
  const {statuses} = ticketStatuses;
  return {statuses};
};

export default connect(mapStateToProps, {
  onGetTicketStatus,
  onAddTicketStatus,
  onEditTicketStatus,
  onBulkDeleteStatuses
})(injectIntl(EighthStep));

EighthStep.defaultProps = {
  statuses: []
};

EighthStep.propTypes = {
  statuses: PropTypes.array
};

