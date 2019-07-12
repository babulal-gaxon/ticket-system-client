import React, {Component} from "react"
import {Avatar, Breadcrumb, Col, Input, Row, Select, Tag, Upload, message} from "antd";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import moment from "moment";
import ConversationCell from "./ConversationCell";
import {connect} from "react-redux";
import {
  getTickedId,
  onAssignStaffToTicket,
  onDeleteTicket,
  onGetConversationList,
  onSelectTicket,
  onSendMessage,
  onUpdateTicketPriority,
  onUpdateTickets,
  onUpdateTicketStatus
} from "../../../appRedux/actions/TicketList";
import TicketAssigning from "../AddNewTicket/TicketAssigning";
import EditTicketDetailsModal from "./EditTicketDetailsModal";
import {onGetTicketPriorities} from "../../../appRedux/actions/TicketPriorities";
import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import {onGetTicketStatus} from "../../../appRedux/actions/TicketStatuses";
import * as axios from "axios";

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
      ticketTags: props.currentTicket.tags.map(tag => tag.title),
      currentTicket: {...props.currentTicket},
      fileList: [],
      uploading: false,
    };
  };

  componentDidMount() {
    this.props.onGetConversationList(this.props.currentTicket.id);
    this.props.onGetTicketPriorities();
    this.props.onGetStaff();
    this.props.onGetTicketStatus();
  }

  componentWillUnmount() {
    this.props.onSelectTicket(null);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentTicket !== null && nextProps.currentTicket !== this.props.currentTicket)
      this.setState({currentTicket: nextProps.currentTicket});
  }

  onPriorityChange = value => {
    this.setState({selectedPriority: value},
      () => this.props.onUpdateTicketPriority(this.props.currentTicket.id, this.state.selectedPriority))
  };

  onStatusChange = value => {
    this.setState({selectedStatus: value},
      () => this.props.onUpdateTicketStatus(this.props.currentTicket.id, this.state.selectedStatus))
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

  onToggleEditModal = () => {
    this.setState({showEditModal: !this.state.showEditModal})
  };

  onEditTags = value => {
    this.setState({ticketTags: value}, () => {
      this.props.onUpdateTickets(this.props.currentTicket.id, {tags: this.state.ticketTags})
    })
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.map(file => {
      formData.append('file', file);
      formData.append('title', file.name)
    });

    this.setState({
      uploading: true,
    });

    axios({
      url: 'http://gaxonlab.com/dev/ticket-system/public/api/uploads/temporary/media',
      method: 'post',
      headers: {
        'Content-Type': "multipart/form-data"
      },
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  };


  render() {
    const {fileList} = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    const {message, showEditModal, ticketTags, currentTicket} = this.state;
    const {priorities, statuses, conversation} = this.props;
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
          </div>
          <Row>
            <Col xl={16} lg={12} md={12} sm={12} xs={24}>
              <div className="gx-d-flex gx-justify-content-between gx-mt-4">
                <span>#{currentTicket.id}</span>
                <span className="gx-text-primary" onClick={this.onToggleEditModal}><i
                  className="icon icon-edit gx-mr-2"/>Edit</span>
              </div>
              <h2 className="gx-my-2 gx-font-weight-bold">{currentTicket.title}</h2>
              <div className="gx-mb-3">
                <span>created at: {moment(currentTicket.created_at.date).format("LL")}</span>
                <span> updated at: {moment(currentTicket.updated_at.date).format("LL")}</span>
              </div>
              <div className="gx-py-3">{currentTicket.content}</div>
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
                  <div>
                    <Upload {...props} onChange={this.handleUpload}>
                      <i className="gx-icon-btn icon icon-attachment"/>
                    </Upload>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <div className="gx-justify-content-between gx-ml-5">
                <div className="gx-mb-3">Customer</div>
                {currentTicket.assigned_by ?
                  <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                    {currentTicket.assigned_by.avatar ?
                      <Avatar className="gx-mr-3 gx-size-50" src={currentTicket.assigned_by.avatar.src}/> :
                      <Avatar className="gx-mr-3 gx-size-50"
                              style={{backgroundColor: '#f56a00'}}>{currentTicket.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                    <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize">{currentTicket.assigned_by.first_name + " " + currentTicket.assigned_by.last_name}</span>
                      <div className="gx-mt-2">
                        <Tag color="#f50">
                          Customer
                        </Tag>
                      </div>
                    </div>
                  </div> : null}
                <div className="gx-my-3">Assigned to</div>
                <TicketAssigning staffList={this.props.staffList}
                                 onAssignStaff={this.props.onAssignStaffToTicket}
                                 ticketId={currentTicket.id}
                                 assignedTo={currentTicket.assigned_to}/>
                <span className="gx-mb-2">Tags</span>
                <Select mode="tags" style={{width: '100%'}} placeholder="Type to add tags" value={ticketTags}
                        onChange={this.onEditTags}/>
                <div className="gx-my-3">Attachments</div>
                {currentTicket.attachments.map(attachment => {
                  return <Avatar shape="square" icon="user" src={attachment.src} className="gx-mr-2 gx-size-100"/>
                })}
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

const mapStateToProps = ({ticketList, ticketPriorities, ticketStatuses, supportStaff}) => {
  const {conversation, currentTicket} = ticketList;
  const {priorities} = ticketPriorities;
  const {statuses} = ticketStatuses;
  const {staffList} = supportStaff;
  return {conversation, priorities, statuses, staffList, currentTicket};
};

export default connect(mapStateToProps, {
  onDeleteTicket,
  getTickedId,
  onUpdateTicketStatus,
  onUpdateTicketPriority,
  onGetConversationList,
  onSendMessage,
  onAssignStaffToTicket,
  onUpdateTickets,
  onGetTicketPriorities,
  onGetStaff,
  onGetTicketStatus,
  onSelectTicket
})(TicketDetail);


TicketDetail.defaultProps = {};

TicketDetail.propTypes = {};