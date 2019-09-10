import React, {Component} from "react";
import {Col, Row} from "antd";
import PropTypes from 'prop-types';

import InfoView from "../../components/InfoView";
import TicketList from "./DashboardInfo/TicketList";
import RecentCustomers from "./DashboardInfo/RecentCustomers";
import SupportStaff from "./DashboardInfo/SupportStaff";
import Statistics from "./DashboardInfo/Statistics";
import SummaryDesign from "./DashboardInfo/SummaryDesign";
import {connect} from "react-redux";
import {onGetDashboardData} from "../../appRedux/actions/Dashboard";
import {onDeleteTicket} from "../../appRedux/actions/TicketList";
import PrioritiesChart from "./DashboardInfo/PrioritiesChart";
import IntlMessages from "../../util/IntlMessages";

class Dashboard extends Component {

  componentDidMount() {
    this.props.onGetDashboardData();
  }

  render() {
    const {
      totalTickets, totalStaff, totalCustomers, ticketsList, priorityList, recentCustomers,
      topStaff, staticsData, pendingTickets, newTickets, newCustomers
    } = this.props;
    return (

      <div className="gx-main-content">
        <div className="gx-d-flex justify-content-center">
          <Row>
            <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <SummaryDesign icon="orders" iconColor="geekblue" title={totalTickets}
                             subTitle={<IntlMessages id="dashboard.totalTicketsRaised"/>}/>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <SummaryDesign icon="revenue-new" iconColor="primary" title={pendingTickets}
                             subTitle={<IntlMessages id="dashboard.totalTickets.pending"/>}/>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <SummaryDesign icon="visits" iconColor="geekblue" title={totalStaff}
                             subTitle={<IntlMessages id="dashboard.totalStaff"/>}/>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
              <SummaryDesign icon="queries" iconColor="geekblue" title={totalCustomers}
                             subTitle={<IntlMessages id="dashboard.totalCustomers"/>}/>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <TicketList history={this.props.history} tickets={ticketsList}
                          onDeleteTicket={this.props.onDeleteTicket}/>
            </Col>
            {priorityList.length > 0 ?
              priorityList.map(priority => {
                return <Col xl={6} lg={12} md={12} sm={12} xs={24} key={priority.name}>
                  <PrioritiesChart name={priority.name} totalTickets={priority.tickets_count}
                                   resolved={priority.resolved_tickets_count}
                                   colorCode={priority.color_code}/>
                </Col>
              }) : null}
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <RecentCustomers recentCustomers={recentCustomers} history={this.props.history}
                               onGetDashboardData={this.props.onGetDashboardData}/>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Statistics staticsData={staticsData} newTickets={newTickets} newCustomers={newCustomers}/>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <SupportStaff topStaff={topStaff} history={this.props.history}
                            onGetDashboardData={this.props.onGetDashboardData}/>
            </Col>
          </Row>
        </div>
        <InfoView/>
      </div>
    );
  };
};

const mapStateToProps = ({dashboard}) => {
  const {
    totalTickets, totalStaff, totalCustomers, ticketsList, priorityList, recentCustomers,
    topStaff, staticsData, pendingTickets, newTickets, newCustomers
  } = dashboard;
  return {
    totalTickets,
    totalStaff,
    totalCustomers,
    ticketsList,
    priorityList,
    recentCustomers,
    topStaff,
    staticsData,
    pendingTickets, newTickets, newCustomers
  };
};

export default connect(mapStateToProps, {onGetDashboardData, onDeleteTicket})(Dashboard);


Dashboard.defaultProps = {
  incrementData: []
};

Dashboard.propTypes = {
  incrementData: PropTypes.array
};
