import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {onUserSignOut} from "appRedux/actions/Auth";
import {withRouter} from "react-router";
import IntlMessages from "../../util/IntlMessages";

class UserProfile extends Component {

  render() {
    console.log("authuser in topabar", this.props.authUser)
    const {authUser} = this.props;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={() => this.props.history.push("/profile")}><IntlMessages id="topBar.dashboard.myProfile"/></li>
        <li onClick={() => this.props.onUserSignOut()}><IntlMessages id="topBar.dashboard.logout"/></li>
      </ul>
    );

    return (
      <div className="gx-flex-row gx-align-items-center">
        <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
          {authUser.avatar ?
            <Avatar src={authUser.avatar.src}
                    className="gx-size-40 gx-pointer gx-mr-3" alt=""/> :
            <Avatar src={require("assets/images/placeholder.jpg")}
                    className="gx-size-40 gx-pointer gx-mr-3" alt=""/>}
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
