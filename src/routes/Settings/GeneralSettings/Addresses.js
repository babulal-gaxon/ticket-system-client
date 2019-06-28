import React, {Component} from 'react';
import {Button, Checkbox, Col, Divider, Form, Input, Row, Select} from "antd/lib/index";
import Widget from "../../../components/Widget";
import {Tag} from "antd";
import InfoView from "../../../components/InfoView";

const {Option} = Select;

class Addresses extends Component {
  constructor(props) {
    super(props);
    if(this.props.generalAddress === null) {
    this.state = {
      address_line_1: "",
      city: "",
      state: "",
      country_id: "",
      zip_code: "",
      address_type: []
    }
  }
    else {
      const {address_line_1,city,state,country_id,zip_code,address_type} = this.props.generalAddress;
      this.state = {
        address_line_1: address_line_1,
        city: city,
        state: state,
        country_id: country_id,
        zip_code: zip_code,
        address_type: address_type
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.generalAddress) {
      const {address_line_1, city, state, country_id, zip_code, address_type} = nextProps.generalAddress;
      if (JSON.stringify(nextProps.generalAddress) !== JSON.stringify(this.props.generalAddress)) {
        this.setState({
          address_line_1: address_line_1,
          city: city,
          state: state,
          country_id: country_id,
          zip_code: zip_code,
          address_type: address_type
        })
      }
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSaveGeneralAddress({...this.state});
      }
    });
  };

  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  onSelectAddressType = checkedList => {
    this.setState({address_type: checkedList})
  };

  render() {
    console.log("address response",this.props.generalSettingsData);
    const {address_line_1, city, state, country_id, zip_code, address_type} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form layout="vertical" style={{width: "50%"}}>
          <Form.Item label="Address">
            {getFieldDecorator('address_line_1', {
              initialValue: address_line_1,
              rules: [{required: true, message: 'Please Enter Address!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({address_line_1: e.target.value})
            }}/>)}
          </Form.Item>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="City">
                {getFieldDecorator('city', {
                  initialVale: city,
                  rules: [{required: true, message: 'Please Enter City Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({city: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="State">
                {getFieldDecorator('state', {
                  initialValue: state,
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
                  initialValue: country_id,
                  rules: [{required: true, message: 'Please Enter Country Name!'}],
                })(<Select style={{width: "100%"}} onChange={this.onCountrySelect}>
                  {Object.keys(this.props.countriesList).map(country => {
                    return <Option value={country}>{this.props.countriesList[country]}</Option>
                  })}
                </Select>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Zip Code">
                {getFieldDecorator('zip_code', {
                  initialValue: zip_code,
                  rules: [{required: true, message: 'Please Enter Zip Code!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({zip_code: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label="Select Department">
            <Checkbox.Group value = {address_type} onChange={this.onSelectAddressType}>
            <Row className="gx-d-flex gx-flex-row" style={{whiteSpace: "nowrap"}}>
              <Col span={8}>
                <Checkbox value="billing">Billing</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="shipping">Shipping</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="other">Other</Checkbox>
              </Col>
            </Row>
            </Checkbox.Group>
          </Form.Item>
          {this.props.generalAddress.addresses.map(address => {
          return  <div className="gx-main-layout-content">
              <Widget styleName="gx-card-filter">
                {address.address_type.map(type => {
                 return <Tag color="#108ee9">{type}</Tag>})}
                <h2>{this.props.generalSettingsData.name}</h2>
                <p>{address.address_line_1}</p>
                <p>{`${address.city}, ${address.state} - ${address.zip_code}`}</p>
              </Widget>
            </div>
          })}
          <Divider/>
          <Form.Item wrapperCol={{span: 12, offset: 6}}>
            <div className="gx-d-flex">
              <Button type="primary" style={{width: 100}} onClick={this.onValidationCheck}>
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
        <InfoView/>
      </div>
    );
  }
}

Addresses = Form.create({})(Addresses);

export default Addresses;