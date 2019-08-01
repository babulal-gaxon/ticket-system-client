import React, {Component} from 'react';
import {Col, Row} from "antd/lib/index";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  onAddStaffNote,
  onDeleteStaffNotes,
  onEditStaffNotes,
  onGetStaffDetail,
  onGetStaffNotes,
  onGetStaffTickets,
  onNullifyCurrentStaff,
  onSetCurrentStaff
} from "../../../../appRedux/actions/SupportStaff";
import qs from "qs";
import StaffInfo from "./StaffInfo";
import AssignedTickets from "./AssignedTickets";
import StaffNotesList from "./StaffNotesList";
import TotalLoggedTime from "./TotalLoggedTime";
import TodayLoggedTime from "./TodayLoggedTime";
import {withRouter} from "react-router";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    }
  }

  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    this.props.onGetStaffDetail(queryParams.id);
    this.props.onGetStaffNotes(queryParams.id);
    this.props.onGetStaffTickets(queryParams.id);
  }


  onEditProfile = () => {
    this.props.onSetCurrentStaff(this.props.currentStaff);
    this.props.history.push('/staff/add-new-member')
  };

  onBackToList = () => {
    this.props.history.goBack();
    this.props.onNullifyCurrentStaff();
  };

  render() {
    const {currentStaff, staffNotes, staffTickets} = this.props;

    return (
      <div className="gx-main-layout-content">
        {currentStaff ?
          <div className="gx-main-content">
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                {StaffInfo(currentStaff, this)}
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    {TotalLoggedTime()}
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    {TodayLoggedTime()}
                  </Col>
                </Row>
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <StaffNotesList staffNotes={staffNotes}
                                    staffId={currentStaff.id}
                                    onAddStaffNote={this.props.onAddStaffNote}
                                    onEditStaffNotes={this.props.onEditStaffNotes}
                                    onDeleteStaffNotes={this.props.onDeleteStaffNotes}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <AssignedTickets staffTickets={staffTickets}/>
          </div> : null}
      </div>
    );
  }
}

const mapStateToProps = ({supportStaff, ticketList}) => {
  const {currentTicket} = ticketList;
  const {staffNotes, staffTickets, currentStaff} = supportStaff;
  return {staffNotes, staffTickets, currentTicket, currentStaff};
};


export default withRouter(connect(mapStateToProps, {
  onGetStaffNotes,
  onAddStaffNote,
  onEditStaffNotes,
  onDeleteStaffNotes,
  onGetStaffTickets,
  onSetCurrentStaff,
  onGetStaffDetail,
  onNullifyCurrentStaff
})(StaffDetail));

StaffDetail.defaultProps = {
  totalItems: null
};

StaffDetail.defaultProps = {
  staff: null
};

StaffDetail.propTypes = {
  staff: PropTypes.object,
  onBackToList: PropTypes.func,

  history: PropTypes.object
};
