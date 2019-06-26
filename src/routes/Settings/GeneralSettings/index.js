import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Tabs} from "antd";
import {Link} from "react-router-dom";
import Addresses from "./Addresses";
import GeneralDetails from "./GeneralDetails";
import {connect} from "react-redux";
import {onGetGeneralDetails, onSaveGeneralDetails} from "../../../appRedux/actions/GeneralSettings";

const {TabPane} = Tabs;

class GeneralSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "1"
    }
  };

  componentWillMount() {
    this.props.onGetGeneralDetails();
  }

  onTabChange = key => {
    this.setState({key: key})
  };

  render() {
    const {key} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>General Setting</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              Settings
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/settings/general-settings">General Settings</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link to="/settings/general-settings">{key === "1" ? "Setup" : "Addresses"}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Tabs defaultActiveKey="1" size="large" onChange={this.onTabChange}>
            <TabPane tab="General Setup" key="1">
              <GeneralDetails onSaveGeneralDetails={this.props.onSaveGeneralDetails}
                              generalSettingsData={this.props.generalSettingsData}/>
            </TabPane>
            <TabPane tab="Addresses" key="2">
              <Addresses/>
            </TabPane>
          </Tabs>
        </Widget>
      </div>
    );
  }
}

const mapStateToProps = ({generalSettings}) => {
  const {generalSettingsData} = generalSettings;
  return {generalSettingsData};
};

export default connect(mapStateToProps, {
  onGetGeneralDetails,
  onSaveGeneralDetails
})(GeneralSettings);
