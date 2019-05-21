import React, {Component} from "react"
import {connect} from "react-redux"
import {Avatar} from "antd";
import {onGetTickets} from "../../../appRedux/actions/TicketListing";
import {tickets} from "./data"
class TicketListing extends Component {
render() {
  console.log(this.props.tickets);
  return (

    <div>
      {/*<Avatar styleName="mr-4" image={this.props.tickets.avatar} name={this.props.tickets.name}/>*/}
      <div >
        <h4 >hello</h4>
        <h4 >subject</h4>
        <p >demo message</p>
      </div>
      <div>
        <span>6 pm</span>
      </div>
    </div>
  );
}
}


 const mapStateToProps = ({ticketListing}) => {
   const {tickets} = ticketListing;
   return {tickets};
 }

 export default connect(mapStateToProps, {onGetTickets})(TicketListing);