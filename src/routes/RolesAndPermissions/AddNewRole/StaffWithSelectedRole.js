import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Avatar, Input} from "antd";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";

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
      return this.state.staffWithSelectedRole.filter(staff => {
        const name = staff.first_name + " " + staff.last_name;
        return (name.indexOf(this.state.filterText) !== -1) ? staff : null
        }
      )
    } else {
      return [];
    }
  };

  render() {
    const {filterText} = this.state;
    const staffList = this.onFilterStaffList();
    return (
      <div className="gx-main-layout-content">
        <h5 className="gx-mb-4">Associated Staff Members</h5>
        <div className="gx-d-flex gx-align-items-center">
          <Search
            placeholder="Enter keywords to search roles"
            value={filterText}
            onChange={(e) => this.setState({filterText: e.target.value})}/>
        </div>
        {staffList.length !== 0 ?
          <div>
            <div className="gx-mt-2 gx-mb-4">Member Name</div>
            {staffList.map(staff => {
              return <Widget key={staff.id} styleName="gx-card-filter">
                <div className="gx-d-flex gx-justify-content-between">
              <span className="gx-email gx-d-inline-block gx-mr-2">
                {staff.avatar ?
                  <Avatar className="gx-mr-3 gx-size-50" src={staff.avatar.src}/> :
                  <Avatar className="gx-mr-3 gx-size-50"
                          style={{backgroundColor: '#f56a00'}}>{staff.first_name[0].toUpperCase()}</Avatar>}
                {staff.first_name + " " + staff.last_name} </span>
                  <span>
                    {(Permissions.canStaffEdit()) ?
                      <i className="icon icon-edit gx-mr-3" onClick={() => {
                    this.props.onGetStaffId(staff.id);
                    this.props.history.push('/staff/add-new-member')
                  }}/> : null}
                    {(Permissions.canViewStaffDetail()) ?
                      <i className="icon icon-custom-view" onClick={() => this.props.onSelectStaff(staff)}/>
                    : null}
                </span>
                </div>
              </Widget>
            })}
          </div> : filterText === "" ?
            <div className="gx-justify-content-between">No staff member assigned to this role yet!</div> :
            <div className="gx-justify-content-between">No record found</div>}
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