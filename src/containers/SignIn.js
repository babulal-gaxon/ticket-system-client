import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {connect} from "react-redux";

import {onUserSignIn} from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import InfoView from "../components/InfoView";
import {injectIntl} from "react-intl";

const FormItem = Form.Item;

class SignIn extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onUserSignIn(values);
      }
    });
  };

  componentDidUpdate() {
    if (this.props.token !== null) {
      this.props.history.push('/customer/all-tickets');
    }
  }

  onSignUpClick = () => {
    this.props.history.push('/signup');
  };

  onForgetPassword = () => {
    this.props.history.push('/forget-password')
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {messages} = this.props.intl;

    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo">
                {/*<img alt="example" src={require("assets/images/logo.png")}/>*/}
              </div>
            </div>
            <div className="gx-app-login-content">
              <h2 className="gx-font-weight-semi-bold"><IntlMessages id="auth.signin.heading"/></h2>
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <FormItem label={<IntlMessages id="auth.enterEmail"/>}>
                  {getFieldDecorator('email', {
                    initialValue: "admin@g-axon.com",
                    rules: [{
                      required: true, type: 'email', message: messages["validation.auth.email"],
                    }],
                  })(
                    <Input placeholder={messages["auth.email.placeholder"]}/>
                  )}
                </FormItem>
                <FormItem label={<IntlMessages id="auth.enterPassword"/>}>
                  {getFieldDecorator('password', {
                    initialValue: "123456",
                    rules: [{required: true, message: messages["validation.auth.password"]}],
                  })(
                    <Input type="password" placeholder={messages["auth.enterPassword"]}/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox><IntlMessages id="appModule.staySignedIn"/></Checkbox>
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" style={{width: "100%"}} className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn"/>
                  </Button>
                </FormItem>
              </Form>
              <div style={{justifyContent: "center", textAlign: "center"}}>
                <h4 className="gx-text-grey" onClick={this.onForgetPassword}><IntlMessages id="auth.ForgotPassword"/>
                </h4>
                <div className="gx-mb-1 gx-d-flex" style={{justifyContent: "center", textAlign: "center"}}>
                  <h4 className="gx-text-grey gx-mr-2"><IntlMessages id="auth.newToTicksUp"/></h4>
                  <h4 className="gx-text-primary" onClick={this.onSignUpClick}><IntlMessages id="app.userAuth.signUp"/>
                  </h4></div>
              </div>
            </div>
            <InfoView/>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default connect(mapStateToProps, {onUserSignIn})(injectIntl(WrappedNormalLoginForm));
