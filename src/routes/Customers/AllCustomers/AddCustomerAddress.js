import React, {Component} from 'react';
import {Checkbox, Col, Form, Input, Modal, Row, Select} from "antd";
import PropTypes from "prop-types";

const {Option} = Select;

class AddCustomerAddress extends Component {
  constructor(props) {
    super(props);
    if (props.selectedAddress === null) {
      this.state = {
        address_line_1: "",
        city: "",
        state: "",
        country_id: "",
        zip_code: "",
        address_type: []
      }
    } else {
      this.state = {...props.selectedAddress}
    }
  }

  onSelectAddressType = checkedList => {
    console.log("chekdlist", checkedList)
    this.setState({
      address_type: checkedList
    })
  };

  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  handleSearch = value => {
    return Object.keys(this.props.countriesList).filter(country => this.props.countriesList[country].indexOf(value) !== -1)
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        if (this.props.selectedAddress === null) {
          this.props.onSaveAddress({...this.state});
        } else {
          this.props.onEditAddress({...this.state})
        }
        this.props.onToggleAddressModal();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {address_line_1, city, state, country_id, zip_code, address_type} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Modal
          title="Add Address"
          centered
          visible={this.props.isModalVisible}
          onOk={this.onValidationCheck}
          onCancel={() => this.props.onToggleAddressModal()}>
          <Form layout="vertical">
            <Form.Item label="Address">
              {getFieldDecorator('address_line_1', {
                validateTrigger: 'onBlur',
                initialValue: address_line_1,
                rules: [{required: true, message: 'Please Enter Address!'}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({address_line_1: e.target.value})
              }}/>)}
            </Form.Item>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="City">
                  {getFieldDecorator('city', {
                    initialValue: city,
                    validateTrigger: 'onBlur',
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
                    validateTrigger: 'onBlur',
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
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter Country Name!'
                      }
                    ],
                  })(<Select
                    style={{width: "100%"}}
                    showSearch
                    placeholder="Type to search Country"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={this.handleSearch}
                    onChange={this.onCountrySelect}
                    notFoundContent={null}
                  >
                    {Object.keys(this.props.countriesList).map(country => {
                      return <Option value={country} key={country}>{this.props.countriesList[country]}</Option>
                    })}
                  </Select>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label="Zip Code">
                  {getFieldDecorator('zip_code', {
                    initialValue: zip_code,
                    validateTrigger: 'onBlur',
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
              </Col>
            </div>
            <Form.Item label="Select Department">
              {getFieldDecorator('address_type', {
                initialValue: address_type,

                rules: [
                  {
                    required: true,
                    message: 'Please Select Address Type'
                  }],
              })(<Checkbox.Group onChange={this.onSelectAddressType}>
                <Row className="gx-d-flex gx-flex-row" style={{whiteSpace: "nowrap"}}>
                  <Col span={8}>
                    <Checkbox value="Billing">Billing</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Shipping">Shipping</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Other">Other</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddCustomerAddress = Form.create({})(AddCustomerAddress);

export default AddCustomerAddress;

AddCustomerAddress.defaultProps = {
  isModalVisible: false,
  countriesList: {}
};

AddCustomerAddress.propTypes = {
  isModalVisible: PropTypes.bool,
  countriesList: PropTypes.object
};