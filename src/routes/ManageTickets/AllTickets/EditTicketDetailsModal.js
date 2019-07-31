import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";
import PropTypes from "prop-types";

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
    const {getFieldDecorator} = this.props.form;
    const {title, content} = this.state;
    const {showEditModal, onToggleEditModal} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showEditModal}
          title="Edit Detail"
          onCancel={() => onToggleEditModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onEditDetails}>
              Save Changes
            </Button>,
            <Button key="cancel" onClick={() => onToggleEditModal()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="Subject">
              {getFieldDecorator('name', {
                initialValue: title,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please enter Title!'}],
              })(<Input type="text" autoFocus placeholder="Title" onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>)}
            </Form.Item>
            <Form.Item label="Description">
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
export default EditTicketDetailsModal;

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
