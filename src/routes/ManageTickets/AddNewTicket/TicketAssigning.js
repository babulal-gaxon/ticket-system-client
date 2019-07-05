import React, {Component} from 'react';
import {Avatar, Input, Modal, Tag} from "antd";

const Search = Input.Search;

class TicketAssigning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      showStaffModal: false,
      selectedStaff: null
    };
  };

  onToggleStaffModal = () => {
    this.setState({showStaffModal: !this.state.showStaffModal})
  };

  onFlagSet = () => {
    this.setState({flag: !this.state.flag})
  };

  onAddStaff = () => {
    this.props.onAssignStaffToTicket()
  };

  render() {
    const {showStaffModal} = this.state;
    const staffList = this.props.staffList;
    return (
      <div className="gx-main-layout-content">
        <div className="gx-mb-2">Assign To</div>
        <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
          <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
          <div className="gx-media-body gx-mt-2">
            <span className="gx-mb-0 gx-text-capitalize">Currently Unassigned</span>
            <div className="gx-mt-2">
              <Tag color="#f50" onClick={this.onToggleStaffModal}>
                Click to Assign
              </Tag>
            </div>
          </div>
        </div>
        <Modal
          title="Select Staff"
          centered
          visible={showStaffModal}
          onOk={this.onAddStaff}
          onCancel={this.onToggleStaffModal}>
          <Search/>
          {staffList.map(staff => {
            return <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
              {staff.avatar ?
                <Avatar className="gx-mr-3 gx-size-50" src={staff.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-50"
                        style={{backgroundColor: '#f56a00'}}>{staff.first_name[0].toUpperCase()}</Avatar>}
              <div className="gx-media-body gx-mt-2">
                <span className="gx-mb-0 gx-text-capitalize">{staff.first_name + " " + staff.last_name}</span>
              </div>
            </div>
          })}
        </Modal>
      </div>
    );
  }
}

export default TicketAssigning;