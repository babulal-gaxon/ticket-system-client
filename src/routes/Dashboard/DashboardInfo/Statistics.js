import React from "react";
import Widget from "../../../components/Widget/index";
import {Empty} from "antd";
import IntlMessages from "../../../util/IntlMessages";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const Statistics = ({staticsData}) => {
console.log("staticsData", staticsData);
  return (
    <div>
      {staticsData ?
    <Widget>
      <h2 className="gx-widget-heading gx-mb-0">Avg. Statics</h2>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={staticsData}
                   margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
          <YAxis
            tickLine={false}
            axisLine={false}
          />
          <XAxis dataKey={staticsData.date} tickLine={false}
                 axisLine={false} />

          <Tooltip />
          <Area type="monotone" dataKey="customers" stroke="#038FDE" fillOpacity={1} fill="url(#colorCustomer)" />
          <Area type="monotone" dataKey="tickets" stroke="#FFC107" fillOpacity={1} fill="url(#colorTickets)" />
        </AreaChart>
      </ResponsiveContainer>
    </Widget> : null}
    </div>
  );
};

export default Statistics;
