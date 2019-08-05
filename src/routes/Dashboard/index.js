import React from "react";
import {Col, Row} from "antd";
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";
import PropTypes from 'prop-types';

import InfoView from "../../components/InfoView";
import IntlMessages from "../../util/IntlMessages";
import TicketList from "./DashboardInfo/TicketList";
import ChartCard from "./DashboardInfo/ChartCard";
import RecentCustomers from "./DashboardInfo/RecentCustomers";
import SupportStaff from "./DashboardInfo/SupportStaff";
import Statistics from "./DashboardInfo/Statistics";
import TicketData from "./DashboardInfo/TicketData";
import {incrementData} from "./DashboardInfo/data";

const Dashboard = () => {
  return (
    <div className="gx-main-content">
      <div className="gx-d-flex justify-content-center">
        <Row>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard price="2937" title="+2.5" icon="bitcoin"
                       styleName="up" desc="Tickets Raised">
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart data={incrementData}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Tooltip/>
                  <defs>
                    <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#163469" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#FE9E15" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey='price' strokeWidth={0} stackId="2" stroke='#4D95F3'
                        fill="url(#color3)" fillOpacity={1}/>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard price="27" title="+2.5" icon="etherium"
                       styleName="up" desc="Pending Tickets">
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart data={incrementData}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Tooltip/>
                  <defs>
                    <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#06BB8A" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey='price' type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3'
                        fill="url(#color4)"
                        fillOpacity={1}/>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard price="2910" title="-0.5" icon="ripple"
                       styleName="down" desc="Tickets Resolved">
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart data={incrementData}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Tooltip/>
                  <defs>
                    <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e81a24" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FEEADA" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey='price' strokeWidth={0} stackId="2" stroke='#FEEADA'
                        fill="url(#color5)" fillOpacity={1}/>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard price="122" icon="etherium"
                       styleName="up" desc="Today's Tickets">
              <ResponsiveContainer width="100%" height={75}>
                <AreaChart data={incrementData}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Tooltip/>
                  <defs>
                    <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#06BB8A" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey='price' type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3'
                        fill="url(#color4)" fillOpacity={1}/>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <TicketList/>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <TicketData price="2937" title="+2.5" icon="bitcoin"
                        styleName="up" desc="Tickets Raised">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={incrementData}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Tooltip/>
                  <defs>
                    <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#163469" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#FE9E15" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey='price' strokeWidth={0} stackId="2" stroke='#4D95F3'
                        fill="url(#color3)" fillOpacity={1}/>
                </AreaChart>
              </ResponsiveContainer>
            </TicketData>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <TicketData price="27" title="+2.5" icon="etherium"
                        styleName="up" desc="Pending Tickets">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={incrementData}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Tooltip/>
                  <defs>
                    <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#06BB8A" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey='price' type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3'
                        fill="url(#color4)" fillOpacity={1}/>
                </AreaChart>
              </ResponsiveContainer>
            </TicketData>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <TicketData price="2910" title="-0.5" icon="ripple"
                        styleName="down" desc="Tickets Resolved">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={incrementData}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Tooltip/>
                  <defs>
                    <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e81a24" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FEEADA" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey='price' strokeWidth={0} stackId="2" stroke='#FEEADA'
                        fill="url(#color5)" fillOpacity={1}/>
                </AreaChart>
              </ResponsiveContainer>
            </TicketData>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <TicketData price="122" icon="etherium"
                        styleName="up" desc="Today's Tickets">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={incrementData}
                           margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                  <Tooltip/>
                  <defs>
                    <linearGradient id="color4" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#4ECDE4" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#06BB8A" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey='price' type='monotone' strokeWidth={0} stackId="2" stroke='#4D95F3'
                        fill="url(#color4)" fillOpacity={1}/>
                </AreaChart>
              </ResponsiveContainer>
            </TicketData>
          </Col>
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <RecentCustomers/>
          </Col>
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <Statistics/>
          </Col>
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
            <SupportStaff/>
          </Col>
        </Row>
      </div>
      <InfoView/>
    </div>
  );
};

export default Dashboard;


Dashboard.defaultProps = {
  incrementData: []
};

Dashboard.propTypes = {
  incrementData: PropTypes.array
};