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
  onSendNewMessage
} from "../../../appRedux/actions";
import qs from "qs";
import axios from 'util/Api'
import {Avatar, Button, Divider, Input, Select, Upload} from "antd";
import moment from "moment";
import ConversationCell from "./ConversationCell";

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

  onSubmitMessage = () => {
    if (this.state.fileList.length > 0) {
      this.handleUpload()
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
    console.log("current ticket", this.props.currentTicket, this.props.ticketMessages)
    const {fileList, currentTicket} = this.state;
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

    return (
      <div className="gx-main-layout-content">
        {currentTicket ?
          <div>
            <div className="gx-d-flex gx-justify-content-between">
              <div>
                <h2 className="gx-font-weight-bold">{currentTicket.title}</h2>
                <div>Ticket Id: {currentTicket.id}</div>
              </div>
              <Select value={currentTicket.priority_id} onChange={(value) => {
                this.setState({selectedPriority: value})
              }}>
                {this.props.formOptions.priorities.map(priority => {
                  return <Option value={priority.id}>{priority.name}</Option>
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
                    className="gx-mb-0 gx-text-capitalize">Assigned To</span>
                    <div className="gx-mt-2">
                      {currentTicket.assigned_to.display_name}
                    </div>
                  </div>
                </div> : null}
              </div>
                <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize">Created</span>
                <div className="gx-mt-2">
                  <div className="gx-time gx-text-muted">{moment(currentTicket.created_at.date).format('LLL')}</div>
                </div>
            </div>
              <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize">Last Update</span>
                <div className="gx-mt-2">
                  <div className="gx-time gx-text-muted">{moment(currentTicket.updated_at.date).format('LLL')}</div>
                </div>
              </div>
              <div className="gx-media-body gx-mt-2">
                  <span
                    className="gx-mb-0 gx-text-capitalize">Current Status</span>
                <div className="gx-mt-2">
                  <div className="gx-time gx-text-muted">
                    <Select value={currentTicket.status_id} onChange={(value) => this.setState({selectedStatus: value})}>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <Divider/>
            <div className="gx-py-3">
              <h3 className="gx-mb-0 gx-mb-sm-1">Messages</h3>
            </div>
            {ticketMessages.map((conversation, index) =>
              <ConversationCell key={index} conversation={conversation}/>
            )}
            <div className="gx-py-3">
              <h3 className="gx-mb-0 gx-mb-sm-1">Update the Ticket</h3>
            </div>
            <div className="gx-flex-column">
            <label className="gx-mr-2">Enter Detail</label>
             <TextArea rows={3} className="gx-form-control-lg gx-my-3" onChange={(e) => {
                this.setState({message: e.target.value})
              }}/>
            </div>
              <div className="gx-flex-column">
            <label >Upload</label>
            <Upload {...props} >
              <Input placeholder='Add Files' className="gx-my-3" prefix={<i className="icon gx-icon-attachment"/>}/>
            </Upload>
              </div>
            <Button type="primary" className="gx-my-3" onClick={this.onSubmitMessage}>Update Ticket</Button>
          </div> : null}
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
  onGetTicketDetail
})(TicketDetails);