import React, {Component} from 'react';
import Widget from "../../../components/Widget";
import {Avatar, Input} from "antd";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

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
    this.onFilterData(this.props.staffList);
  }

  onFilterTextChange = event => {
    this.setState({filterText: event.target.value})
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.onFilterData(nextProps.staffList)
  }

  onFilterData = (staffList) => {
    let staffWithRole = [];
    if (this.props.selectedRole !== null) {
      staffWithRole = staffList.filter(staff => staff.role_id === this.props.selectedRole.id);
    }
    this.setState({staffWithSelectedRole: staffWithRole});
  };

  onFilterStaffList = () => {
    if (this.state.staffWithSelectedRole.length !== 0) {
      return this.state.staffWithSelectedRole.filter(staff => {
          const name = staff.first_name.toLowerCase() + " " + staff.last_name.toLowerCase();
          return (name.includes(this.state.filterText.toLowerCase())) ? staff : null
        }
      )
    } else {
      return [];
    }
  };

  render() {
    const {messages} = this.props.intl;
    const {filterText} = this.state;
    const staffList = this.onFilterStaffList();
    return (
      <div className="gx-main-layout-content">
        <h5 className="gx-mb-4"><IntlMessages id="roles.staffMembers"/></h5>
        <div className="gx-d-flex gx-align-items-center">
          <Search
            placeholder={messages["manageTickets.filterBar.searchStaff"]}
            value={filterText}
            onChange={(e) => this.setState({filterText: e.target.value})}/>
        </div>
        {staffList.length !== 0 ?
          <div>
            <div className="gx-mt-2 gx-mb-4"><IntlMessages id="common.member"/></div>
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
                      <i className="icon icon-edit gx-mr-3 gx-p-2 gx-pointer " onClick={() => {
                        this.props.onSetCurrentStaff(staff);
                        this.props.history.push('/staff/add-new-member')
                      }}/> : null}
                    {(Permissions.canViewStaffDetail()) ?
                      <i className="icon icon-custom-view gx-p-2 gx-pointer"
                         onClick={() =>
                           this.props.history.push(`/staff/member-detail?id=${staff.id}`)}/>
                      : null}
                </span>
                </div>
              </Widget>
            })}
          </div> : filterText === "" ?
            <div className="gx-justify-content-between"><IntlMessages id="roles.noStaffMessage"/></div> :
            <div className="gx-justify-content-between"><IntlMessages id="common.noRecord"/></div>}
      </div>
    );
  }
}

export default injectIntl(StaffWithSelectedRole);

StaffWithSelectedRole.defaultProps = {
  selectedRole: {},
  userPermissions: {},
  staffList: []
};

StaffWithSelectedRole.propTypes = {
  selectedRole: PropTypes.object,
  userPermissions: PropTypes.object,
  onSetCurrentStaff: PropTypes.func,
  onSelectStaff: PropTypes.func
};
