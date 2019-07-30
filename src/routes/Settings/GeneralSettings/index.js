import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Tabs} from "antd";
import {Link} from "react-router-dom";
import Addresses from "./Addresses";
import GeneralDetails from "./GeneralDetails";
import {connect} from "react-redux";
import {
  onDeleteAddress,
  onEditAddress,
  onGetCountriesList,
  onGetGeneralAddress,
  onGetGeneralDetails,
  onSaveGeneralAddress,
  onSaveGeneralDetails
} from "../../../appRedux/actions/GeneralSettings";
import PropTypes from "prop-types";
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";

const {TabPane} = Tabs;

class GeneralSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "1"
    }
  };

  componentDidMount() {
    this.props.onGetGeneralDetails();
    this.props.onGetCountriesList();
    this.props.onGetGeneralAddress();
  }

  onTabChange = key => {
    this.setState({key: key})
  };

  render() {
    const {key} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading">General Setting</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              Settings
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/settings/general-settings">General Settings</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link to="/settings/general-settings"
                    className="gx-text-primary">{key === "1" ? "Setup" : "Addresses"}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Tabs defaultActiveKey="1" size="large" onChange={this.onTabChange}>
            <TabPane tab="General Setup" key="1">
              <GeneralDetails onSaveGeneralDetails={this.props.onSaveGeneralDetails}
                              generalSettingsData={this.props.generalSettingsData}
                              companyLogo={this.props.companyLogo}
                              favicon={this.props.favicon}
                              fetchSuccess={this.props.fetchSuccess}
                              fetchStart={this.props.fetchStart}
                              fetchError={this.props.fetchError}/>
            </TabPane>
            <TabPane tab="Addresses" key="2">
              <Addresses countriesList={this.props.countriesList}
                         onSaveGeneralAddress={this.props.onSaveGeneralAddress}
                         generalAddress={this.props.generalAddress}
                         generalSettingsData={this.props.generalSettingsData}
                         onEditAddress={this.props.onEditAddress}
                         onDeleteAddress={this.props.onDeleteAddress}/>
            </TabPane>
          </Tabs>
        </Widget>
      </div>
    );
  }
}

const mapStateToProps = ({generalSettings}) => {
  const {generalSettingsData, countriesList, generalAddress, companyLogo, favicon} = generalSettings;
  return {generalSettingsData, countriesList, generalAddress, companyLogo, favicon};
};

export default connect(mapStateToProps, {
  onGetGeneralDetails,
  onSaveGeneralDetails,
  onGetCountriesList,
  onSaveGeneralAddress,
  onGetGeneralAddress,
  fetchSuccess,
  fetchStart,
  fetchError,
  onEditAddress,
  onDeleteAddress
})(GeneralSettings);

GeneralSettings.defaultProps = {
  countriesList: [],
  generalSettingsData: null,
  generalAddress: [],
  companyLogo: null,
  favicon: null
};

GeneralSettings.propTypes = {
  countriesList: PropTypes.array,
  generalSettingsData: PropTypes.object,
  generalAddress: PropTypes.array,
  companyLogo: PropTypes.number,
  favicon: PropTypes.number
};
