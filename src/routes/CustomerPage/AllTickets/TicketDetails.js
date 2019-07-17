import React, {Component} from "react"
import {connect} from "react-redux";
import {
  fetchError, fetchStart,
  fetchSuccess,
  onGetFormOptions,
  onGetRaisedTickets,
  onRaiseNewTicket, onSelectTicket
} from "../../../appRedux/actions";

class TicketDetails extends Component {

  componentWillUnmount() {
    this.props.onSelectTicket(null);
  }

  render() {
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
   onGetFormOptions,onSelectTicket,
  fetchSuccess, fetchError, fetchStart,
})(TicketDetails);