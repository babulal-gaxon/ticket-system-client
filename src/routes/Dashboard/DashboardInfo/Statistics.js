import React from "react";
import Widget from "../../../components/Widget/index";
import {Empty} from "antd";

const Statistics = () => {
  return (
    <Widget
      title={
        <h2 className="h4 gx-text-capitalize gx-mb-0">
          Data</h2>
      }>
      <Empty/>
    </Widget>
  );
};

export default Statistics;
