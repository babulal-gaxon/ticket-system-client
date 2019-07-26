import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";

class VerificationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin_number: null
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onVerifyEmail(this.state.pin_number);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {showPinModal, onClosePinModal} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          maskClosable={false}
          visible={showPinModal}
          onCancel={() => onClosePinModal()}
          footer={[
            null,
            null,
          ]}
        >
          <div style={{padding: 45, textAlign: "center"}}>
            {/*<I></I>*/}
            <h2 style={{fontSize: 28}}>Verify Your Email</h2>
            <p style={{textAlign: "center", color: "#8C8C8C"}} className="gx-py-5">Enter the 6 digit verification code
              sent to your email address super@example.com to verify your account.</p>
            <Form layout="vertical" style={{textAlign: "center"}}>
              <label>Enter Verification Code <sup className="gx-text-red">*</sup></label>
              <Form.Item hasFeedback className="gx-py-4">
                {getFieldDecorator('pin_number', {
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Please input the Pin!',
                    },
                    {
                      max: 6,
                      message: 'Please enter only 6 digits'
                    },
                    {
                      pattern: /^[0-9\b]+$/,
                      message: 'Please enter only numerical values'
                    }
                  ],
                })(<Input onChange={(e) => this.setState({pin_number: e.target.value})}/>)}
              </Form.Item>
            </Form>
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Verify
            </Button>,
            <Button key="cancel" onClick={() => onClosePinModal()}>
              Back
            </Button>,
            <p>Not received email? <Button type="link" className="gx-my-0"
                                           onClick={() => this.props.onResendPin()}>Resend</Button></p>
          </div>
        </Modal>
      </div>
    );
  }
}

VerificationModal = Form.create({})(VerificationModal);

export default VerificationModal;
