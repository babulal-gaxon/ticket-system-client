import React, {Component} from 'react';
import Widget from "../../../../../components/Widget";
import {Table} from "antd/lib/index";
import Permissions from "../../../../../util/Permissions";
import TicketsRow from "./TicketsRow";
import {withRouter} from "react-router";

class AssignedTickets extends Component {

  state = {
    selectedRowKeys: []
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onGetTicketDetail = record => {
    this.props.history.push(`/manage-tickets/ticket-detail?id=${record.id}`);
  };

  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    return (
      <div className="gx-main-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading gx-mb-3">Assigned Tickets</h4>
          <Table rowKey="id" rowSelection={rowSelection} columns={TicketsRow()}
                 className="gx-mb-4" dataSource={this.props.staffTickets}
                 onRow={(record) => ({
                   onClick: () => {
                     if (Permissions.canViewTicketDetail()) {
                       this.onGetTicketDetail(record)
                     }
                   }
                 })}
          />
        </Widget>
      </div>
    );
  }
}

export default withRouter(AssignedTickets);