import React, {Component} from 'react';
import {Button, Col, Form, Input} from "antd/lib/index";
import {connect} from "react-redux";
import {
  onClosePinModal,
  onOpenPinModal,
  onResendPin,
  onSendSuperAdminInfo,
  onVerifyByPin
} from "../../../appRedux/actions/InitialSetup";
import VerificationModal from "./VerificationModal";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

class SecondStep extends Component {
  constructor(props) {
    super(props);
    if (props.initialSteps.completed_steps && props.initialSteps.completed_steps.admin_account_setup) {
      const {email, first_name, last_name} = props.initialSteps.completed_steps.admin_account_setup;
      this.state = {
        email: email,
        first_name: first_name,
        last_name: last_name
      }
    } else {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      }
    }
  }

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

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSendSuperAdminInfo({...this.state}, this);
      }
    });
  };

  onVerifyEmail = (pin) => {
    this.props.onVerifyByPin({pin_number: pin, email: this.state.email}, this.props.onMoveToNextStep);
  };

  onRequestPinAgain = () => {
    this.props.onResendPin({email: this.state.email}, this)
  };


  render() {
    const {messages} = this.props.intl;
    const {getFieldDecorator} = this.props.form;
    const {first_name, last_name, email} = this.state;
    return (
      <div className="gx-flex-column gx-mt-3">
        <Form layout="vertical" style={{width: "70%"}}>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label={<IntlMessages id="common.firstName"/>}>
                {getFieldDecorator('first_name', {
                  initialValue: first_name,
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    message: messages["validation.message.firstName"]
                  }],
                })(<Input type="text" autoFocus
                          readOnly={this.props.initialSteps.completed_steps &&
                          this.props.initialSteps.completed_steps.account_verification_setup}
                          onChange={(e) => this.setState({first_name: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label={<IntlMessages id="common.lastName"/>}>
                {getFieldDecorator('last_name', {
                  initialValue: last_name,
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    message: messages["validation.message.lastName"]
                  }],
                })(<Input type="text" readOnly={this.props.initialSteps.completed_steps &&
                this.props.initialSteps.completed_steps.account_verification_setup}
                          onChange={(e) => this.setState({last_name: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label={<IntlMessages id="common.emailAddress"/>}>
            {getFieldDecorator('email', {
              initialValue: email,
              validate: [{
                trigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: messages["validation.message.email"]
                  },
                ],
              }, {
                trigger: 'onChange',
                rules: [
                  {
                    type: 'email',
                    message: messages["validation.message.emailFormat"]
                  },
                ],
              }],
            })(<Input type="text" readOnly={this.props.initialSteps.completed_steps &&
            this.props.initialSteps.completed_steps.account_verification_setup}
                      onChange={(e) => {
                        this.setState({email: e.target.value})
                      }}/>)}
          </Form.Item>
          {(this.props.initialSteps.completed_steps && !this.props.initialSteps.completed_steps.account_verification_setup) ?
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label={<IntlMessages id="common.password"/>} hasFeedback>
                  {getFieldDecorator('password',
                    {
                      validateTrigger: 'onBlur',
                      rules: [
                        {
                          required: true,
                          message: messages["validation.message.inputPassword"]
                        },
                        {
                          validator: this.validateToNextPassword,
                        },
                        {
                          min: 8,
                          message: messages["validation.message.passwordLength"]
                        }],
                    })(<Input.Password onChange={(e) => this.setState({password: e.target.value})}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="app.userAuth.confirmPassword"/>} hasFeedback>
                  {getFieldDecorator('password_confirmation', {
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: messages["validation.message.confirmPassword"]
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur}
                                     onChange={(e) => this.setState({password_confirmation: e.target.value})}/>)}
                </Form.Item>
              </Col>
            </div> : null}
          <div className="gx-d-flex">
            <Button type="default" onClick={() => {
              this.props.onMoveToPrevStep();
              this.props.onFormOpen()
            }}><IntlMessages id="common.previous"/></Button>
            <Button type="primary"
                    onClick={this.props.initialSteps.completed_steps &&
                    this.props.initialSteps.completed_steps.account_verification_setup ?
                      () => this.props.onMoveToNextStep() : this.onValidationCheck}
            ><IntlMessages id="common.next"/></Button>
            {!this.props.initialSteps.completed_steps || (this.props.initialSteps.completed_steps &&
              this.props.initialSteps.completed_steps.account_verification_setup) ? null :
              <Button type="default" disabled={(this.props.initialSteps.completed_steps &&
                !this.props.initialSteps.completed_steps.admin_account_setup)}
                      onClick={() => this.props.onOpenPinModal()}><IntlMessages id="setup.verifyPin"/></Button>}
          </div>
        </Form>
        {this.props.showPinModal ? <VerificationModal showPinModal={this.props.showPinModal}
                                                      onClosePinModal={this.props.onClosePinModal}
                                                      onVerifyEmail={this.onVerifyEmail}
                                                      onResendPin={this.onRequestPinAgain}
        /> : null}
      </div>
    );
  }
}

SecondStep = Form.create({})(SecondStep);

const mapStateToProps = ({initialSetup}) => {
  const {showPinModal} = initialSetup;
  return {showPinModal};
};


export default connect(mapStateToProps, {
  onSendSuperAdminInfo, onClosePinModal, onVerifyByPin, onResendPin, onOpenPinModal
})(injectIntl(SecondStep));
