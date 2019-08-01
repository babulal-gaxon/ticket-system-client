import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {onUserSignOut} from "appRedux/actions/Auth";
import {withRouter} from "react-router";

class UserInfo extends Component {

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={() => this.props.history.push("/profile")}>My Profile</li>
        <li onClick={() => this.props.onUserSignOut()}>Logout
        </li>
      </ul>
    );

    return (
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
               trigger="click">
        <Avatar src='https://via.placeholder.com/150x150'
                className="gx-avatar gx-pointer" alt=""/>
      </Popover>
    )

  }
}

export default withRouter(connect(null, {onUserSignOut})(UserInfo));
