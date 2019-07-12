import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";

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
    const {title, content} = this.state;
    const {showEditModal, onToggleEditModal} = this.props;
    return (
      <div>
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
              <Input type="text" value={title} onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Description">
              <Input type="text" value={content} onChange={(e) => {
                this.setState({content: e.target.value})
              }}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default EditTicketDetailsModal;