import React, {Component} from 'react';
import Widget from "../../../../../components/Widget";
import {Table} from "antd/lib/index";
import Permissions from "../../../../../util/Permissions";
import TicketsRow from "./TicketsRow";
import {withRouter} from "react-router";
import IntlMessages from "../../../../../util/IntlMessages";

class AssignedTickets extends Component {

  onGetTicketDetail = record => {
    this.props.history.push(`/manage-tickets/ticket-detail?id=${record.id}`);
  };

  render() {
    return (
      <div className="gx-main-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading gx-mb-3"><IntlMessages id="common.assignedTickets"/></h4>
          <Table rowKey="id" columns={TicketsRow()}
                 rowClassName="gx-pointer"
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