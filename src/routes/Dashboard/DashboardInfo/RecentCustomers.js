import React, {Component} from "react";
import {Avatar, Dropdown, List, Menu} from "antd";

import Widget from "../../../components/Widget/index";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {getFormattedDate, getLocalTimeStamp} from "../../../util/Utills";
import moment from "moment";
import Permissions from "../../../util/Permissions";

class RecentCustomers extends Component {

  onViewAllClick = () => {
    this.props.history.push('/customers/all-customers')
  };

  onRefreshList = () => {
    this.props.onGetDashboardData();
  };

  onSelectCustomer = record => {
    this.props.history.push(`/customers/customer-detail?id=${record.id}`)
  };

  onShowRowDropdown = (customer) => {
    const menu = (
      <Menu>
        {(Permissions.canViewCustomerDetail()) ?
          <Menu.Item key="4" onClick={() => this.onSelectCustomer(customer)}>
            <IntlMessages id="common.viewOnly"/>
          </Menu.Item> : null}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h"/>
      </Dropdown>
    )
  };

  render() {
    return (
      <div>
        {this.props.recentCustomers && this.props.recentCustomers.length > 0 ?
          <Widget>
            <div className="gx-d-flex gx-justify-content-between">
              <div>
                <h2 className="gx-widget-heading gx-mb-0"><IntlMessages id="dashboard.recentCustomers"/></h2>
                <div className="gx-text-grey gx-fs-sm gx-mb-0 gx-mr-1 gx-mt-1">
                  <span><IntlMessages id="tickets.lastUpdate"/>:  </span>
                  <span>{moment(getLocalTimeStamp(this.props.recentCustomers[0].created_at)).fromNow()}</span>
                </div>
              </div>
              <span className="gx-cursor" onClick={this.onRefreshList}><i
                className="icon icon-shuffle gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
            </div>
            <List
              itemLayout="horizontal"
              dataSource={this.props.recentCustomers}
              renderItem={record => (
                <List.Item>
                  <div className="gx-d-flex gx-justify-content-between gx-w-100">
                    <div className="gx-media gx-flex-nowrap gx-align-items-center ">
                      {record.profile_pic[0] ?
                        <Avatar className="gx-mr-3 gx-size-40" src={record.profile_pic[0].src}/> :
                        <Avatar className="gx-mr-3 gx-size-40"
                                style={{backgroundColor: '#f56a00'}}>{record.assignee_name[0].toUpperCase()}</Avatar>}
                      <div className="gx-media-body">
                        <span className="gx-mb-0 gx-text-capitalize">{record.assignee_name}</span>
                        <div className="gx-mt-1">
                    <span className="gx-text-grey gx-fs-sm gx-mb-0">
                      <i className="icon icon-schedule gx-mr-2"/>
                      <span>{getFormattedDate(record.created_at)}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="gx-pr-1">
                      {this.onShowRowDropdown(record)}
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <span className="gx-link gx-cursor gx-pb-0" onClick={this.onViewAllClick}><IntlMessages
              id="dashboard.viewAll"/></span>
          </Widget> : null}
      </div>
    );
  }
}

export default RecentCustomers


RecentCustomers.defaultProps = {
  recentCustomers: []
};

RecentCustomers.propTypes = {
  recentCustomers: PropTypes.array
};


