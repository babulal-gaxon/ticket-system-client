import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Breadcrumb, Button, Divider, Form, Input, Switch} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {onGetCustomerPanelDetails, onSaveCustomerPanelDetails} from "../../../appRedux/actions/GeneralSettings";

class CustomerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme:"",
      country: "",
      registration_enable: false,
      register_verification: false,
      allow_primary_contact: false,
      delete_own_files: false
    }
  }

  componentWillMount() {
    this.props.onGetCustomerPanelDetails();
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSaveCustomerPanelDetails(null);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {registration_enable,register_verification,allow_primary_contact,delete_own_files} = this.state;
    console.log("state", this.state)
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
              {getFieldDecorator('name', {
                rules: [{required: true, message: 'Please Select Theme!'}],
              })(<Input type="text"/>)}
            </Form.Item>
            <Form.Item label="Default Country">
              {getFieldDecorator('name', {
                rules: [{required: true, message: 'Please Enter Country!'}],
              })(<Input type="text"/>)}
            </Form.Item>
            <Divider orientation="left" className="gx-mb-4">Access & Permissions</Divider>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Allow customer to Register</p>
                <Switch checked={registration_enable} onChange = {(checked) => this.setState({registration_enable: checked})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Require registration confirmation from administrator after customer register</p>
                <Switch checked={register_verification} onChange = {(checked) => this.setState({register_verification: checked})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Allow primary contact to view/edit billing & shipping details</p>
                <Switch checked={allow_primary_contact} onChange = {(checked) => this.setState({allow_primary_contact: checked})}/>
              </div>
              <Divider/>
            </Form.Item>
            <Form.Item>
              <div className="gx-d-flex gx-justify-content-between">
                <p>Allow contacts to delete own files uploaded from customers area</p>
                <Switch checked={delete_own_files} onChange = {(checked) => this.setState({delete_own_files: checked})}/>
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
      </div>
    );
  }
}

CustomerPanel = Form.create({})(CustomerPanel);

const mapStateToProps = ({generalSettings}) => {
  const {customerPanelDetails} = generalSettings;
  return {customerPanelDetails};
};

export default connect(mapStateToProps, {
  onGetCustomerPanelDetails,
  onSaveCustomerPanelDetails
})(CustomerPanel);
