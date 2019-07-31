import Widget from "../../../../components/Widget";
import React from "react";
import {Line, LineChart} from "recharts";

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const TotalLoggedTime = () => {
  return (
    <div className="gx-main-content">
      <Widget styleName="gx-card-filter">
        <div className="gx-d-flex">
          <div className="gx-mr-2">
          <div className="gx-mb-3">Total Logged Time</div>
            <div className="gx-font-weight-bold">8:45:00</div>
          </div>
          <div className="gx-mb-3">
        <LineChart width={155} height={29} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
          </div>
        </div>
      </Widget>
    </div>
  )
};

export default TotalLoggedTime