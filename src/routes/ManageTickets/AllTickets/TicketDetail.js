import React, {Component} from "react"
import {Avatar, Breadcrumb, Button, Col, Dropdown, Input, Menu, Popconfirm, Row, Select, Tag} from "antd";
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
import TicketAssigning from "../AddNewTicket/TicketAssigning";
import EditTicketDetailsModal from "./EditTicketDetailsModal";

const Option = Select.Option;
const {TextArea} = Input;

class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      selectedPriority: null,
      selectedStatus: null,
      showEditModal: false,
      ticketTags: this.props.currentTicket.tags.map(tag => tag.title),
      editableTicket: this.props.currentTicket
    };
  };

  componentDidMount() {
    this.props.onGetConversationList(this.props.currentTicket.id)
  }

  onPriorityChange = value => {
    this.setState({selectedPriority: value},
      () => this.props.onUpdateTicketPriority(this.props.currentTicket.id, this.state.selectedPriority))
  };

  onStatusChange = value => {
    this.setState({selectedStatus: value},
      () => this.props.onUpdateTicketStatus(this.props.currentTicket.id, this.state.selectedStatus))
  };

  // onSelectOption = () => {
  //   const ticketId = this.state.editableTicket.id;
  //   const menu = (
  //     <Menu>
  //       <Menu.Item key="1" onClick={() => {
  //         this.props.getTickedId(ticketId);
  //         this.props.history.push('/manage-tickets/add-new-ticket')
  //       }}>
  //         Edit
  //       </Menu.Item>
  //       <Menu.Item key="4">
  //         <Popconfirm
  //           title="Are you sure delete this Ticket?"
  //           onConfirm={() => {
  //             this.props.onDeleteTicket({ids: ticketId}, this.props.onBackToList);
  //           }}
  //           okText="Yes"
  //           cancelText="No">
  //           Delete
  //         </Popconfirm>
  //       </Menu.Item>
  //     </Menu>
  //   );
  //   return <Dropdown overlay={menu} trigger={['click']}>
  //     <Button>
  //       <i className="icon icon-ellipse-h"/>
  //     </Button>
  //   </Dropdown>
  // };

  onHandleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmitMessage();
    }
  };

  onSubmitMessage = () => {
    if (this.state.message !== '') {
      this.props.onSendMessage(this.state.editableTicket.id, {message: this.state.message})
    }
    this.setState({message: ''})
  };

  onToggleEditModal = () => {
    this.setState({showEditModal: !this.state.showEditModal})
  };

  onEditTags = value => {
    this.setState({ticketTags: value}, () => {
      this.props.onUpdateTickets(this.props.currentTicket.id,{tags: this.state.ticketTags})
    })
  };

  render() {
    console.log("editableTicket", this.state.editableTicket)
    const {message, showEditModal, ticketTags, editableTicket} = this.state;
    const {currentTicket, priorities, statuses, conversation} = this.props;
    // const ticketTags = currentTicket.tags.length > 0 ? currentTicket.tags.map(tag => tag.title) : [];
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

          <div className="gx-d-flex">
            <Select defaultValue={editableTicket.priority_id} onChange={this.onPriorityChange} style={{width: 120}}>
              {priorities.map(priority => {
                return <Option value={priority.id} key={priority.name}>{priority.name}</Option>
              })}
            </Select>
            <Select className="gx-mx-3" defaultValue={editableTicket.status_id} style={{width: 120}}
                    onChange={this.onStatusChange}>
              {statuses.map(status => {
                return <Option value={status.id} key={status.name}>{status.name}</Option>
              })}
            </Select>
            {/*{this.onSelectOption()}*/}
          </div>
          <Row>
            <Col xl={16} lg={12} md={12} sm={12} xs={24}>
              <div className="gx-d-flex gx-justify-content-between gx-mt-4">
                <span>#{editableTicket.id}</span>
                <span className="gx-text-primary" onClick={this.onToggleEditModal}><i
                  className="icon icon-edit gx-mr-2"/>Edit</span>
              </div>
              <h2 className="gx-my-2 gx-font-weight-bold">{editableTicket.title}</h2>
              <div className="gx-mb-3">
                <span>created at: {moment(editableTicket.created_at.date).format("LL")}</span>
                <span> updated at: {moment(editableTicket.updated_at.date).format("LL")}</span>
              </div>
              <div className="gx-py-3">{editableTicket.content}</div>
              <div className="gx-py-3">
                <h3 className="gx-mb-0 gx-mb-sm-1">Messages</h3>
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
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <div className="gx-justify-content-between gx-ml-5">
                <div className="gx-mb-3">Customer</div>
                {editableTicket.assigned_by ?
                  <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                    {editableTicket.assigned_by.avatar ?
                      <Avatar className="gx-mr-3 gx-size-50" src={editableTicket.assigned_by.avatar.src}/> :
                      <Avatar className="gx-mr-3 gx-size-50"
                              style={{backgroundColor: '#f56a00'}}>{editableTicket.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                    <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize">{editableTicket.assigned_by.first_name + " " + editableTicket.assigned_by.last_name}</span>
                      <div className="gx-mt-2">
                        <Tag color="#f50">
                          Customer
                        </Tag>
                      </div>
                    </div>
                  </div> : null}
                <div className="gx-my-3">Assigned to</div>
                {editableTicket.assigned_to ?
                  <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                    {editableTicket.assigned_to.avatar ?
                      <Avatar className="gx-mr-3 gx-size-50" src={editableTicket.assigned_to.avatar.src}/> :
                      <Avatar className="gx-mr-3 gx-size-50" style={{backgroundColor: '#f56a00'}}>
                        {editableTicket.assigned_to.first_name[0].toUpperCase()}</Avatar>}
                    <div className="gx-media-body gx-mt-2">
                  <span className="gx-mb-0 gx-text-capitalize">
                    {editableTicket.assigned_to.first_name + " " + editableTicket.assigned_to.last_name}</span>
                      <div className="gx-mt-2">
                        date here
                      </div>
                    </div>
                  </div>
                  :
                  <TicketAssigning staffList={this.props.staffList}
                                   onAssignStaff={this.props.onAssignStaffToTicket}
                                   ticketId={editableTicket.id}/>
                }
                <div className="gx-d-flex gx-justify-content-between gx-mb-3">
                  <span>Tags</span>
                  <span className="gx-text-primary">Edit</span>
                </div>
                <Select mode="tags" style={{width: '100%'}} placeholder="Type to add tags" value={ticketTags}
                        onChange={this.onEditTags}/>
              </div>
            </Col>
          </Row>
        </Widget>
        {showEditModal ?
          <EditTicketDetailsModal
            onToggleEditModal={this.onToggleEditModal}
            currentTicket={currentTicket}
            showEditModal={showEditModal}
            onUpdateTickets={this.props.onUpdateTickets}
          ticketId={currentTicket.id}/>
          : null}
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


TicketDetail.defaultProps = {};

TicketDetail.propTypes = {};