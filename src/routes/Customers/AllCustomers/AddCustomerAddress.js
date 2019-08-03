import React, {Component} from 'react';
import {Checkbox, Col, Form, Input, Modal, Row, Select} from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

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
    this.setState({
      address_type: checkedList
    })
  };

  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  handleSearch = value => {
    return this.props.countriesList.filter(country => country.name.indexOf(value) !== -1)
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        if (this.props.selectedAddress === null) {
          this.props.onSaveAddress({...this.state}, this.props.context);
        } else {
          this.props.onEditAddress({...this.state}, this.props.context)
        }
        this.props.onToggleAddressModal();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {messages} = this.props.intl;
    const {address_line_1, city, state, country_id, zip_code, address_type} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Modal
          title={this.props.selectedAddress === null ? <IntlMessages id="customer.address.addNew"/> :
            <IntlMessages id="customer.address.edit"/>}
          centered
          visible={this.props.isModalVisible}
          onOk={this.onValidationCheck}
          onCancel={() => this.props.onToggleAddressModal()}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.address"/>}>
              {getFieldDecorator('address_line_1', {
                validateTrigger: 'onBlur',
                initialValue: address_line_1,
                rules: [{required: true, message: messages["validation.message.address"]}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({address_line_1: e.target.value})
              }}/>)}
            </Form.Item>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label={<IntlMessages id="common.city"/>}>
                  {getFieldDecorator('city', {
                    initialValue: city,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.city"]}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({city: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="common.state"/>}>
                  {getFieldDecorator('state', {
                    initialValue: state,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.state"]}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({state: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label={<IntlMessages id="common.country"/>}>
                  {getFieldDecorator('country_id', {
                    initialValue: country_id,
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: messages["validation.message.country"]
                      }
                    ],
                  })(<Select
                    style={{width: "100%"}}
                    placeholder={messages["customer.address.countrySelect"]}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={this.onCountrySelect}
                    notFoundContent={null}
                  >
                    {this.props.countriesList.map(country => {
                      return <Option value={country.id} key={country.id}>{country.name}</Option>
                    })}
                  </Select>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="common.zip"/>}>
                  {getFieldDecorator('zip_code', {
                    initialValue: zip_code,
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: messages["validation.message.zip"]
                      },
                      {
                        pattern: /^[0-9\b]+$/,
                        message: messages["validation.message.numericalValues"]
                      }
                    ],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({zip_code: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <Form.Item label={<IntlMessages id="manageTickets.selectDepartments"/>}>
              {getFieldDecorator('address_type', {
                initialValue: address_type,

                rules: [
                  {
                    required: true,
                    message: messages["validation.message.addressType"]
                  }],
              })(<Checkbox.Group onChange={this.onSelectAddressType}>
                <Row className="gx-d-flex gx-flex-row" style={{whiteSpace: "nowrap"}}>
                  <Col span={8}>
                    <Checkbox value="Billing"><IntlMessages id="common.billing"/></Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Shipping"><IntlMessages id="common.shipping"/></Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Other"><IntlMessages id="common.other"/></Checkbox>
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

export default injectIntl(AddCustomerAddress);

AddCustomerAddress.defaultProps = {
  isModalVisible: false,
  countriesList: []
};

AddCustomerAddress.propTypes = {
  isModalVisible: PropTypes.bool,
  countriesList: PropTypes.array
};
