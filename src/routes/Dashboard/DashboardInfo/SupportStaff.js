import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Empty, List} from "antd";

import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import Widget from "../../../components/Widget/index";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import moment from "moment";
import {getLocalTimeStamp} from "../../../util/Utills";


class SupportStaff extends Component {

  onViewAllClick = () => {
    this.props.history.push('/staff/all-members')
  };

  onRefreshList = () => {
    this.props.onGetDashboardData();
  };

  render() {

    return (
      <div className="gx-main-layout-content">
        {this.props.topStaff ?
          <Widget styleName="gx-card-filter">
            <div className="gx-d-flex gx-justify-content-between">
              <div>
                <h2 className="gx-widget-heading gx-mb-0"><IntlMessages id="dashboard.topSupportStaff"/></h2>
                {this.props.topStaff && this.props.topStaff.length > 0  ?
                <div className="gx-text-grey gx-fs-sm gx-mb-0 gx-mr-1 gx-mt-1">
                  <span><IntlMessages id="tickets.lastUpdate"/>:  </span>
                  <span>{moment(getLocalTimeStamp(this.props.topStaff[0].created_at)).fromNow()}</span></div> : null}
              </div>
              <span className="gx-cursor gx-pointer" onClick={this.onRefreshList}><i
                className="icon icon-shuffle gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
            </div>
            {this.props.topStaff.length > 0 ?
          <div>
            <List
              itemLayout="horizontal"
              dataSource={this.props.topStaff}
              renderItem={record => (
                <List.Item>
                  <div className="gx-media gx-flex-nowrap gx-align-items-center ">
                    {record.profile_pic[0] ?
                      <Avatar className="gx-mr-3 gx-size-40" src={record.profile_pic[0].src}/> :
                      <Avatar className="gx-mr-3 gx-size-40"
                              style={{backgroundColor: '#f56a00'}}>{record.assignee_name[0].toUpperCase()}</Avatar>}
                    <div className="gx-media-body">
                      <span className="gx-mb-0 gx-text-capitalize">{record.assignee_name}</span>
                      <div className="gx-mt-1">
                    <span className="gx-text-grey gx-fs-sm gx-mb-0">
                      <i
                        className="icon icon-forward-o gx-mr-1  gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
                  <span
                    className="gx-text-grey gx-fs-sm gx-mb-0 gx-mr-1">
                    <span className="gx-text-black">{record.assigned_tickets_count}</span> <span><IntlMessages
                    id="common.assigned"/></span></span>
                  <i
                    className="icon icon-circle-check-o gx-mr-1 gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
                      <span className="gx-text-grey gx-fs-sm gx-mb-0"><span
                        className="gx-text-black">{record.resolved_tickets_count}</span>
                        <span className="gx-ml-1"><IntlMessages id="common.resolved"/></span></span></span>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <span className="gx-link gx-cursor gx-pb-0" onClick={this.onViewAllClick}><IntlMessages
              id="dashboard.viewAll"/></span>
          </div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
          </Widget> : null}
      </div>
    );
  }
}

const mapStateToProps = ({supportStaff}) => {
  const {staffList} = supportStaff;
  return {staffList}
};

export default connect(mapStateToProps, {onGetStaff})(SupportStaff)

SupportStaff.defaultProps = {
  staffList: []
};

SupportStaff.propTypes = {
  staffList: PropTypes.array
};
