import React from "react";
import InfoView from "components/InfoView";

import IntlMessages from "util/IntlMessages";

const Dashboard = () => {
  return (
    <div>
      <h2 className="title gx-mb-4"><IntlMessages id="sidebar.samplePage"/></h2>

      <div className="gx-d-flex justify-content-center">
        <h4>samplePage happyCoding</h4>
      </div>
      <InfoView/>

    </div>
  );
};

export default Dashboard;
