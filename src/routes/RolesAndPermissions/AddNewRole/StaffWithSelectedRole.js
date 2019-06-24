import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Avatar} from "antd";

class StaffWithSelectedRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffWithSelectedRole : [],
      filterText: ""
    }
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
    if(this.state.staffWithSelectedRole.length !==0) {
      return this.state.staffWithSelectedRole.filter(staff => staff.first_name.indexOf(this.state.filterText) !== -1)
    }
  };
  render() {
    console.log("selectedRole", this.props.selectedRole)
    const staffList = this.onFilterData();
    console.log(this.state.staffWithSelectedRole)
    return (
      <div>
        {/*<div>*/}
        {/*  <div className="gx-mt-4 gx-mb-4">Member Name</div>*/}
        {/*  {staffList.map(staff => {*/}
        {/*    return <Widget styleName="gx-card-filter">*/}
        {/*      <div className="gx-d-flex gx-justify-content-between">*/}
        {/*<span className="gx-email gx-d-inline-block gx-mr-2">*/}
        {/*     <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>*/}
        {/*  {staff.first_name + " " + staff.last_name} </span>*/}
        {/*        <span> <i className="icon icon-edit gx-mr-3" onClick={() => {*/}
        {/*          this.props.onGetStaffId(staff.id);*/}
        {/*          this.props.history.push('/staff/add-new-member')*/}
        {/*        }}/>*/}
        {/*  <i className="icon icon-trash"/>*/}
        {/*  </span>*/}
        {/*      </div>*/}
        {/*    </Widget>*/}
        {/*  })};*/}
        {/*</div>*/}
        hello
      </div>
    );
  }
}

export default StaffWithSelectedRole;