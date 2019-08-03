import React, {Component} from "react"
import {Button, Form, Input, Modal, Radio} from "antd/lib/index";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {TextArea} = Input;

class AddNewResponses extends Component {
  constructor(props) {
    super(props);
    if (props.currentResponse === null) {
      this.state = {
        short_title: "",
        short_code: "",
        message: "",
        status: 1
      };
    } else {
      const selectedResponse = props.currentResponse;
      this.state = {
        ...selectedResponse
      };
    }
  };

  onResponseAdd = () => {
    if (this.props.currentResponse === null) {
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
    const {messages} = this.props.intl;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showAddCanned}
          title={this.props.currentResponse === null ? <IntlMessages id="responses.new"/> : <IntlMessages id="responses.edit"/>}
          onCancel={() => onToggleAddCanned()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              <IntlMessages id="common.save"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleAddCanned()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label= {<IntlMessages id="responses.shortTitle"/>}>
              {getFieldDecorator('short_title', {
                initialValue: short_title,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.responses.shortTitle"]}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({short_title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="responses.shortCode"/>}>
              {getFieldDecorator('short_code', {
                initialValue: short_code,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: messages["validation.responses.shortCode"]}],
              })(<Input type="text" onChange={(e) => {
                this.setState({short_code: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.message"/>}>
              {getFieldDecorator('message', {
                initialValue: message,
                validate: [{
                  trigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: messages["validation.message.message"]
                    },
                  ],
                }, {
                  trigger: 'onChange',
                  rules: [
                    {
                      max: 250,
                      message: messages["validation.message.messageLength"]
                    },
                  ],
                }],
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({message: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.status"/>}>
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
    )
  }
}


AddNewResponses = Form.create({})(AddNewResponses);

export default injectIntl(AddNewResponses);


AddNewResponses.defaultProps = {
  showAddCanned: true,
  currentResponse: null,
  responses: []
};

AddNewResponses.propTypes = {
  showAddCanned: PropTypes.bool,
  currentResponse: PropTypes.object,
  responses: PropTypes.array,
  onToggleAddCanned: PropTypes.func,
  onAddCannedResponse: PropTypes.func,
  onEditCannedResponse: PropTypes.func
};
