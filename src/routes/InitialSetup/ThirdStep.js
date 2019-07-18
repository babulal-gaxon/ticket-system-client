import React, {Component} from 'react';
import {Button, Col, Divider, Form, Input, Select} from "antd";

class ThirdStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      url: "",
      logo: null,
      phone: null,
      email: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country_id: "",
      zip_code: "",
    }
  }

  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {companyName, url, phone, email, address_line_1, address_line_2, city, state, country_id, zip_code} = this.state;
    return (
      <div className="gx-flex-column gx-mt-3">
        <Form layout="vertical" style={{width: "70%"}}>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Company Name">
                {getFieldDecorator('companyName', {
                  initialValue: companyName,
                  rules: [{
                    required: true,
                    message: 'Please Enter Company Name!'
                  }],
                })(<Input type="text" onChange={(e) => this.setState({companyName: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Company Website" extra="Please enter website in 'http//www.example.com' format">
                {getFieldDecorator('url', {
                  initialValue: url,
                  rules: [{
                    required: true,
                    message: 'Please Enter Company Website!'
                  }],
                })(<Input type="text" onChange={(e) => this.setState({url: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label="Company Logo" extra="Size should be 250X100px, Maximum image size 50kb">
            {getFieldDecorator('logo', {
              rules: [{required: true, message: 'Please Select Logo!'}],
            })(<Input type="file" placeholder="Choose file..." addonAfter="Browse"/>)}
          </Form.Item>
          <Divider orientation="left" className="gx-mb-4">Primary Contact</Divider>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Email Address">
                {getFieldDecorator('email', {
                  initialValue: email,
                  rules: [{
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                    {
                      required: true,
                      message: 'Please Enter Email!'
                    }],
                })(<Input type="text" onChange={(e) => {
                  this.setState({email: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                  initialValue: phone,
                  rules: [{
                    pattern: /^[0-9\b]+$/,
                    message: 'Please enter only numerical values',
                  }],
                })(<Input type="text" onChange={(e) => {
                  this.setState({phone: e.target.value})

                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <Divider orientation="left" className="gx-mb-4">Address</Divider>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Address Line 1">
                {getFieldDecorator('address_line_1', {
                  initialValue: address_line_1,
                  rules: [{required: true, message: 'Please Enter Address Line 1!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({address_line_1: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Address Line 2">
                {getFieldDecorator('address_line_2', {
                  initialValue: address_line_2,
                  rules: [{required: true, message: 'Please Enter Address Line 2!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({address_line_2: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={8} xs={24} className="gx-pl-0">
              <Form.Item label="Country">
                {getFieldDecorator('country_id', {
                  initialValue: country_id,
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Country Name!'
                    }],
                })(<Select style={{width: "100%"}} onChange={this.onCountrySelect}>
                  {/*{Object.keys(this.props.countriesList).map(country => {*/}
                  {/*  return <Option value={country}>{this.props.countriesList[country]}</Option>*/}
                  {/*})}*/}
                </Select>)}
              </Form.Item>
            </Col>
            <Col sm={8} xs={24} className="gx-pr-0">
              <Form.Item label="State">
                {getFieldDecorator('state', {
                  initialValue: state,
                  rules: [{required: true, message: 'Please Enter State Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({state: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={8} xs={24} className="gx-pl-0">
              <Form.Item label="City">
                {getFieldDecorator('city', {
                  initialValue: city,
                  rules: [{required: true, message: 'Please Enter City Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({city: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label="Zip Code">
            {getFieldDecorator('zip_code', {
              initialValue: zip_code,
              rules: [
                {
                  required: true,
                  message: 'Please Enter Zip Code!'
                },
                {
                  pattern: /^[0-9\b]+$/,
                  message: 'Please enter only numerical values'
                }
              ],
            })(<Input type="text" onChange={(e) => {
              this.setState({zip_code: e.target.value})
            }}/>)}
          </Form.Item>
          <div className="gx-d-flex">
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
          </div>
        </Form>
      </div>
    );
  }
}

ThirdStep = Form.create({})(ThirdStep);

export default ThirdStep;