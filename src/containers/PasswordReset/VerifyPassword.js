import React from "react";
import {Button, Form, Input} from "antd";
import {connect} from "react-redux";
import IntlMessages from "util/IntlMessages";
import InfoView from "../../components/InfoView";
import qs from "qs";
import {onSetNewPassword} from "../../appRedux/actions";

class VerifyPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password_confirmation: "",
      password: "",
      email: ""
    }
  }

  handleSubmit = (e) => {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSetNewPassword(queryParams.token, {...this.state}, this.props.history);
      }
    });
  };

  handleConfirmBlur = e => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['password_confirmation'], {force: true});
    }
    callback();
  };

  render() {
    const {email} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.resetPassword"/></h1>
                <p><IntlMessages id="app.userAuth.ResetPasswordText"/></p>
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <Form.Item label="Enter Email Address">
                  {getFieldDecorator('email', {
                    initialValue: email,
                    rules: [{
                      required: true, type: 'email', message: 'The input is not valid E-mail!',
                    }],
                  })(
                    <Input placeholder="Email" onChange={(e) => this.setState({email:e.target.value})}/>
                  )}
                </Form.Item>
                <Form.Item label="Enter new Password" hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                      {
                        min: 8,
                        message: 'Length should be at least 8 characters long',
                      }],
                  })(<Input.Password onChange={(e) => this.setState({password: e.target.value})}/>)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator('password_confirmation', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur}
                                     onChange={(e) => this.setState({password_confirmation: e.target.value})}/>)}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.resetPassword"/>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <InfoView/>
      </div>
    );
  }
}

const WrappedVerifyPasswordForm = Form.create()(VerifyPassword);

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default connect(mapStateToProps, {onSetNewPassword})(WrappedVerifyPasswordForm);
