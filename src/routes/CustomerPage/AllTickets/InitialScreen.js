import React, {Component} from 'react';
import {Button} from "antd";

class InitialScreen extends Component {

  render() {

    return (
      <div className="gx-main-layout-content">
        <div>
          <div>No records Found</div>
          <div className="gx-font-weight-bold">You have not raised any support request</div>
          <Button type="primary">Raise a Ticket</Button>
        </div>
      </div>
    );
  }
}


export default InitialScreen;
