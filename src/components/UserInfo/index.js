import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {onUserSignOut} from "appRedux/actions/Auth";
import {withRouter} from "react-router";
import IntlMessages from "../../util/IntlMessages";

class UserInfo extends Component {

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={() => this.props.history.push("/profile")}><IntlMessages id="common.myProfile"/></li>
        <li onClick={() => this.props.onUserSignOut()}><IntlMessages id="common.logout"/>
        </li>
      </ul>
    );
    const {authUser} = this.props;
    console.log("authUser", authUser)
    return (
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
               trigger="click">
        {authUser ?
          <div className="gx-d-flex gx-align-items-center">
            {authUser.avatar ? <Avatar src={authUser.avatar.src}
                                       className="gx-avatar gx-pointer" alt=""/> :
              <Avatar src={require("assets/images/placeholder.jpg")}
                      className="gx-avatar gx-pointer" alt=""/>}
            <span className="gx-text-white gx-px-2 gx-fs-md">{authUser ? authUser.display_name : "Loading"}</span>

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
