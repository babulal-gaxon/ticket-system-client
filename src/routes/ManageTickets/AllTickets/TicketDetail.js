import React, {Component} from "react"
import {Breadcrumb, Button, Col, Dropdown, Input, Menu, Popconfirm, Row, Select} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import moment from "moment";
import ConversationCell from "./ConversationCell";
import {connect} from "react-redux";
import {
  getTickedId,
  onDeleteTicket,
  onGetConversationList,
  onSendMessage,
  onUpdateTicketPriority,
  onUpdateTicketStatus
} from "../../../appRedux/actions/TicketList";

const Option = Select.Option;
const {TextArea} = Input;

class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      selectedPriority: null,
      selectedStatus: null,
      // conversation:[]
    };
    this.props.onGetConversationList(this.props.currentTicket.id)
  };

  onPriorityChange = value => {
    this.setState({selectedPriority: value},
      () => this.props.onUpdateTicketPriority(this.props.currentTicket.id, this.state.selectedPriority))
  };

  // componentWillReceiveProps(nextProps, nextContext) {
  //   this.setState({conversation: nextProps.conversation})
  // }

  onStatusChange = value => {
    this.setState({selectedStatus: value},
      () => this.props.onUpdateTicketStatus(this.props.currentTicket.id, this.state.selectedStatus))
  };

  onSelectOption = () => {
    const ticketId = this.props.currentTicket.id;
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={() => {
          this.props.getTickedId(ticketId)
          this.props.history.push('/manage-tickets/add-new-ticket')
        }}>
          Edit
        </Menu.Item>
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure delete this Ticket?"
            onConfirm={() => {
              this.props.onDeleteTicket({ids: ticketId}, this.props.onBackToList);
            }}
            okText="Yes"
            cancelText="No">
            Delete
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <i className="icon icon-ellipse-h"/>
      </Button>
    </Dropdown>
  };

  onHandleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmitMessage();
    }
  };

  onSubmitMessage = () => {
    if (this.state.message !== '') {
      this.props.onSendMessage(this.props.currentTicket.id, {message: this.state.message})
    }
    this.setState({message: ''})
  };

  render() {
    const {message} = this.state;
    console.log("conversation list", this.props.conversation);
    const {currentTicket, priorities, statuses, conversation} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>Tickets</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/manage-tickets/all-tickets">Manage Tickets</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tickets</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <div className="gx-d-flex">
                <Select defaultValue={currentTicket.priority_id} onChange={this.onPriorityChange} style={{width: 120}}>
                  {priorities.map(priority => {
                    return <Option value={priority.id} key={priority.name}>{priority.name}</Option>
                  })}
                </Select>
                <Select className="gx-mx-3" defaultValue={currentTicket.status_id} style={{width: 120}}
                        onChange={this.onStatusChange}>
                  {statuses.map(status => {
                    return <Option value={status.id} key={status.name}>{status.name}</Option>
                  })}
                </Select>
                {this.onSelectOption()}
              </div>
              <div>#{currentTicket.id}</div>
              <h2 className="gx-my-2 gx-font-weight-bold">{currentTicket.title}</h2>
              <div>
                <span>created at: {moment(currentTicket.created_at.date).format("LL")}</span>
                <span> updated at: {moment(currentTicket.updated_at.date).format("LL")}</span>
              </div>
              <div className="gx-my-3">
                <h3 className="gx-mb-0 gx-mb-sm-1">Comments</h3>
              </div>
              {conversation.map((conversation, index) =>
                <ConversationCell key={index} conversation={conversation}/>
              )}

              <div className="gx-chat-main-footer gx-todo-main-footer">
                <div className="gx-flex-row gx-align-items-center">
                  <div className="gx-col">
                    <div className="gx-form-group">
                      <TextArea className="gx-border-0 ant-input gx-chat-textarea"
                                onKeyUp={this.onHandleKeyPress}
                                onChange={(e) => this.setState({message: e.target.value})}
                                value={message}
                                rows={2}
                                placeholder="Type and hit enter to send message"/>
                    </div>
                  </div>

                  <div className="gx-chat-sent"
                       onClick={this.onSubmitMessage}
                       aria-label="Send message">
                    <i className="gx-icon-btn icon icon-sent"/>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              data will come soon
            </Col>
          </Row>
        </Widget>
      </div>
    )
  }
}

const mapStateToProps = ({ticketList}) => {
  const {conversation} = ticketList;
  return {conversation};
};

export default connect(mapStateToProps, {
  onDeleteTicket,
  getTickedId,
  onUpdateTicketStatus,
  onUpdateTicketPriority,
  onGetConversationList,
  onSendMessage
})(TicketDetail);



TicketDetail.defaultProps = {
};

TicketDetail.propTypes = {
};