import React, {Component} from "react"
import {Avatar, Breadcrumb, Col, Input, Row, Select, Tag, Upload} from "antd";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import moment from "moment";
import ConversationCell from "./ConversationCell";
import {connect} from "react-redux";
import {
  onAssignStaffToTicket,
  onGetConversationList,
  onGetFilterOptions,
  onSelectTicket,
  onSendMessage,
  onUpdateTicketPriority,
  onUpdateTickets,
  onUpdateTicketStatus
} from "../../../appRedux/actions/TicketList";
import TicketAssigning from "../AddNewTicket/TicketAssigning";
import EditTicketDetailsModal from "./EditTicketDetailsModal";
import axios from 'util/Api'
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";

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
      attachments: []
    };
  };

  componentDidMount() {
    this.props.onGetConversationList(this.props.currentTicket.id);
    this.props.onGetFilterOptions();
  }

  componentWillUnmount() {
    this.props.onSelectTicket(null);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentTicket !== null && nextProps.currentTicket !== this.props.currentTicket)
      this.setState({currentTicket: nextProps.currentTicket});
  }

  onPriorityChange = value => {
    const currentTicket = this.props.currentTicket;
    this.setState({selectedPriority: value},
      () => this.props.onUpdateTicketPriority(currentTicket.id, this.state.selectedPriority))
  };

  onStatusChange = value => {
    const currentTicket = this.props.currentTicket;
    this.setState({selectedStatus: value},
      () => this.props.onUpdateTicketStatus(currentTicket.id, this.state.selectedStatus))
  };

  onHandleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmitMessage();
    }
  };

  onSubmitMessage = () => {
    const currentTicket = this.props.currentTicket;
    const attachments = this.state.attachments;
    if (this.state.message !== '') {
      this.props.onSendMessage(currentTicket.id, {
        message: this.state.message,
        attachments: attachments
      })
    }
    this.setState({message: '', attachments: []})
  };

  onToggleEditModal = () => {
    this.setState({showEditModal: !this.state.showEditModal})
  };

  onEditTags = value => {
    const currentTicket = this.props.currentTicket;
    this.setState({ticketTags: value}, () => {
      this.props.onUpdateTickets(currentTicket.id, {tags: this.state.ticketTags})
    })
  };

  handleUpload = (info) => {
    const formData = new FormData();
    info.fileList.map(file => {
      formData.append('file', file.originFileObj);
      formData.append('title', file.name)
    }, this.imageUpload(formData));
  };

  imageUpload = (file) => {
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        this.setState({attachments: this.state.attachments.concat(data.data)})
      }
    }).catch(function (error) {
      console.log("Error****:", error.message);
    });
  };

  render() {
    const props = {
      multiple: true,
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
        return false;
      }
    };
    const {message, showEditModal, ticketTags, currentTicket} = this.state;
    const {filterData, conversation} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>Tickets</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/manage-tickets/all-tickets">Manage Tickets</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">Tickets</Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex">
            {(Permissions.canTicketEdit()) ?
              <Select defaultValue={currentTicket.priority_id} onChange={this.onPriorityChange} style={{width: 120}}>
                {filterData.priority.map(priority => {
                  return <Option value={priority.id} key={priority.name}>{priority.name}</Option>
                })}
              </Select> : null}
            {(Permissions.canTicketEdit()) ?
              <Select className="gx-mx-3" defaultValue={currentTicket.status_id} style={{width: 120}}
                      onChange={this.onStatusChange}>
                {filterData.status.map(status => {
                  return <Option value={status.id} key={status.name}>{status.name}</Option>
                })}
              </Select> : null}
          </div>
          <Row>
            <Col xl={16} lg={12} md={12} sm={12} xs={24}>
              <div className="gx-d-flex gx-justify-content-between gx-mt-4">
                <span>#{currentTicket.id}</span>
                {(Permissions.canTicketEdit()) ?
                  <span className="gx-text-primary" onClick={this.onToggleEditModal}><i
                    className="icon icon-edit gx-mr-2"/>Edit</span> : null}
              </div>
              <h2 className="gx-my-2 gx-font-weight-bold">{currentTicket.title}</h2>
              <div className="gx-mb-3">
                <span>created at: {moment(currentTicket.created_at.date).format("LL")}</span>
                <span> updated at: {moment(currentTicket.updated_at.date).format("LL")}</span>
              </div>
              <div className="gx-py-3">{currentTicket.content}</div>
              {currentTicket.attachments.length > 0 ?
                <div className="gx-mt-4">
                  <div className="gx-mb-3">Attachments</div>
                  <div className="gx-d-flex">
                    {currentTicket.attachments.map(attachment => {
                      return <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                        <Widget styleName="gx-card-filter gx-mr-2">
                          <div>{attachment.title}</div>
                          <div>{attachment.size / 1000} kb</div>
                        </Widget>
                      </div>
                    })}
                  </div>
                </div> : null}
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
                <TicketAssigning staffList={filterData.staffs}
                                 onAssignStaff={this.props.onAssignStaffToTicket}
                                 ticketId={currentTicket.id}
                                 assignedTo={currentTicket.assigned_to}/>
                <span className="gx-mb-2">Tags</span>
                <Select mode="tags" style={{width: '100%'}} placeholder="Type to add tags" value={ticketTags}
                        onChange={this.onEditTags}/>
                <div className="gx-my-3">Attachments</div>
                {currentTicket.attachments.length > 0 ? currentTicket.attachments.map(attachment => {
                  return <Avatar shape="square" icon="user" src={attachment.src} className="gx-mr-2 gx-size-100"/>
                }) : <div>No attachments added with this ticket.</div>}
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
  const {conversation, currentTicket, filterData} = ticketList;
  return {conversation, currentTicket, filterData};
};

export default connect(mapStateToProps, {
  onUpdateTicketStatus,
  onUpdateTicketPriority,
  onGetConversationList,
  onSendMessage,
  onAssignStaffToTicket,
  onUpdateTickets,
  onSelectTicket,
  onGetFilterOptions
})(TicketDetail);


TicketDetail.defaultProps = {
  conversation: [],
  currentTicket: null,
  filterData: {
    status: [],
    priority: [],
    staffs: []
  },
};

TicketDetail.propTypes = {
  conversation: PropTypes.array,
  currentTicket: PropTypes.object,
  filterData: PropTypes.object,
};