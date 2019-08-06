import React, {Component} from "react"
import {connect} from "react-redux";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  onGetFormOptions,
  onGetTicketDetail,
  onGetTicketMessages,
  onNullifyTicket,
  onSendNewMessage,
  onUpdateTicketPriority,
  onUpdateTickets,
  onUpdateTicketStatus
} from "../../../appRedux/actions";
import qs from "qs";
import axios from 'util/Api'
import {Avatar, Button, Divider, Input, Select, Upload} from "antd";
import moment from "moment";
import ConversationCell from "./ConversationCell";
import InfoView from "../../../components/InfoView";
import EditTicketDetailsModal from "./EditTicketDetailsModal";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {Option} = Select;
const {TextArea} = Input;

class TicketDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fileList: [],
      attachments: [],
      currentTicket: null,
      showEditModal: false,
      selectedPriority: null,
      selectedStatus: null
    }
  }

  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    this.props.onGetTicketDetail(queryParams.id);
    this.props.onGetTicketMessages(queryParams.id);
    this.props.onGetFormOptions();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentTicket !== null && nextProps.currentTicket !== this.props.currentTicket)
      this.setState({currentTicket: nextProps.currentTicket});
  }

  componentWillUnmount() {
    this.props.onNullifyTicket();
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

  onSubmitMessage = () => {
    if (this.state.fileList.length > 0) {
      this.handleUpload();
    } else {
      this.onSendMessage();
    }
  };

  onSendMessage = () => {
    const currentTicket = this.props.currentTicket;
    const attachments = this.state.attachments;
    if (this.state.message !== '') {
      this.props.onSendNewMessage(currentTicket.id, {
        message: this.state.message,
        attachments: attachments
      })
    }
    this.setState({message: '', attachments: []})
  };

  onToggleEditModal = () => {
    this.setState({showEditModal: !this.state.showEditModal})
  };

  handleUpload = () => {
    let formData = new FormData();
    this.state.fileList.map(file => {
      formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);
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
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  render() {
    const {fileList, currentTicket, showEditModal, message} = this.state;
    const {ticketMessages} = this.props;
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
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };
    const {messages} = this.props.intl;

    return (
      <div className="gx-main-layout-content">
        {currentTicket ?
          <div>
            <div className="gx-d-flex gx-justify-content-between">
              <div>
                <h2 className="gx-font-weight-bold">{currentTicket.title}</h2>
                <div><IntlMessages id="tickets.ticketId"/> {currentTicket.id}</div>
              </div>
              <span className="gx-text-primary" onClick={this.onToggleEditModal}><i
                className="icon icon-edit gx-mr-2"/><IntlMessages id="tickets.edit"/></span>
              <Select defaultValue={currentTicket.priority_id} onChange={this.onPriorityChange} style={{width: 120}}>
                {this.props.formOptions.priorities.map(priority => {
                  return <Option value={priority.id} key={priority.id}>{priority.name}</Option>
                })
                }
              </Select>
            </div>
            <div className="gx-d-flex gx-justify-content-between gx-my-5">
              <div className="gx-media-body gx-mt-2">
                {currentTicket.assigned_to ?
                  <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                    {currentTicket.assigned_to.avatar ?
                      <Avatar className="gx-mr-3 gx-size-50" src={currentTicket.assigned_by.avatar.src}/> :
                      <Avatar className="gx-mr-3 gx-size-50"
                              style={{backgroundColor: '#f56a00'}}>{currentTicket.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                    <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize"><IntlMessages id="tickets.assignedTo"/></span>
                      <div className="gx-mt-2">
                        {currentTicket.assigned_to.display_name}
                      </div>
                    </div>
                  </div> : <div>
                    <Avatar className="gx-mr-3 gx-size-50" src=""/>
                    <IntlMessages id="tickets.yetToAssign"/></div>}
              </div>
              <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize"><IntlMessages id="tickets.created"/></span>
                <div className="gx-mt-2">
                  <div className="gx-time gx-text-muted">{moment(currentTicket.created_at.date).format('LLL')}</div>
                </div>
              </div>
              <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize"><IntlMessages id="tickets.lastUpdate"/></span>
                <div className="gx-mt-2">
                  <div className="gx-time gx-text-muted">{moment(currentTicket.updated_at.date).format('LLL')}</div>
                </div>
              </div>
              <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize"><IntlMessages id="tickets.currentStatus"/></span>
                <div className="gx-mt-2">
                  <div className="gx-time gx-text-muted">
                    <Select defaultValue={currentTicket.status_id}
                            onChange={this.onStatusChange}>
                      {this.props.formOptions.status.map(status => {
                        return <Option value={status.id} key={status.id}>{status.name}</Option>
                      })
                      }
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <Divider/>
            <div className="gx-py-3">
              <h3 className="gx-mb-0 gx-mb-sm-1"><IntlMessages id="tickets.messages"/></h3>
            </div>
            {ticketMessages.map((conversation, index) =>
              <ConversationCell key={index} conversation={conversation}/>
            )}
            <div className="gx-py-3">
              <h3 className="gx-mb-0 gx-mb-sm-1"><IntlMessages id="tickets.updateTicket"/></h3>
            </div>
            <div className="gx-flex-column">
              <label className="gx-mr-2"><IntlMessages id="tickets.enterDetail"/></label>
              <TextArea rows={3} value={message} className="gx-form-control-lg gx-my-3" onChange={(e) => {
                this.setState({message: e.target.value})
              }}/>
            </div>
            <div className="gx-flex-column">
              <label><IntlMessages id="tickets.upload"/></label>
              <Upload {...props} >
                <Input placeholder={messages["tickets.files.upload"]} className="gx-my-3"
                       prefix={<i className="icon gx-icon-attachment"/>}/>
              </Upload>
            </div>
            <Button type="primary" className="gx-my-3" onClick={this.onSubmitMessage}
                    disabled={message === ""}><IntlMessages id="tickets.updateButton"/></Button>
          </div> : null}
        {showEditModal ?
          <EditTicketDetailsModal
            onToggleEditModal={this.onToggleEditModal}
            currentTicket={currentTicket}
            showEditModal={showEditModal}
            onUpdateTickets={this.props.onUpdateTickets}
          />
          : null}

        <InfoView/>
      </div>
    )
  }
}


const mapPropsToState = ({customerDetails}) => {
  const {formOptions, currentTicket, ticketMessages} = customerDetails;
  return {formOptions, currentTicket, ticketMessages};
};

export default connect(mapPropsToState, {
  onGetFormOptions, onNullifyTicket,
  fetchSuccess, fetchError, fetchStart,
  onGetTicketMessages, onSendNewMessage,
  onGetTicketDetail,
  onUpdateTicketPriority,
  onUpdateTicketStatus,
  onUpdateTickets
})(injectIntl(TicketDetails));

TicketDetails.defaultProps = {
  formOptions: {
    services: [],
    departments: [],
    products: [],
    priorities: [],
    status: []
  },
  currentTicket: null,
  ticketMessages: []
};

TicketDetails.propTypes = {
  formOptions: PropTypes.object,
  currentTicket: PropTypes.object,
  ticketMessages: PropTypes.array

};
