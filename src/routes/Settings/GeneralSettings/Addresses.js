import React, {Component} from 'react';
import {Button, Checkbox, Col, Divider, Form, Input, Row, Select} from "antd/lib/index";
import Widget from "../../../components/Widget";
import {Tag} from "antd";
import InfoView from "../../../components/InfoView";

const {Option} = Select;

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address_line_1: "",
      city: "",
      state: "",
      country_id: "",
      zip_code: "",
      departments: "",
      addressToSend: [],
      isBillingAddress: false,
      isShippingAddress: false,
      isOtherAddress: false
    }
  }


  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSaveGeneralAddress({addresses: this.state.addressToSend});
      }
    });
  };

  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  onSelectDepartments = checkedList => {
    this.setState({departments: checkedList}, () => {
      this.onDataAdd(this.state.departments)
    })
  };

  // onDataAdd = departments => {
  //   const {address_line_1,city,state,country_id,zip_code, addressToSend} = this.state;
  //
  //     if(addressToSend.length > 0)
  //     {
  //      addressToSend.map(address => {
  //        if(departments.indexOf(address.address_type) === -1)
  //      })
  //     }
  //     this.setState({addressToSend: this.state.addressToSend.concat({address_line_1,city,state,country_id, zip_code,address_type:department})})
  //   })
  // };

  onBillingAddress = event => {
    const {address_line_1, city, state, country_id, zip_code, addressToSend} = this.state;
    if (event.target.checked) {
      this.setState({isBillingAddress: true});
      if (addressToSend.length > 0) {
        addressToSend.map(address => {
          if (address.address_type !== event.target.value) {
            this.setState({
              addressToSend: addressToSend.concat({
                address_line_1,
                city,
                state,
                country_id,
                zip_code,
                address_type: event.target.value
              })
            })
          }
          else return null;
        })
      } else {
        this.setState({
          addressToSend: addressToSend.concat({
            address_line_1,
            city,
            state,
            country_id,
            zip_code,
            address_type: event.target.value
          })
        })
      }
    } else {
      this.setState({isBillingAddress: false});
      if (addressToSend.length > 0) {
        addressToSend.map(address => {
          if (address.address_type === event.target.value) {
            this.setState({addressToSend: addressToSend.filter(address => address.address_type !== event.target.value)});
          }
        })
      }
    }
  };

  render() {
    const {address_line_1, city, state, country_id, zip_code, departments, isBillingAddress, isShippingAddress, isOtherAddress} = this.state;
    const {getFieldDecorator} = this.props.form;
    console.log("state", this.state.addressToSend);
    console.log("add to sen", this.state.isBillingAddress);
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
            <Row className="gx-d-flex gx-flex-row" style={{whiteSpace: "nowrap"}}>
              <Col span={8}>
                <Checkbox value="billing" checked={isBillingAddress} onChange={this.onBillingAddress}>Billing</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="shipping">Shipping</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="other">Other</Checkbox>
              </Col>
            </Row>
          </Form.Item>
          <div className="gx-main-layout-content">
            <Widget styleName="gx-card-filter">
              <Tag color="blue">generalAddress</Tag>
              <h2>Company Name</h2>
              <p>address_line_1</p>
              <p>city, state - zipcode</p>
            </Widget>
          </div>
          <Divider/>
          <Form.Item wrapperCol={{span: 12, offset: 6}}>
            <div className="gx-d-flex">
              <Button type="primary" style={{width: 100}} onClick={this.onValidationCheck}>
                Save
              </Button>
              <Button type="default" style={{width: 100}}>
                Cancel
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