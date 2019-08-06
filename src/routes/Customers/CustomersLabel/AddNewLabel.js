import React, {Component} from 'react';
import {Button, Form, Input, Modal, Radio} from "antd/lib/index";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {TextArea} = Input;

class AddNewLabel extends Component {
  constructor(props) {
    super(props);
    if (props.label === null) {
      this.state = {
        name: "",
        desc: "",
        status: 1,
      };
    } else {
      this.state = {...props.label};
    }
  }

  onSaveData = () => {
    if (this.props.label === null) {
      this.props.onAddLabelsData({...this.state}, this);
    } else {
      this.props.onEditLabelsData({...this.state}, this);
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
    const {messages} = this.props.intl;
    const {getFieldDecorator} = this.props.form;
    const {showAddLabel, onToggleModalState} = this.props;
    const {name, desc, status} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddLabel}
          title={this.props.label === null ? <IntlMessages id="labels.addNew"/> :
            <IntlMessages id="labels.editDetail"/>}
          onCancel={() => onToggleModalState()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleModalState()}>
              <IntlMessages id="common.cancel"/>
            </Button>
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.name"/>}>
              {getFieldDecorator('name', {
                initialValue: name,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.labels.name"]}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({name: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.description"/>}>
              {getFieldDecorator('description', {
                initialValue: desc,
                validate: [{
                  trigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: messages["validation.labels.description"]
                    },
                  ],
                }, {
                  trigger: 'onChange',
                  rules: [
                    {
                      max: 250,
                      message: messages["common.descriptionLength"]
                    },
                  ],
                }],
              })(<TextArea rows={4} onChange={(e) => {
                this.setState({desc: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="labels.setPriority"/>}>
              <Radio.Group value={status} onChange={(e) => {
                this.setState({status: e.target.value})
              }}>
                <Radio value={1}><IntlMessages id="common.active"/></Radio>
                <Radio value={0}><IntlMessages id="common.disabled"/></Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddNewLabel = Form.create({})(AddNewLabel);

export default injectIntl(AddNewLabel);

