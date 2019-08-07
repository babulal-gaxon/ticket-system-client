import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {onUserSignOut} from "appRedux/actions/Auth";
import {MEDIA_BASE_URL} from "../../constants/ActionTypes";
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
    const {authUser} = this.props;

    return (
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
               trigger="click">
        {authUser ?
        <div style={{display: "flex"}}>
          {authUser.avatar !== null ? <Avatar src={MEDIA_BASE_URL + authUser.avatar.src}
                                     className="gx-avatar gx-pointer" alt=""/> :
            <Avatar src={require("assets/images/placeholder.jpg")}
                    className="gx-avatar gx-pointer" alt=""/>}
          <span className="gx-text-white gx-p-2">{authUser ? authUser.display_name : "Loading"}</span>

        </div> : null}
      </Popover>

    )

  }
}


const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser}
};
export default withRouter(connect(mapStateToProps, {onUserSignOut})(UserInfo));
