import React, {Component} from 'react';
import {Button, Col, Form, Input} from "antd/lib/index";

class SecondStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: ""
    }
  }

  handleConfirmBlur = e => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['password_confirmation'], {force: true});
    }
    callback();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {first_name, last_name, email} = this.state;
    return (
      <div className="gx-flex-column gx-mt-3">
        <Form layout="vertical" style={{width: "70%"}}>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="First Name">
                {getFieldDecorator('first_name', {
                  initialValue: first_name,
                  rules: [{
                      required: true,
                      message: 'Please Enter First Name!'
                    }],
                })(<Input type="text" onChange={(e) => this.setState({first_name: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Last Name">
                {getFieldDecorator('last_name', {
                  initialValue: last_name,
                  rules: [{
                    required: true,
                    message: 'Please Enter Last Name!'
                  }],
                })(<Input type="text" onChange={(e) => this.setState({last_name: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
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
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(<Input.Password onChange={(e) => this.setState({password: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm_password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input.Password onBlur={this.handleConfirmBlur}
                                   onChange={(e) => this.setState({confirm_password: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
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

SecondStep = Form.create({})(SecondStep);

export default SecondStep;