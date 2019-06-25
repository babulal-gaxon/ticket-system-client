import React, {Component} from 'react';
import {Button, Checkbox, Col, Divider, Form, Input, Row} from "antd/lib/index";
import GeneralDetails from "./GeneralDetails";

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address_line_1: "",
      city: "",
      state: "",
      country_id: "",
      zip_code: "",
      department_id: []
    }
  };
  onSetFieldsValue = () => {
    this.props.form.setFieldsValue({
      address_line_1: this.state.address_line_1,
      city: this.state.city,
      state: this.state.state,
      country_id: this.state.country_id,
      zip_code: this.state.zip_code
    });
  };
  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        // this.onAddGeneralSettings();
      }
    });
  };
  render() {
    const {department_id} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form layout="vertical" style={{width:"50%"}}>
          <Form.Item>
            <Button type="default" style={{width: "100%", color: "blue"}} onClick={this.onToggleAddressModal}>
              <i className="icon icon-add-circle gx-mr-1"/>Add New Address</Button>
          </Form.Item>
          <Form.Item label="Address">
            {getFieldDecorator('address_line_1', {
              rules: [{required: true, message: 'Please Enter Address!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({address_line_1: e.target.value})
            }}/>)}
          </Form.Item>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="City">
                {getFieldDecorator('city', {
                  rules: [{required: true, message: 'Please Enter City Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({city: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="State">
                {getFieldDecorator('state', {
                  rules: [{required: true, message: 'Please Enter State Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({state: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Country">
                {getFieldDecorator('country_id', {
                  rules: [{required: true, message: 'Please Enter Country Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({country_id: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Zip Code">
                {getFieldDecorator('zip_code', {
                  rules: [{required: true, message: 'Please Enter Zip Code!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({zip_code: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label="Select Department">
            <Checkbox.Group onChange={this.onSelectDepartments} value={department_id}>
              <Row className="gx-d-flex gx-flex-row">
                <Col span={8} >
                  <Checkbox value="Billing">Billing</Checkbox>
                </Col>
                <Col span={8} >
                  <Checkbox value="Shipping">Shipping</Checkbox>
                </Col>
                <Col span={8} >
                  <Checkbox value="Other">Other</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Divider/>
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <div className="gx-d-flex">
              <Button type="primary" style={{width: 100}}>
                Save
              </Button>
              <Button type="default" style={{width: 100}}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

Addresses = Form.create({})(Addresses);

export default Addresses;