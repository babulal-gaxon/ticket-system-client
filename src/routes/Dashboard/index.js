import React from "react";
import InfoView from "../../components/InfoView";
import {Col, Row} from "antd";

import {Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";

import IntlMessages from "../../util/IntlMessages";
import TicketListing from "../../components/dashboard/Tickets/TicketListing";
import ChartCard from "../../components/dashboard/Tickets/ChartCard";

const Dashboard = () => {
  return (
    <div>
      <h2 className="title gx-mb-4"><IntlMessages id="sidebar.samplePage"/></h2>
      <div className="gx-d-flex justify-content-center">
        <Row>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard prize="2937" title="+2.5" icon="bitcoin"
                       children={<ResponsiveContainer width="100%" height={75}>
                         <AreaChart data={increamentData}
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                           <Tooltip/>
                           <defs>
                             <linearGradient id="color3" x1="0" y1="0" x2="1" y2="0">
                               <stop offset="5%" stopColor="#163469" stopOpacity={0.9}/>
                               <stop offset="95%" stopColor="#FE9E15" stopOpacity={0.9}/>
                             </linearGradient>
                           </defs>
                           <Area dataKey='price' strokeWidth={0} stackId="2" stroke='#4D95F3' fill="url(#color3)"
                                 fillOpacity={1}/>
                         </AreaChart>
                       </ResponsiveContainer>}
                       styleName="up" desc="Tickets Raised"/>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard prize="27" title="+2.5" icon="etherium"
                       children={<ResponsiveContainer width="100%" height={75}>
                         <AreaChart data={increamentData}
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
                       </ResponsiveContainer>}
                       styleName="up" desc="Pending Tickets"/>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard prize="2910" title="-0.5" icon="ripple"
                       children={<ResponsiveContainer width="100%" height={75}>
                         <AreaChart data={increamentData}
                                    margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                           <Tooltip/>
                           <defs>
                             <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#e81a24" stopOpacity={0.8}/>
                               <stop offset="95%" stopColor="#FEEADA" stopOpacity={0.8}/>
                             </linearGradient>
                           </defs>
                           <Area dataKey='price' strokeWidth={0} stackId="2" stroke='#FEEADA' fill="url(#color5)"
                                 fillOpacity={1}/>
                         </AreaChart>
                       </ResponsiveContainer>}
                       styleName="down" desc="Tickets Resolved"/>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
            <ChartCard prize="122"  icon="etherium"
                       children={<ResponsiveContainer width="100%" height={75}>
                         <AreaChart data={increamentData}
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
                       </ResponsiveContainer>}
                       styleName="up" desc="Today's Tickets"/>
          </Col>
        </Row>
      </div>
      <div>
      <TicketListing />
      </div>
      <InfoView/>

    </div>
  );
};

const increamentData = [
  {name: 'Page A', price: 200},
  {name: 'Page B', price: 1200},
  {name: 'Page C', price: 600},
  {name: 'Page D', price: 1600},
  {name: 'Page D', price: 1000},
  {name: 'Page H', price: 2260},
  {name: 'Page K', price: 800},
];

export default Dashboard;
