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

class TicketDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fileList: [],
      attachments: [],
      currentTicket: null,
      showEditModal: false
    }
  }

  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    this.props.onGetTicketDetail(queryParams.id);
    this.props.onGetTicketMessages(queryParams.id);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.currentTicket !== null && nextProps.currentTicket !== this.props.currentTicket)
      this.setState({currentTicket: nextProps.currentTicket})
  }

  componentWillUnmount() {
    this.props.onNullifyTicket();
  }

  onHandleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmitMessage();
    }
  };

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
    const {fileList, currentTicket} = this.state;
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
        <div className="gx-d-flex gx-justify-content-end">
          <span>{currentTicket.title}</span>
        </div>
        <div>Ticket Id: {currentTicket.id}</div>
      </div>
    )
  }
}


const mapPropsToState = ({customerDetails}) => {
  const {formOptions, currentTicket} = customerDetails;
  return {formOptions, currentTicket};
};

export default connect(mapPropsToState, {
  onGetFormOptions, onNullifyTicket,
  fetchSuccess, fetchError, fetchStart,
  onGetTicketMessages, onSendNewMessage,
  onGetTicketDetail
})(TicketDetails);