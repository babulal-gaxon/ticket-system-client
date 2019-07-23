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
        this.props.onClosePinModal();
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
          title="Reset Password"
          onCancel={() => onClosePinModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Verify
            </Button>,
            <Button key="cancel" onClick={() => onClosePinModal()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Pin" hasFeedback>
              {getFieldDecorator('pin_number', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the Pin!',
                  },
                ],
              })(<Input onChange={(e) => this.setState({pin_number: e.target.value})}/>)}
            </Form.Item>
          </Form>
          <span onClick={() => this.props.onResendPin()}>Resend Pin</span>
        </Modal>
      </div>
    );
  }
}

VerificationModal = Form.create({})(VerificationModal);

export default VerificationModal;