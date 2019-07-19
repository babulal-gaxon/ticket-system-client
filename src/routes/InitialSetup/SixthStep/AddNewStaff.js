import React, {Component} from 'react';
import {Button, Col, Form, Input, Modal, Radio} from "antd";

class AddNewStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      mobile: "",
      hourly_rate: "",
      account_status: 1,
    }
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {first_name, last_name, email, password, mobile, hourly_rate, account_status} = this.state;
    const {showAddModal, onToggleAddModal} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddModal}
          title="Staff Management"
          onCancel={() => onToggleAddModal()}
          footer={[
            <Button key="submit" type="primary" onClick={() => this.props.onMoveToNextStep()}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddModal()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
            <Form.Item label="First Name">
              {getFieldDecorator('first_name', {
                initialValue: first_name,
                rules: [{required: true, message: 'Please Enter First Name!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({first_name: e.target.value})
              }}/>)}
            </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
            <Form.Item label="Last Name">
              {getFieldDecorator('last_name', {
                initialValue: last_name,
                rules: [{required: true, message: 'Please Enter Last Name!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({last_name: e.target.value})
              }}/>)}
            </Form.Item>
              </Col>
            </div>
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
                  {getFieldDecorator('mobile', {
                    initialValue: mobile,
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
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="Password">
                  {getFieldDecorator('password', {
                      initialValue: password,
                      rules: [{
                        required: true,
                        message: 'Please Enter Password!'
                      },
                        {
                          min: 8,
                          message: 'Length should be at least 8 characters long',
                        }] ,
                    })(<Input.Password type="text" onChange={(e) => {
                      this.setState({password: e.target.value})
                    }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label="Hourly Rate">
                  {getFieldDecorator('hourly_rate', {
                    initialValue: hourly_rate,
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: 'Please enter only numerical values',
                    }]
                  })(<Input type="text" addonAfter={<div>$</div>} value={hourly_rate} onChange={(e) => {
                    this.setState({hourly_rate: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
            </div>
            <Form.Item label="Status">
              <Radio.Group value={account_status} onChange={(e) => {
                this.setState({account_status: e.target.value})
              }}>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Disabled</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddNewStaff = Form.create({})(AddNewStaff);

export default AddNewStaff;