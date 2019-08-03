import React, {Component} from 'react';
import {Button, Form, Input, Modal, Radio} from "antd/lib/index";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {TextArea} = Input;

class AddNewService extends Component {
  constructor(props) {
    super(props);
    if (props.currentService === null) {
      this.state = {
        title: "",
        desc: "",
        support_enable: 1
      };
    } else {
      const selectedService = props.currentService;
      this.state = {...selectedService};
    }
  };

  onServiceAdd = () => {
    if (this.props.currentService === null) {
      this.props.onAddService({...this.state});
      this.props.onToggleAddService();

    } else {
      this.props.onEditService({...this.state});
      this.props.onToggleAddService();
    }
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onServiceAdd();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, support_enable, desc} = this.state;
    const {showAddModal, onToggleAddService} = this.props;
    const {messages} = this.props.intl;

    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddModal}
          title={this.props.currentService === null ? <IntlMessages id="services.new"/> : <IntlMessages id="services.edit"/>}
          onCancel={() => onToggleAddService()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddService()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.title"/>}>
              {getFieldDecorator('title', {
                initialValue: title,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.services.title"]}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.description"/>}>
              {getFieldDecorator('desc', {
                initialValue: desc,
                validateTrigger: 'onBlur',
                rules: [{
                  max: 250,
                  message: messages["validation.message.messageLength"],
                }],
              })(
                <TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                  this.setState({desc: e.target.value})
                }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.supportEnable"/>}>
              <Radio.Group value={support_enable} onChange={(e) => {
                this.setState({support_enable: e.target.value})
              }}>
                <Radio value={1}>{<IntlMessages id="common.enable"/>}</Radio>
                <Radio value={0}>{<IntlMessages id="common.disable"/>}</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddNewService = Form.create({})(AddNewService);

export default injectIntl(AddNewService);


AddNewService.defaultProps = {
  servicesList: [],
  currentService: null,
  showAddModal: true
};

AddNewService.propTypes = {
  servicesList: PropTypes.array,
  currentService: PropTypes.number,
  showAddModal: PropTypes.bool,
  onToggleAddService: PropTypes.func,
  onAddService: PropTypes.func,
  onEditService: PropTypes.func
};
