import React, {Component} from 'react';
import {Avatar, Input, Modal, Tag} from "antd";

const Search = Input.Search;

class TicketAssigning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStaffModal: false,
      selectedStaff: null,
      filterStaffText: "",
      assignedStaff: null
    };
  };

  onToggleStaffModal = () => {
    this.setState({showStaffModal: !this.state.showStaffModal})
  };

  onSelectStaff = (id) => {
    const staff = this.props.staffList.find(staff=> staff.id === id);
    this.setState({assignedStaff: staff});
    if(this.props.ticketId) {
      this.props.onAssignStaff(this.props.ticketId, id)
    }
    else {
      this.props.onAssignStaff(id);
    }
    this.onToggleStaffModal();
  };

  onFilterData = () => {
    return this.props.staffList.filter(staff => {
      const name = staff.first_name + " " + staff.last_name;
      if (name.indexOf(this.state.filterStaffText) !== -1) {
        return staff;
      }
    })
  };

  render() {
    console.log("ticketid", this.props.ticketId)
    const {showStaffModal, filterStaffText, assignedStaff} = this.state;
    const staffList = this.onFilterData();
    return (
      <div className="gx-main-layout-content">
        <div className="gx-mb-2">Assign To</div>
        {assignedStaff ?
          <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5"
               onClick={this.onToggleStaffModal}>
            {assignedStaff.avatar ?
              <Avatar className="gx-mr-3 gx-size-50" src={assignedStaff.avatar.src}/> :
              <Avatar className="gx-mr-3 gx-size-50"
                      style={{backgroundColor: '#f56a00'}}>{assignedStaff.first_name[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body gx-mt-2">
              <span className="gx-mb-0 gx-text-capitalize">{assignedStaff.first_name + " " + assignedStaff.last_name}</span>
              <div>{assignedStaff.email}</div>
            </div>
          </div> :
        <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5" onClick={this.onToggleStaffModal}>
          <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
          <div className="gx-media-body gx-mt-2">
            <span className="gx-mb-0 gx-text-capitalize">Currently Unassigned</span>
            <div className="gx-mt-2">
              <Tag>
                Click to Assign
              </Tag>
            </div>
          </div>
        </div>}
        <Modal
          title="Select Staff"
          centered
          visible={showStaffModal}
          onOk={this.onAddStaff}
          onCancel={this.onToggleStaffModal}>
          <Search value={filterStaffText} onChange={(e) => this.setState({filterStaffText: e.target.value})}/>
          {staffList.map(staff => {
            return <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5"
                        onClick={() => this.onSelectStaff(staff.id)}>
              {staff.avatar ?
                <Avatar className="gx-mr-3 gx-size-50" src={staff.avatar.src}/> :
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

export default TicketAssigning;