import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Button} from "antd";

import Widget from "../../../components/Widget/index";
import PropTypes from "prop-types";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";

class RecentCustomers extends Component {
  componentDidMount() {
    this.props.onGetCustomersData();
  }

  render() {
    console.log("inRecentCustomers", this.props.customersList);
    return (
      <Widget title={
        <div>
          <h2 className="h4 gx-text-capitalize gx-mb-0">Recent Customers</h2>
          <div className="gx-text-grey gx-fs-sm gx-mb-0 gx-mr-1">last update 2 hours ago</div>
        </div>}
              styleName="gx-card-ticketlist"
              extra={<span><i
                className="icon icon-shuffle gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>}>
        {this.props.customersList.map(customer => {
          return (
            <div className="gx-media gx-task-list-item gx-flex-nowrap">
              <Avatar className="gx-mr-3 gx-size-36" src="https://via.placeholder.com/150x150"/>
              <div className="gx-media-body gx-task-item-content">
                <div className="gx-task-item-content-left">
                  <h5 className="gx-text-truncate gx-task-item-title">{customer.company_name}</h5>
                  <div>
                    <span>
          <i className="icon icon-schedule gx-mr-2 gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
                     <span className="gx-text-grey gx-fs-sm gx-mb-0">{customer.created_at}</span>
                  </span>
                  </div>
                </div>
                <div className="gx-task-item-content-right">
                  <i className="icon icon-ellipse-h gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
                </div>
              </div>
            </div>
          )
        })}
        <Button type="link">View All</Button>
      </Widget>
    );
  }
}

const mapStateToProps = ({customers}) => {
  const {customersList} = customers;
  return {customersList}
};

export default connect(mapStateToProps, {onGetCustomersData})(RecentCustomers)


RecentCustomers.defaultProps = {
  customersList: []
};

RecentCustomers.propTypes = {
  customersList: PropTypes.array
};


