import React from "react";
import Widget from "../../../components/Widget/index";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import IntlMessages from "../../../util/IntlMessages";
import {Empty} from "antd";

const Statistics = ({staticsData, newTickets, newCustomers}) => {
    return (
      <div className="gx-main-layout-content">
            {staticsData ?
              <Widget styleName="gx-card-filter">
                    <h2 className="gx-widget-heading gx-mb-0"><IntlMessages id="common.statics"/></h2>

                    <div className="gx-d-flex gx-mt-5 gx-mb-3">
                        <div className="gx-mr-5">
                            <h1 className="gx-fs-xxxl gx-font-weight-medium gx-mb-1">{newCustomers}</h1>
                            <p className="gx-text-grey gx-mb-0">
                                <i className="icon icon-circle gx-fs-sm" style={{color:"#038FDE"}}/>
                                <span className="gx-ml-2"><IntlMessages id="common.newCustomers"/></span>
                            </p>
                        </div>
                        <div>
                            <h1 className="gx-fs-xxxl gx-font-weight-medium gx-mb-1">{newTickets}</h1>
                            <p className="gx-text-grey gx-mb-0">
                                <i className="icon icon-circle gx-fs-sm" style={{color:"#FFC107"}}/>
                                <span className="gx-ml-2"><IntlMessages id="common.newTickets"/></span>
                            </p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={staticsData}
                                   margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                            <defs>
                                <linearGradient id="colorCustomer" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#038FDE" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#038FDE" stopOpacity={0.1}/>
                                </linearGradient>
                                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFC107" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#FFC107" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>

                            <XAxis dataKey={staticsData.date} tickLine={false}
                                   axisLine={false}/>

                            <Tooltip/>
                            <Area type="monotone" dataKey="customers" stroke="#038FDE" fillOpacity={1}
                                  fill="url(#colorCustomer)"/>
                            <Area type="monotone" dataKey="tickets" stroke="#FFC107" fillOpacity={1}
                                  fill="url(#colorTickets)"/>
                        </AreaChart>
                    </ResponsiveContainer>
                </Widget> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
        </div>
    );
};

export default Statistics;
