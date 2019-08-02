import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

class ResetCustomerPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password_confirmation: "",
      password: ""
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onResetPassword(this.props.currentCustomer, {...this.state});
        this.props.onTogglePasswordModal();
      }
    });
  };

  handleConfirmBlur = e => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const {messages} = this.props.intl;
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(messages["validation.message.inconsistentPassword"]);
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
    const {resetPasswordModal, onTogglePasswordModal} = this.props;
    const {messages} = this.props.intl;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={resetPasswordModal}
          title={<IntlMessages id="app.userAuth.resetPassword"/>}
          onCancel={() => onTogglePasswordModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onTogglePasswordModal()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.password"/>} hasFeedback>
              {getFieldDecorator('password', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: messages["validation.message.inputPassword"],
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password autoFocus onChange={(e) => this.setState({password: e.target.value})}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="app.userAuth.confirmPassword"/>} hasFeedback>
              {getFieldDecorator('password_confirmation', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: messages["validation.message.confirmPassword"],
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur}
                                 onChange={(e) => this.setState({password_confirmation: e.target.value})}/>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

ResetCustomerPassword = Form.create({})(ResetCustomerPassword);

export default injectIntl(ResetCustomerPassword);

ResetCustomerPassword.defaultProps = {
  resetPasswordModal: false,
  currentCustomer: null
};

ResetCustomerPassword.propTypes = {
  resetPasswordModal: PropTypes.bool,
  currentCustomer: PropTypes.number
};
