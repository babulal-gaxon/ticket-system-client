import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

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
    const {messages} = this.props.intl;
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
            <h2 style={{fontSize: 28}}><IntlMessages id="setup.verifyPin.heading"/></h2>
            <p style={{textAlign: "center", color: "#8C8C8C"}} className="gx-py-5"><IntlMessages id="setup.verifyPin.message"/></p>
            <Form layout="vertical" style={{textAlign: "center"}}>
              <label><IntlMessages id="setup.verifyPin.enter"/> <sup className="gx-text-red">*</sup></label>
              <Form.Item hasFeedback className="gx-py-4">
                {getFieldDecorator('pin_number', {
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: messages["validation.verifyPin.pinInput"],
                    },
                    {
                      max: 6,
                      message:  messages["validation.verifyPin.pinLength"],
                    },
                    {
                      pattern: /^[0-9\b]+$/,
                      message: messages["validation.message.numericalValues"]
                    }
                  ],
                })(<Input onChange={(e) => this.setState({pin_number: e.target.value})}/>)}
              </Form.Item>
            </Form>
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.verify"/>
            </Button>,
            <Button key="cancel" onClick={() => onClosePinModal()}>
              <IntlMessages id="common.back"/>
            </Button>,
            <p><IntlMessages id="setup.verifyPin.notReceived"/> <Button type="link" className="gx-my-0"
                                           onClick={() => this.props.onResendPin()}><IntlMessages id="common.resend"/></Button></p>
          </div>
        </Modal>
      </div>
    );
  }
}

VerificationModal = Form.create({})(VerificationModal);

export default injectIntl(VerificationModal);
