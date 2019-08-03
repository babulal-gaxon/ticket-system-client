import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {onUserSignUp} from "../appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";
import {injectIntl} from "react-intl";

const FormItem = Form.Item;

class SignUp extends React.Component {

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("values", values);
      if (!err) {
        this.props.onUserSignUp(values);
      }
    });
  };


  componentDidUpdate() {
    if (this.props.token !== null) {
      this.props.history.push('/');
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {messages} = this.props.intl;
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src='https://via.placeholder.com/272x395' alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signUp"/></h1>
                <p><IntlMessages id="app.userAuth.bySigning"/></p>
                <p><IntlMessages id="app.userAuth.getAccount"/></p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo.png")}/>
              </div>
            </div>

            <div className="gx-app-login-content">
              <Form onSubmit={this.onHandleSubmit} className="gx-signup-form gx-form-row0">
                <FormItem>
                  {getFieldDecorator('first_name', {
                    rules: [{required: true, message: messages["validation.auth.firstName"]}],
                  })(
                    <Input placeholder={messages["auth.firstName.placeholder"]}/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('last_name', {
                    rules: [{required: true, message: messages["validation.auth.lastName"]}],
                  })(
                    <Input placeholder={messages["auth.lastName.placeholder"]}/>
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{
                      required: true, type: 'email', message: messages["validation.auth.email"],
                    }],
                  })(
                    <Input placeholder={messages["auth.email"]}/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: messages["validation.auth.password"]}],
                  })(
                    <Input type="password" placeholder={messages["auth.password"]}/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                  )}
                  <span className="gx-link gx-signup-form-forgot"><IntlMessages
                    id="appModule.termAndCondition"/></span>
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signUp"/>
                  </Button>
                  <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                  id="app.userAuth.signIn"/></Link>
                </FormItem>
              </Form>
            </div>
            <InfoView/>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedSignUpForm = Form.create()(SignUp);

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default connect(mapStateToProps, {onUserSignUp})(injectIntl(WrappedSignUpForm));
