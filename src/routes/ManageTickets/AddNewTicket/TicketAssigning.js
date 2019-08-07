import React, {Component} from 'react';
import {Avatar, Input, Modal, Tag} from "antd";
import PropTypes from "prop-types";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const Search = Input.Search;

class TicketAssigning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStaffModal: false,
      selectedStaff: null,
      filterStaffText: "",
      assignedStaff: props.assignedTo ? props.assignedTo : null
    };
  };

  onToggleStaffModal = () => {
    this.setState({showStaffModal: !this.state.showStaffModal})
  };

  onSelectStaff = (id) => {
    const staff = this.props.staffList.find(staff => staff.id === id);
    this.setState({assignedStaff: staff});
    if (this.props.ticketId) {
      this.props.onAssignStaff(this.props.ticketId, id)
    } else {
      this.props.onAssignStaff(id);
    }
    this.onToggleStaffModal();
  };

  onFilterData = () => {
    return this.props.staffList.filter(staff => {
      const name = staff.first_name.toLowerCase() + " " + staff.last_name.toLowerCase();
      return (name.includes(this.state.filterStaffText.toLowerCase())) ?
        staff : null
    })
  };

  render() {
    const {messages} = this.props.intl;
    const {showStaffModal, filterStaffText, assignedStaff} = this.state;
    const staffList = this.onFilterData();

    return (
      <div className="gx-main-layout-content">
        {assignedStaff ?
          <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5"
               onClick={this.onToggleStaffModal}>
            {assignedStaff.avatar ?
              <Avatar className="gx-mr-3 gx-size-50" src={MEDIA_BASE_URL + assignedStaff.avatar.src}/> :
              <Avatar className="gx-mr-3 gx-size-50"
                      style={{backgroundColor: '#f56a00'}}>{assignedStaff.first_name[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body gx-mt-2">
              <span
                className="gx-mb-0 gx-text-capitalize">{assignedStaff.first_name + " " + assignedStaff.last_name}</span>
              <div className="gx-mb-2">{assignedStaff.email}</div>
              <Tag>
                <IntlMessages id="common.clickToChange"/>
              </Tag>
            </div>
          </div> :
          <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5" onClick={this.onToggleStaffModal}>
            <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
            <div className="gx-media-body gx-mt-2">
              <span className="gx-mb-0 gx-text-capitalize"><IntlMessages id="common.unassigned"/></span>
              <div className="gx-mt-2">
                <Tag>
                  <IntlMessages id="common.clickToAssign"/>
                </Tag>
              </div>
            </div>
          </div>}
        <Modal
          title={<IntlMessages id="common.selectStaff"/>}
          centered
          visible={showStaffModal}
          onCancel={this.onToggleStaffModal}
          footer={[
            null,
            null,
          ]}>
          <Search value={filterStaffText} placeholder={messages["manageTickets.filterBar.searchStaff"]}
                  onChange={(e) => this.setState({filterStaffText: e.target.value})}/>
          {staffList.map(staff => {
            return <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5"
                        onClick={() => this.onSelectStaff(staff.id)} key={staff.id}>
              {staff.avatar ?
                <Avatar className="gx-mr-3 gx-size-50" src={MEDIA_BASE_URL + staff.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-50"
                        style={{backgroundColor: '#f56a00'}}>{staff.first_name[0].toUpperCase()}</Avatar>}
              <div className="gx-media-body gx-mt-2">
                <span className="gx-mb-0 gx-text-capitalize">{staff.first_name + " " + staff.last_name}</span>
                <div>{staff.email}</div>
              </div>
            </div>
          })}
        </Modal>
      </div>
    );
  }
}

export default injectIntl(TicketAssigning);

TicketAssigning.defaultProps = {
  staffList: [],
  assignedTo: null,
  ticketId: null
};

TicketAssigning.propTypes = {
  staffList: PropTypes.array,
  assignedTo: PropTypes.object,
  ticketId: PropTypes.number
};
