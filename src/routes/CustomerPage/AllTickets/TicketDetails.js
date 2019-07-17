import React, {Component} from "react"
import {connect} from "react-redux";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  onGetFormOptions,
  onGetTicketMessages,
  onSelectTicket,
  onSendNewMessage
} from "../../../appRedux/actions";

class TicketDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      fileList: [],
      attachments: [],
      currentTicket: {...props.currentTicket}
    }
  }

  componentDidMount() {
    this.props.onGetTicketMessages(this.state.currentTicket.id);
  }

  componentWillUnmount() {
    this.props.onSelectTicket(null);
  }

  render() {
    const {currentTicket} = this.props;
    return (
      <div>
        ticket detail will come here
      </div>
    )
  }
}


const mapPropsToState = ({customerDetails}) => {
  const {formOptions, currentTicket} = customerDetails;
  return {formOptions, currentTicket};
};

export default connect(mapPropsToState, {
  onGetFormOptions, onSelectTicket,
  fetchSuccess, fetchError, fetchStart,
  onGetTicketMessages, onSendNewMessage
})(TicketDetails);