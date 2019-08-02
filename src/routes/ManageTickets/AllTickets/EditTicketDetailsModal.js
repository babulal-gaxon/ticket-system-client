import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {TextArea} = Input;

class EditTicketDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.currentTicket.title,
      content: props.currentTicket.content
    };
  }

  onEditDetails = () => {
    this.props.onUpdateTickets(this.props.ticketId, {...this.state});
    this.props.onToggleEditModal();
  };

  render() {
    const {messages} = this.props.intl;
    const {getFieldDecorator} = this.props.form;
    const {title, content} = this.state;
    const {showEditModal, onToggleEditModal} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showEditModal}
          title={<IntlMessages id="common.editDetails"/>}
          onCancel={() => onToggleEditModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onEditDetails}>
              <IntlMessages id="common.saveChanges"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleEditModal()}>
              <IntlMessages id="common.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="common.subject"/>}>
              {getFieldDecorator('name', {
                initialValue: title,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please enter Title!'}],
              })(<Input type="text" autoFocus placeholder={messages["common.title"]} onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label={<IntlMessages id="common.description"/>}>
              {getFieldDecorator('content', {
                initialValue: content,
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
                this.setState({content: e.target.value})
              }}/>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

EditTicketDetailsModal = Form.create({})(EditTicketDetailsModal);
export default injectIntl(EditTicketDetailsModal);

EditTicketDetailsModal.defaultProps = {
  currentTicket: null,
  showEditModal: false,
  ticketId: null
};

EditTicketDetailsModal.propTypes = {
  currentTicket: PropTypes.object,
  showEditModal: PropTypes.bool,
  ticketId: PropTypes.number,
};
