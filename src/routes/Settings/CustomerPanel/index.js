import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Divider, Form, Input, Select, Switch} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  onGetCountriesList,
  onGetCustomerPanelDetails,
  onSaveCustomerPanelDetails
} from "../../../appRedux/actions/GeneralSettings";
import InfoView from "../../../components/InfoView";

const {Option} = Select;

class CustomerPanel extends Component {
  constructor(props) {
    super(props);
    if (this.props.customerPanelDetails === null) {
      this.state = {
        theme: "",
        country: "",
        registration_enable: 0,
        register_verification: 0,
        allow_primary_contact: 0,
        delete_own_files: 0
      }
    } else {
      const {theme, country, registration_enable, register_verification, allow_primary_contact, delete_own_files} = this.props.customerPanelDetails;
      this.state = {
        theme: theme,
        country: country,
        registration_enable: parseInt(registration_enable),
        register_verification: parseInt(register_verification),
        allow_primary_contact: parseInt(allow_primary_contact),
        delete_own_files: parseInt(delete_own_files)
      }
    }
  }

  componentWillMount() {
    this.props.onGetCustomerPanelDetails();
    this.props.onGetCountriesList();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.customerPanelDetails) {
      const {theme, country, registration_enable, register_verification, allow_primary_contact, delete_own_files} = nextProps.customerPanelDetails;
      if (JSON.stringify(nextProps.customerPanelDetails) !== JSON.stringify(this.props.customerPanelDetails)) {
        this.setState({
          theme: theme,
          country: country,
          registration_enable: parseInt(registration_enable),
          register_verification: parseInt(register_verification),
          allow_primary_contact: parseInt(allow_primary_contact),
          delete_own_files: parseInt(delete_own_files)
        })
      }
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSaveCustomerPanelDetails({...this.state});
      }
    });
  };

  onCountrySelect = value => {
    this.setState({country: value})
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {theme, country, registration_enable, register_verification, allow_primary_contact, delete_own_files} = this.state;
    console.log("state", this.state);
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>Customer Panel Settings</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/settings/general-settings">Settings</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link to="/settings/customer-panel">Customer Panel</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Form layout="vertical" style={{width: "50%"}}>
            <Form.Item label="Default Customer theme">
              {getFieldDecorator('theme', {
                initialValue: theme,
                rules: [{required: true, message: 'Please Select Theme!'}],
              })(<Input type="text" onChange={(e) => this.setState({theme: e.target.value})}/>)}
            </Form.Item>
            <Form.Item label="Default Country">
              {getFieldDecorator('country', {
                initialValue: country,
                rules: [{required: true, message: 'Please Enter Country!'}],
              })(<Select style={{width: "100%"}} onChange={this.onCountrySelect}>
                {Object.keys(this.props.countriesList).map(country => {
                  return <Option value={country}>{this.props.countriesList[country]}</Option>
                })}
              </Select>)}
            </Form.Item>
            <Divider orientation="left" className="gx-mb-4">Access & Permissions</Divider>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Allow customer to Register</p>
                <Switch checked={parseInt(registration_enable)}
                        onChange={(checked) => this.setState({registration_enable: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Require registration confirmation from administrator after customer register</p>
                <Switch checked={parseInt(register_verification)}
                        onChange={(checked) => this.setState({register_verification: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Allow primary contact to view/edit billing & shipping details</p>
                <Switch checked={parseInt(allow_primary_contact)}
                        onChange={(checked) => this.setState({allow_primary_contact: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Allow contacts to delete own files uploaded from customers area</p>
                <Switch checked={parseInt(delete_own_files)}
                        onChange={(checked) => this.setState({delete_own_files: Number(checked)})}/>
              </div>
              <Divider/>
            </Form.Item>
          </Form>
          <hr/>
          <div className="gx-d-flex">
            <Button type="primary" style={{width: "150px"}} onClick={this.onValidationCheck}>Save</Button>
            <Button type="default" style={{width: "150px"}}>Reset</Button>
          </div>
        </Widget>
        <InfoView/>
      </div>
    );
  }
}

CustomerPanel = Form.create({})(CustomerPanel);

const mapStateToProps = ({generalSettings}) => {
  const {customerPanelDetails, countriesList} = generalSettings;
  return {customerPanelDetails, countriesList};
};

export default connect(mapStateToProps, {
  onGetCustomerPanelDetails,
  onSaveCustomerPanelDetails,
  onGetCountriesList
})(CustomerPanel);
