import React, {Component} from 'react';
import {Button, Divider, Popconfirm, Table, Tag} from "antd/lib/index";
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

class EighthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddStatus: false,
      statusId: null
    }
  }

  componentDidMount() {
    this.props.onGetTicketStatus();
  }

  onToggleAddStatus = () => {
    this.setState({showAddStatus: !this.state.showAddStatus})
  };

  onAddButtonClick = () => {
    this.setState({statusId: null, showAddStatus: true});
  };

  onEditStatus = (id) => {
    this.setState({statusId: id, showAddStatus: true});
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
        title: <IntlMessages id="statuses.orders"/>,
        dataIndex: 'numberOfOrders',
        key: 'numberOfOrders',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.tickets_count}</span>
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
          return <span> {Permissions.canStatusEdit() ? <i className="icon icon-edit gx-mr-3"
                                                          onClick={() => this.onEditStatus(record.id)}/> : null}
            {Permissions.canStatusDelete() ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Status?"
      onConfirm={() => {
        this.props.onBulkDeleteStatuses({ids: [recordId]});
        this.props.onGetTicketStatus(this.state.current, this.state.itemNumbers, this.state.filterText);
      }}
      okText={<IntlMessages id="common.yes"/>}
      cancelText={<IntlMessages id="common.no"/>}>
      <i className="icon icon-trash"/>
    </Popconfirm>
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
                        statusId={this.state.statusId}
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
})(EighthStep);

EighthStep.defaultProps = {
  statuses: []
};

EighthStep.propTypes = {
  statuses: PropTypes.array
};

