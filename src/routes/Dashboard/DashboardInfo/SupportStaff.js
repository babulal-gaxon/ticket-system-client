import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Button} from "antd";

import {onSupportStaff} from "../../../appRedux/actions/SupportStaff";
import Widget from "../../../components/Widget/index";
import PropTypes from "prop-types";

class SupportStaff extends Component {
  componentDidMount() {
    this.props.onSupportStaff()
  }
  render() {
    console.log("onSupportStaff", this.props.staff);
    return (
      <Widget title={
        <div>
          <h2 className="h4 gx-text-capitalize gx-mb-0">
            Top Support Staff</h2>
          <div className="gx-text-grey gx-fs-sm gx-mb-0 gx-mr-1">last update 2 hours ago</div>
        </div>}
              styleName="gx-card-ticketlist"
              extra={<span><i
                className="icon icon-shuffle gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
            </span>}>
        {this.props.staff.map(employee => {
          return (
            <div key={employee.id} className="gx-media gx-task-list-item gx-flex-nowrap">
              <Avatar className="gx-mr-3 gx-size-36" src="https://via.placeholder.com/150x150"/>
              <div className="gx-media-body gx-task-item-content">
                <div className="gx-task-item-content-left">
                  <h5 className="gx-text-truncate gx-task-item-title">{employee.staff_name}</h5>
                  <i className="icon icon-forward-o gx-mr-1  gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
                  <span className="gx-text-grey gx-fs-sm gx-mb-0 gx-mr-1">{employee.assigned_tickets_count + " " + "assigned"}</span>
                  <i className="icon icon-check-circle-o gx-mr-1 gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
                  <span className="gx-text-grey gx-fs-sm gx-mb-0">{employee.resolved_tickets_count + " " + "resolved"}</span>
                </div>
                <div className="gx-task-item-content-right">
                  <span className={`gx-badge gx-mb-0 gx-text-white gx-badge-red`}>
              <span>
                    <i className="icon icon-star  gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
                    </span>
                    <span>4.6</span>
            </span>
                </div>
              </div>
            </div>
          )
        })}
        <Button type="link">View All</Button>
      </Widget>
    );
  };
}

const mapStateToProps = ({supportStaff}) => {
  const {staff} = supportStaff;
  return {staff}
};

export default connect(mapStateToProps, {onSupportStaff})(SupportStaff)

SupportStaff.defaultProps = {
  staff: []
};

SupportStaff.propTypes = {
  staff: PropTypes.array
};