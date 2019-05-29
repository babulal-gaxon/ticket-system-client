import React, {Component} from "react";
import {Layout} from "antd";

import Sidebar from "../Sidebar/index";

import Topbar from "../Topbar/index";
import App from "routes/index";

const {Content} = Layout;

export class MainApp extends Component {

  render() {
    const {match} = this.props;

    return (
      <Layout className="gx-app-layout">
        <Sidebar/>
        <Layout>
          <Topbar/>
          <Content className="gx-layout-content">
            <App match={match}/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default MainApp;

