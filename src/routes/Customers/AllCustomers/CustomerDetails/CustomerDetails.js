import React, {Component} from "react"
import {Col, Row} from "antd/lib/index";
import {connect} from "react-redux";
import {
  onGetCustomerCompany,
  onGetCustomerDetail,
  onGetCustomerTickets,
  onNullifyCurrentCustomer,
  setCurrentCustomer
} from "../../../../appRedux/actions/Customers";
import PropTypes from "prop-types";
import qs from "qs";
import CustomerInfo from "./CustomerInfo";
import CompanyMembers from "./CompanyMembers";
import CustomerTickets from "./CustomerTickets";

class CustomerDetails extends Component {


  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    this.props.onGetCustomerDetail(queryParams.id);
    this.props.onGetCustomerTickets(queryParams.id);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.currentCustomerProfile === null && nextProps.currentCustomerProfile) {
      if (nextProps.currentCustomerProfile.company) {
        this.props.onGetCustomerCompany(nextProps.currentCustomerProfile.company.id);
      }
    }
  }

  componentWillUnmount() {
    this.props.onNullifyCurrentCustomer();
  }

  onGetTicketDetail = record => {
    this.props.history.push(`/manage-tickets/ticket-detail?id=${record.id}`);
  };

  onEditProfile = () => {
    this.props.setCurrentCustomer(this.props.currentCustomerProfile);
    this.props.history.push('/customers/add-customers')
  };

  onBackToList = () => {
    this.props.history.goBack();
  };

  render() {

    const {currentCustomerProfile, customerCompanyMembers, customerTickets} = this.props;
    return (
      <div className="gx-main-layout-content">
        {currentCustomerProfile ?
          <div className="gx-main-content">
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <CustomerInfo currentCustomerProfile={currentCustomerProfile} onEditProfile={this.onEditProfile}
                              onBackToList={this.onBackToList}/>
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <CompanyMembers currentCustomerProfile={currentCustomerProfile}
                                customerCompanyMembers={customerCompanyMembers}/>
              </Col>
            </Row>
            <CustomerTickets customerTickets={customerTickets} onGetTicketDetail={this.onGetTicketDetail}/>
          </div> : null}
      </div>
    );
  }
}

const mapPropsToState = ({customers, ticketList}) => {
  const {currentTicket} = ticketList;
  const {customerTickets, customerCompanyMembers, currentCustomerProfile} = customers;
  return {customerTickets, customerCompanyMembers, currentTicket, currentCustomerProfile};
};

export default connect(mapPropsToState, {
  setCurrentCustomer,
  onGetCustomerTickets,
  onGetCustomerCompany,
  onGetCustomerDetail,
  onNullifyCurrentCustomer
})(CustomerDetails);

CustomerDetails.defaultProps = {
  customerTickets: [],
  currentTicket: null,
  customerCompanyMembers: [],
  currentCustomerProfile: null
};

CustomerDetails.propTypes = {
  customerTickets: PropTypes.array,
  currentTicket: PropTypes.object,
  customerCompanyMembers: PropTypes.array,
  currentCustomerProfile: PropTypes.object,
};

