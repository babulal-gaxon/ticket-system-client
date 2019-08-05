import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Table} from "antd";

import {onGetTickets} from "../../../appRedux/actions/TicketList";
import Widget from "../../../components/Widget/index";
import {ticketListcolumns} from "./data";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";

class TicketList extends Component {
  componentWillMount() {
    this.props.onGetTickets();
  };

  render() {
    return (
      <Widget
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0"><IntlMessages id="dashboard.ticketListing"/></h2>
        }
        extra={
          <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
            <Button type="primary"><IntlMessages id="dashboard.newTickets"/></Button>
            <Button type="link"><IntlMessages id="dashboard.snoozes"/></Button>
            <Button type="link"><IntlMessages id="dashboard.viewAll"/></Button>
          </p>
        }>
        <div>
          <Table rowKey="id" columns={ticketListcolumns} dataSource={this.props.tickets}
                 pagination={false}/>
        </div>
        <div>
          <Button type="default"><IntlMessages id="dashboard.viewAll"/></Button>
          <span>
          <i className="icon icon-schedule gx-mr-2 gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
          </span>
          <span><IntlMessages id="common.updatedAt"/> </span>
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
