import React, {Component} from "react"
import {Badge, Button, Icon, Input, Table} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {
  onAddTicketStatus,
  onDeleteTicketStatus,
  onEditTicketStatus,
  onGetTicketStatus,
  onToggleAddStatus
} from "../../../appRedux/actions/TicketStatuses";
import AddNewStatus from "./AddNewStatus";
import Widget from "../../../components/Widget/index";

const ButtonGroup = Button.Group;

class TicketStatuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      statusId: 0
    };
  };
  componentWillMount() {
    this.props.onGetTicketStatus();
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onAddButtonClick = () => {
    this.setState({statusId: 0});
    this.props.onToggleAddStatus();
  };
  onEditStatus = (id) => {
    this.setState({statusId: id});
    this.props.onToggleAddStatus();
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
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.color_code}</span>
        },
      },
      {
        title: 'Default',
        dataIndex: 'default',
        key: 'default',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.is_default}</span>
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
          return <span> <i className="icon icon-edit gx-mr-3" onClick={() => this.onEditStatus(record.id)}/>
            <i className="icon icon-trash" onClick={() => this.props.onDeleteTicketStatus(record.id)}/>
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
    console.log("in Show TicketStatuses", this.props.statuses);
    return (
      <Widget
        title={<div>
          <Button type="primary" className="h4 gx-text-capitalize gx-mb-0" onClick={this.onAddButtonClick}>
            Add New Status</Button>
          {this.props.showAddStatus ?
            <AddNewStatus showAddStatus={this.props.showAddStatus}
                          onToggleAddStatus={this.props.onToggleAddStatus}
                          onAddTicketStatus={this.props.onAddTicketStatus}
                          statusId={this.state.statusId}
                          onEditTicketStatus={this.props.onEditTicketStatus}
                          statuses={this.props.statuses}/> : null}
        </div>} extra={
        <div className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
          <Input
            placeholder="Enter keywords to search tickets"
            prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
          />
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
        <Table rowSelection={rowSelection} columns={this.onGetTableColumns()} dataSource={this.props.statuses}
               className="gx-mb-4"/>
        <div className="gx-d-flex gx-flex-row">
        </div>
        <div>
        </div>
      </Widget>
    );
  }
}

const mapStateToProps = ({ticketStatuses}) => {
  const {statuses, showAddStatus} = ticketStatuses;
  return {statuses, showAddStatus};
};

export default connect(mapStateToProps, {
  onGetTicketStatus,
  onToggleAddStatus,
  onAddTicketStatus,
  onDeleteTicketStatus,
  onEditTicketStatus
})(TicketStatuses);


TicketStatuses.defaultProps = {
  statuses: [],
  showAddStatus: false
};

TicketStatuses.propTypes = {
  statuses: PropTypes.array,
  showAddStatus: PropTypes.bool
};