import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Table} from "antd";

import {onGetTickets} from "../../../appRedux/actions/TicketList";
import Widget from "../../../components/Widget/index";
import {ticketListcolumns} from "./data";
import PropTypes from "prop-types";

class TicketList extends Component {
  componentWillMount() {
    this.props.onGetTickets();
  };
  render() {
    console.log("in tableListing", this.props.tickets);
    return (
      <Widget
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0">Ticket Listing</h2>
        }
        extra={
        <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
          <Button type="primary">New Tickets</Button>
          <Button type="link">Snoozes</Button>
          <Button type="link">View All</Button>
        </p>
      }>
        <div>
          <Table columns={ticketListcolumns} dataSource={this.props.tickets} pagination={{pageSize: 5}}/>
        </div>
        <div>
          <Button type="default">View All</Button>
          <span>
          <i className="icon icon-schedule gx-mr-2 gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
          </span>
          <span>Last update 2 hours ago</span>
        </div>
      </Widget>
    );
  }
}


const mapStateToProps = ({ticketList}) => {
  const {tickets} = ticketList;
  return {tickets};
};

export default connect(mapStateToProps, {onGetTickets})(TicketList);

TicketList.defaultProps = {
  tickets: [],
  ticketListcolumns: []
};

TicketList.propTypes = {
  tickets: PropTypes.array,
  ticketListcolumns: PropTypes.array
};