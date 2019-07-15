import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd/lib/index";
import PropTypes from "prop-types";

const {TextArea} = Input;

class AddNewResponses extends Component {
  constructor(props) {
    super(props);
    if (this.props.responseId === 0) {
      this.state = {
        short_title: "",
        short_code: "",
        message: "",
        status: 1
      };
    } else {
      const selectedResponse = this.props.responses.find(response => response.id === this.props.responseId);
      this.state = {
        ...selectedResponse
      };
    }
  };

  onResponseAdd = () => {
    if (this.props.responseId === 0) {
      this.props.onAddCannedResponse({...this.state});
      this.props.onToggleAddCanned();
    } else {
      this.props.onEditCannedResponse({...this.state});
      this.props.onToggleAddCanned();
    }
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onResponseAdd();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {status, short_title, short_code, message} = this.state;
    const {showAddCanned, onToggleAddCanned} = this.props;
    return (
      <div>
        <Modal
          visible={showAddCanned}
          title={this.props.responseId === 0 ? "Add New Response" : "Edit Response Details"}
          onCancel={() => onToggleAddCanned()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddCanned()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Short Title">
              {getFieldDecorator('short_title', {
                initialValue: short_title,
                rules: [{required: true, message: 'Please Enter Short Title!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({short_title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Short Code">
              {getFieldDecorator('short_code', {
                initialValue: short_code,
                rules: [{required: true, message: 'Please Enter Short Code!'}],
              })(<Input type="text" onChange={(e) => {
                this.setState({short_code: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Message">
              {getFieldDecorator('message', {
                initialValue: message,
                rules: [{
                  required: true,
                  message: 'Please Enter Message!'
                },
                  {
                    min: 30,
                    message: 'Message should be at least 30 characters long',
                  }
                ],
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({message: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Status">
              <Radio.Group value={status} onChange={(e) => {
                this.setState({status: e.target.value})
              }}>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Disabled</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}


AddNewResponses = Form.create({})(AddNewResponses);

export default AddNewResponses;


AddNewResponses.defaultProps = {
  showAddCanned: true,
  responseId: 0,
  responses: []
};

AddNewResponses.propTypes = {
  showAddCanned: PropTypes.bool,
  responseId: PropTypes.number,
  responses: PropTypes.array,
  onToggleAddCanned: PropTypes.func,
  onAddCannedResponse: PropTypes.func,
  onEditCannedResponse: PropTypes.func
};