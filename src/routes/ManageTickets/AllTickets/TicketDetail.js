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
  onGetTagsList,
  onGetTicketDetail,
  onNullifyCurrentTicket,
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
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";
import qs from "qs";
import {getFormattedDate, getTicketFileExtension, getTicketFileSize} from "../../../util/Utills";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";
import AttachmentsDisplay from "./AttachmentsDisplay";

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
      ticketTags: [],
      currentTicket: null,
      fileList: [],
      attachments: []
    };
  };

  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    this.props.onGetTicketDetail(queryParams.id);
    this.props.onGetConversationList(queryParams.id);
    this.props.onGetFilterOptions();
    this.timeInterval = setInterval(() => this.props.onGetConversationList(queryParams.id), 30000)

  }

  componentWillUnmount() {
    this.props.onNullifyCurrentTicket();
    clearInterval(this.timeInterval);
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentTicket !== null && nextProps.currentTicket !== this.props.currentTicket)
      this.setState({
        currentTicket: nextProps.currentTicket,
        ticketTags: nextProps.currentTicket.tags.map(tag => tag.title)
      });
  }

  onPriorityChange = value => {
    const currentTicket = this.props.currentTicket;
    this.setState({selectedPriority: value},
      () => this.props.onUpdateTicketPriority(currentTicket.id, this.state.selectedPriority, this))
  };

  onStatusChange = value => {
    const currentTicket = this.props.currentTicket;
    this.setState({selectedStatus: value},
      () => this.props.onUpdateTicketStatus(currentTicket.id, this.state.selectedStatus, this))
  };


  onSubmitMessage = () => {
    if (this.state.message !== '') {
      if (this.state.fileList.length > 0) {
        this.handleUpload()
      } else {
        this.onSendMessage();
      }
    }
  };

  onSendMessage = () => {
    const currentTicket = this.props.currentTicket;
    const attachments = this.state.attachments;
    if (this.state.message !== '') {
      this.props.onSendMessage(currentTicket.id, {
        message: this.state.message,
        attachments: attachments
      });
      setTimeout(() => {
        this.setState({message: "", attachments: []}, () => {
          console.log("message", this.state.message + "hi")
        })
      }, 20)
    }
  };

  onToggleEditModal = () => {
    this.setState({showEditModal: !this.state.showEditModal})
  };

  onEditTags = value => {
    const currentTicket = this.props.currentTicket;
    this.setState({ticketTags: value}, () => {
      this.props.onUpdateTickets(currentTicket.id, {tags: this.state.ticketTags}, this)
    })
  };

  handleUpload = () => {
    let formData = new FormData();
    this.state.fileList.map(file => {
      formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);
      formData.append('type', 'ticket');
      formData.append('mime_type', file.type);
      this.imageUpload(formData);
      return file;
    });
  };

  imageUpload = (file) => {
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        this.props.fetchSuccess();
        this.setState({attachments: this.state.attachments.concat(data.data)}, () => {
          if (this.state.attachments.length === this.state.fileList.length) {
            this.onSendMessage();
            this.setState({fileList: []})
          }
        })
      } else {
        this.props.fetchError(data.errors[0])
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  onSearchTags = (value) => {
    this.props.onGetTagsList(value);
  };

  render() {
    const {fileList, message, showEditModal, ticketTags, currentTicket} = this.state;
    const props = {
      accept: getTicketFileExtension(),
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
        const isFileSize = file.size < getTicketFileSize();
        if (!isFileSize) {
          message.error('The image size is greater than allowed size!');
        } else {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
        }
        return false;
      },
      fileList,
    };
    const {filterData, conversation, tagsList} = this.props;
    const {messages} = this.props.intl;
    return (
      <div className="gx-main-layout-content">
        {currentTicket ? <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="manageTickets.tickets"/></h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/manage-tickets/all-tickets"><IntlMessages id="sidebar.dashboard.manage.tickets"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary"><IntlMessages id="manageTickets.tickets"/></Breadcrumb.Item>
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
                    className="icon icon-edit gx-mr-2"/><IntlMessages id="common.edit"/></span> : null}
              </div>
              <h2 className="gx-my-2 gx-font-weight-bold">{currentTicket.title}</h2>
              <div className="gx-mb-3">
                <span><IntlMessages id="common.createdAt"/> {getFormattedDate(currentTicket.created_at)}</span>
                <span>  <IntlMessages id="common.updatedAt"/> {moment(currentTicket.updated_at).fromNow()}</span>
              </div>
              <div className="gx-py-3">{currentTicket.content}</div>
              {currentTicket.all_attachments.tickets.length > 0 ?
                <AttachmentsDisplay attachments={currentTicket.all_attachments.tickets}/> : null}
              <div className="gx-py-3">
                <h3 className="gx-mb-0 gx-mb-sm-1"><IntlMessages id="common.messages"/></h3>
              </div>
              {conversation.map((conversation, index) =>
                <ConversationCell key={index} conversation={conversation}/>
              )}
              <div className="gx-chat-main-footer gx-todo-main-footer">
                <div className="gx-flex-row gx-align-items-center">
                  <div className="gx-col">
                    <div className="gx-form-group">
                      <TextArea className="gx-border-0 ant-input gx-chat-textarea"
                                onKeyPress={(event) => {
                                  if (event.charCode === 13 && !event.shiftKey) {
                                    this.onSubmitMessage();
                                  }
                                }}
                                onChange={(e) => this.setState({message: e.target.value})}
                                value={message}
                                placeholder={messages["manageTickets.sendMessage"]}/>
                    </div>
                  </div>
                  <div className="gx-chat-sent"
                       onClick={this.onSubmitMessage}
                       aria-label="Send message">
                    <i className="gx-icon-btn icon icon-sent"/>
                  </div>
                  <div>
                    <Upload {...props}>
                      <i className="gx-icon-btn icon icon-attachment"/>
                    </Upload>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <div className="gx-justify-content-between gx-ml-5">
                <div className="gx-mb-3"><IntlMessages id="common.customer"/></div>
                {currentTicket.assigned_by ?
                  <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                    {currentTicket.assigned_by.avatar ?
                      <Avatar className="gx-mr-3 gx-size-50"
                              src={currentTicket.assigned_by.avatar.src}/> :
                      <Avatar className="gx-mr-3 gx-size-50"
                              style={{backgroundColor: '#f56a00'}}>{currentTicket.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                    <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize">{currentTicket.assigned_by.first_name + " " + currentTicket.assigned_by.last_name}</span>
                      <div className="gx-mt-2">
                        <Tag color="#f50">
                          <IntlMessages id="common.customer"/>
                        </Tag>
                      </div>
                    </div>
                  </div> : null}
                <TicketAssigning staffList={filterData.staffs}
                                 onAssignStaff={this.props.onAssignStaffToTicket}
                                 ticketId={currentTicket.id}
                                 assignedTo={currentTicket.assigned_to}/>
                <span><IntlMessages id="common.tags"/></span>
                <Select mode="tags" style={{width: '100%'}} className="gx-mt-3"
                        placeholder={messages["manageTickets.addTags"]}
                        value={ticketTags} onSearch={this.onSearchTags}
                        onChange={this.onEditTags}>
                  {tagsList.map(tag => {
                    return <Option key={tag.id} value={tag.title}>{tag.title}</Option>
                  })}
                </Select>
                <div className="gx-my-3"><IntlMessages id="common.attachments"/></div>
                {(currentTicket.all_attachments.tickets.length > 0 || currentTicket.all_attachments.message.length > 0) ?
                  <div>
                  <div>
                    {currentTicket.all_attachments.tickets.length > 0 ?
                  <div>
                    <div>Ticket Attachments</div>
                  <AttachmentsDisplay attachments={currentTicket.all_attachments.tickets}/>
                  </div>: null}
                  </div>
                    <div>
                      {currentTicket.all_attachments.message.length > 0 ?
                        <div>
                          <div>Message Attachments</div>
                          <AttachmentsDisplay attachments={currentTicket.all_attachments.message}/>
                        </div>: null}
                    </div>
                  </div>
                      :
                  <div><IntlMessages id="manageTickets.noAttachmentAdded"/></div>}
              </div>
            </Col>
          </Row>
        </Widget> : null}
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
  const {conversation, currentTicket, filterData, tagsList} = ticketList;
  return {conversation, currentTicket, filterData, tagsList};
};

export default connect(mapStateToProps, {
  onUpdateTicketStatus,
  onUpdateTicketPriority,
  onGetConversationList,
  onSendMessage,
  onAssignStaffToTicket,
  onUpdateTickets,
  onGetTicketDetail,
  onGetFilterOptions,
  fetchError,
  fetchStart,
  fetchSuccess,
  onNullifyCurrentTicket,
  onGetTagsList
})(injectIntl(TicketDetail));


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
