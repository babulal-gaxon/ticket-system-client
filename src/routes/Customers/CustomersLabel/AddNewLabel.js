import React, {Component} from 'react';
import {Button, Form, Input, Modal, Radio} from "antd/lib/index";

const {TextArea} = Input;

class AddNewLabel extends Component {
  constructor(props) {
    super(props);
    if (this.props.labelId === null) {
      this.state = {
        name: "",
        desc: "",
        status: 1,
      };
    } else {
      const selectedLabel = this.props.labelList.find(label => label.id === this.props.labelId);
      this.state = {...selectedLabel};
    }
  }

  onSaveData = () => {
    if (this.props.labelId === null) {
      this.props.onAddLabelsData({...this.state});
    } else {
      this.props.onEditLabelsData({...this.state});
    }
    this.props.onToggleModalState();
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSaveData();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {showAddLabel, onToggleModalState} = this.props;
    const {name, desc, status} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddLabel}
          title={this.props.labelId === null ? "Add New Label" : "Edit Label Details"}
          onCancel={() => onToggleModalState()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onToggleModalState()}>
              Cancel
            </Button>
          ]}>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('name', {
                initialValue: name,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please input Name!'}],
              })(<Input type="text" autoFocus placeholder="Name" onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                initialValue: desc,
                validate: [{
                  trigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Description!'
                    },
                  ],
                }, {
                  trigger: 'onChange',
                  rules: [
                    {
                      max: 250,
                      message: 'Description length should not exceed 250 characters'
                    },
                  ],
                }],
              })(<TextArea rows={4} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={"Set Priority"}>
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
    );
  }
}

AddNewLabel = Form.create({})(AddNewLabel);

export default AddNewLabel;

