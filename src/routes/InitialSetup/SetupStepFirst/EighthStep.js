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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
        },
      },
      {
        title: 'Number of Orders',
        dataIndex: 'numberOfOrders',
        key: 'numberOfOrders',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.tickets_count}</span>
        },
      },
      {
        title: 'Color Code',
        dataIndex: 'colorCode',
        key: 'colorCode',
        render: (text, record) => {
          return <Tag color={record.color_code}>
            <span style={{color: record.color_code}}>{record.color_code}</span></Tag>
        },
      },
      {
        title: 'Default',
        dataIndex: 'default',
        key: 'default',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2"
                       style={{color: record.is_default === 1 ? "blue" : ""}}>{
            record.is_default === 1 ? "Default" : "Set Default"}</span>
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
        dataIndex: 'status',
        key: 'status',
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
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4">Default Status List</Divider>
        <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.statuses}
               className="gx-mb-4" pagination={false}/>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
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

