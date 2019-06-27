import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Avatar, Input} from "antd";
import PropTypes from "prop-types";

const Search = Input.Search;

class StaffWithSelectedRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffWithSelectedRole: [],
      filterText: ""
    }
  }

  componentWillMount() {
    this.onFilterData();
  }

  onFilterTextChange = event => {
    this.setState({filterText: event.target.value})
  };

  onFilterData = () => {
    let staffWithRole = [];
    if (this.props.selectedRole !== null) {
      staffWithRole = this.props.staffList.filter(staff => staff.role_id === this.props.selectedRole.id);
    }
    this.setState({staffWithSelectedRole: staffWithRole});
  };

  onFilterStaffList = () => {
    if (this.state.staffWithSelectedRole.length !== 0) {
      return this.state.staffWithSelectedRole.filter(staff => staff.first_name.indexOf(this.state.filterText) !== -1)
    } else {
      return [];
    }
  };

  render() {
    const staffList = this.onFilterStaffList();

    return (
      <div>
        <h5 className="gx-mb-4">Associated Staff Members</h5>
        <div className="gx-d-flex gx-align-items-center">
          <Search
            placeholder="Enter keywords to search roles"
            value={this.state.filterText}
            onChange={(e) => this.setState({filterText: e.target.value})}/>
        </div>
        <div className="gx-mt-4 gx-mb-4">Member Name</div>
        {staffList.length !== 0 ?
          staffList.map(staff => {
            return <Widget styleName="gx-card-filter">
              <div className="gx-d-flex gx-justify-content-between">
              <span className="gx-email gx-d-inline-block gx-mr-2">
                <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
                {staff.first_name + " " + staff.last_name} </span>
                <span> <i className="icon icon-edit gx-mr-3" onClick={() => {
                  this.props.onGetStaffId(staff.id);
                  this.props.history.push('/staff/add-new-member')
                }}/>
                <i className="icon icon-custom-view" onClick={() => this.props.onSelectStaff(staff)}/>
                </span>
              </div>
            </Widget>
          }) : <div>No staff member assigned to this role yet!</div>}
      </div>
    );
  }
}

export default StaffWithSelectedRole;

StaffWithSelectedRole.defaultProps = {
  selectedRole: {},
  userPermissions: {},
  staffList: []
};

StaffWithSelectedRole.propTypes = {
  selectedRole: PropTypes.object,
  userPermissions: PropTypes.object,
  onGetStaffId: PropTypes.func,
  onSelectStaff: PropTypes.func
};