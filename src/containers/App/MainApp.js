import React, {Component} from "react";
import {Layout} from "antd";
import InfoView from "../../components/InfoView";

import InsideHeader from "../Topbar/InsideHeader/index";
import App from "routes/index";

const {Content} = Layout;

export class MainApp extends Component {

  render() {
    const {match} = this.props;

    return (
      <Layout className="gx-app-layout">
        <Layout>
          <InsideHeader/>
          <Content className="gx-layout-content gx-container-wrap">
            <App match={match}/>
          </Content>
          <InfoView styleName="gx-loader-pos"/>
        </Layout>
      </Layout>
    )
  }
}

export default MainApp;

