import React, {Component} from "react"
import {Col, Row} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import ConversationCell from "../../../components/todo/ToDoDetail/ConversationCell";

class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: this.props.ticket,
      title: "",
      message: '',
      conversation:[]
    }
  };
  // onEditTitle = () => {
  //   if (this.state.editTitle) {
  //     const ticket = this.state.ticket;
  //     ticket.title = this.state.title;
  //     this.props.onUpdateTickets(ticket)
  //   }
  //   this.setState({
  //     editTitle: !this.state.editTitle
  //   });
  // };

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitComment();
    }
  };

  submitComment() {
    if (this.state.message !== '') {
      const updatedConversation = this.state.conversation.concat({
        'name': this.props.user.name,
        'thumb': this.props.user.avatar,
        'message': this.state.message,
        // 'sentAt': Moment().format('ddd DD, YYYY, hh:mm:ss A'),
      });
      this.setState({
        conversation: updatedConversation,
        message: '',
      });
    }
  }

  updateMessageValue(evt) {
    this.setState({
      message: evt.target.value
    });
  }

  render() {
    const {ticket, conversation} = this.state;
    console.log("in ticket detail", ticket)
    return (
      <div className="gx-main-layout-content">
      <Widget
        title={<i className="gx-icon-btn icon icon-arrow-left" onClick={this.props.onBackToList}/>}>
                <div className="gx-module-detail-item gx-module-detail-header">
                  <Row>
                    <Col xs={18} sm={12} md={17} lg={12} xl={17}>
                      <div>
                      <div className="gx-flex-row">
                        <div className="gx-user-name gx-mr-md-4 gx-mr-2 gx-my-1">
                          two dropdowns
                        </div>
                      </div>
                <div className="gx-module-detail-item">
                  <div>
                    <div>#{ticket.id}</div>
                    <h3 className="gx-module-detail-item">{ticket.title}</h3>
                    <div>
                      <span>Created at: {ticket.created_at}</span>
                      <span> Last Updated at: 2 hours ago</span>
                    </div>
                    <div>{ticket.message}</div>
                </div>
                </div>
                        <div className="gx-module-detail-item">
                          <h3 className="gx-mb-0 gx-mb-sm-1">Messages</h3>
                        </div>
                        {conversation.map((conversation, index) =>
                          <ConversationCell key={index} conversation={conversation}/>
                        )}
                        {/*<div className="gx-chat-main-footer gx-todo-main-footer">*/}
                        {/*  <div className="gx-flex-row gx-align-items-center">*/}
                        {/*    <div className="gx-col">*/}
                        {/*      <div className="gx-form-group">*/}
                        {/*        <TextArea className="gx-border-0 ant-input gx-chat-textarea"*/}
                        {/*                  id="required"*/}
                        {/*                  onKeyUp={this._handleKeyPress}*/}
                        {/*                  onChange={this.updateMessageValue}*/}
                        {/*                  value={message}*/}
                        {/*                  rows={2}*/}
                        {/*                  placeholder="Type and hit enter to send message"/>*/}
                        {/*      </div>*/}
                        {/*    </div>*/}

                        {/*    <div className="gx-chat-sent"*/}
                        {/*         onClick={this.submitComment}*/}
                        {/*         aria-label="Send message">*/}
                        {/*      <i className="gx-icon-btn icon icon-sent"/>*/}
                        {/*    </div>*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                      </div>

          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          data will come soon
          </Col>
        </Row>
                </div>
      </Widget>
      </div>
    )
  }
}

export default TicketDetail

TicketDetail.defaultProps = {
  onUpdateTickets: "",
  onBackToList: ""
};

TicketDetail.propTypes = {
  onUpdateTickets: PropTypes.func,
  onBackToList: PropTypes.func
};