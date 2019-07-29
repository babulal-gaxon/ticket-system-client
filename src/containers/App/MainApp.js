import React, {Component} from "react";
import {Layout} from "antd";

import Sidebar from "../Sidebar/index";

import Topbar from "../Topbar/index";
import App from "routes/index";
import InfoView from "../../components/InfoView";

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
          <InfoView/>
        </Layout>
      </Layout>
    )
  }
}

export default MainApp;

