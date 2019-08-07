import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

class EditTicketDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.currentTicket.title,
      content: props.currentTicket.content
    };
  }

  onEditDetails = () => {
    this.props.onUpdateTickets(this.props.currentTicket.id, {...this.state}, this);
    this.props.onToggleEditModal();
  };

  render() {
    const {title, content} = this.state;
    const {showEditModal, onToggleEditModal} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={showEditModal}
          title={<IntlMessages id="tickets.editDetail"/>}
          onCancel={() => onToggleEditModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onEditDetails}>
              <IntlMessages id="tickets.saveChanges"/>
            </Button>,
            <Button key="cancel" onClick={() => onToggleEditModal()}>
              <IntlMessages id="tickets.cancel"/>
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label={<IntlMessages id="tickets.subject"/>}>
              <Input type="text" value={title} onChange={(e) => {
                this.setState({title: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label={<IntlMessages id="tickets.description"/>}>
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

export default injectIntl(EditTicketDetailsModal);

EditTicketDetailsModal.defaultProps = {
  currentTicket: null,
  showEditModal: false
};

EditTicketDetailsModal.propTypes = {
  currentTicket: PropTypes.object,
  showEditModal: PropTypes.bool
};
