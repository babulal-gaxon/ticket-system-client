import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {onUserSignOut} from "appRedux/actions/Auth";
import {withRouter} from "react-router";

class UserProfile extends Component {

  render() {
    const {authUser} = this.props;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={() => this.props.history.push("/profile")}>My Profile</li>
        <li onClick={() => this.props.onUserSignOut()}>Logout</li>
      </ul>
    );

    return (
      <div className="gx-flex-row gx-align-items-center">
        <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
          <Avatar src='https://via.placeholder.com/150x150'
                  className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
          <span className="gx-avatar-name">{authUser ? authUser.first_name + " " + authUser.last_name : "Loading"}
            <i className="icon icon-chevron-down gx-fs-l gx-ml-2 gx-mt-2"/></span>
        </Popover>
      </div>
    )
  }
}

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser}
};

export default withRouter(connect(mapStateToProps, {onUserSignOut})(UserProfile));
