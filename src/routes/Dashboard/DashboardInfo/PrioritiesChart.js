import React from 'react'
import Widget from "../../../components/Widget";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {ResponsiveContainer} from "recharts";
import IntlMessages from "../../../util/IntlMessages";



const PrioritiesChart = (props) => {
  return (
    <div className="gx-main-layout-content">
      <Widget styleName="gx-card-filter">
      <div className="gx-d-flex">
        <ResponsiveContainer height={76} width={76}>
        <CircularProgressbar value={props.resolved} text={props.totalTickets}
                             className="mr-3" maxValue={props.totalTickets}
                             styles={buildStyles({
                               pathColor: props.colorCode,
                             })} strokeWidth={6} backgroundPadding={10}/>
        </ResponsiveContainer>
        <div className="gx-ml-3 gx-justify-content-center gx-align-text-center">
          <div><i className="icon icon-circle gx-fs-sm" style={{color:props.colorCode}}/></div>
          <div className="gx-font-semi-bold gx-text-black gx-my-2">{props.name} <IntlMessages id="common.priority"/></div>
          <div className="gx-text-green"><i className=" icon icon-circle-check gx-text-green"/> {props.resolved} <IntlMessages id="common.resolved"/></div>
        </div>
      </div>
    </Widget>
    </div>
  )
};

export default PrioritiesChart;