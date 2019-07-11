import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";

class ResetCustomerPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: "",
      newPassword: ""
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {

      }
    });
  };

  handleConfirmBlur = e => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], {force: true});
    }
    callback();
  };

  render() {
    console.log(this.state.newPassword, this.state.confirmPassword);
    const {getFieldDecorator} = this.props.form;
    const {resetPasswordModal, onTogglePasswordModal} = this.props;
    return (
      <div>
        <Modal
          visible={resetPasswordModal}
          title="Reset Password"
          onCancel={() => onTogglePasswordModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onTogglePasswordModal()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password onChange={(e) => this.setState({newPassword: e.target.value})}/>)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirmPassword', {
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
                                 onChange={(e) => this.setState({confirmPassword: e.target.value})}/>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

ResetCustomerPassword = Form.create({})(ResetCustomerPassword);

export default ResetCustomerPassword;