import React, {Component} from 'react';
import {Checkbox, Col, Form, Input, Modal, Row} from "antd";

class AddCustomerAddress extends Component {
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
  }

  onSelectDepartments = checkedList => {
    this.setState({
      department_id: checkedList
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {address_line_1, city, state, country_id, zip_code, department_id} = this.state;
    return (
      <div>
        <Modal
          title="Add Address"
          centered
          visible={this.props.isModalVisible}
          onOk={() => this.props.onToggleAddressModal()}
          onCancel={() => this.props.onToggleAddressModal()}>
          <Form layout="vertical">
            <Form.Item label="Address">
              {getFieldDecorator('address_line_1', {
                rules: [{required: true, message: 'Please Enter Address!'}],
              })(<Input type="text" value={address_line_1} onChange={(e) => {
                this.setState({address_line_1: e.target.value})
              }}/>)}
            </Form.Item>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="City">
                  {getFieldDecorator('city', {
                    rules: [{required: true, message: 'Please Enter City Name!'}],
                  })(<Input type="text" value={city} onChange={(e) => {
                    this.setState({city: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label="State">
                  {getFieldDecorator('state', {
                    rules: [{required: true, message: 'Please Enter State Name!'}],
                  })(<Input type="text" value={state} onChange={(e) => {
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
                  })(<Input type="text" value={country_id} onChange={(e) => {
                    this.setState({country_id: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label="Zip Code">
                  {getFieldDecorator('zip_code', {
                    rules: [{required: true, message: 'Please Enter Zip Code!'}],
                  })(<Input type="text" value={zip_code} onChange={(e) => {
                    this.setState({zip_code: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
                <Form.Item label="Select Department">
                  <Checkbox.Group onChange={this.onSelectDepartments} value={department_id}>
                    <Row className="gx-d-flex gx-flex-row ">
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
                  </Checkbox.Group>
                </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddCustomerAddress = Form.create({})(AddCustomerAddress);

export default AddCustomerAddress;