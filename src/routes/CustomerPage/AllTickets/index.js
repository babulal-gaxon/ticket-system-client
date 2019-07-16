import React, {Component} from 'react';
import {onGetFormOptions, onGetRaisedTickets} from "../../../appRedux/actions/Page";
import {connect} from "react-redux";
import InitialScreen from "./InitialScreen";
import TicketList from "./TicketsList";

class AllTickets extends Component {
  componentDidMount() {
    this.props.onGetRaisedTickets();
    this.props.onGetFormOptions();
  }

  render() {
    const {raisedTickets} = this.props;
    return (
      <div className="gx-main-layout-content">
        {raisedTickets.length > 0 ?
          <TicketList onGetRaisedTickets={this.props.onGetRaisedTickets}
                      totalTickets={this.props.totalTickets}/> : <InitialScreen/>}
      </div>
    );
  }
}

const mapPropsToState = ({customerPage}) => {
  const {raisedTickets, totalTickets} = customerPage;
  return {raisedTickets, totalTickets};
};

export default connect(mapPropsToState, {onGetRaisedTickets, onGetFormOptions})(AllTickets);
