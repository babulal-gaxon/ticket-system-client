import React from "react";
import {Button, Form, Input} from "antd";
import {connect} from "react-redux";
import IntlMessages from "util/IntlMessages";
import InfoView from "../../components/InfoView";
import {onResetPassword} from "../../appRedux/actions";
import {Link} from "react-router-dom";

const FormItem = Form.Item;

class ForgetPassword extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onResetPassword(values);
      }
    });
  };

  // componentDidUpdate() {
  //   if (this.props.token !== null) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

  onCancelReset = () => {
    this.props.history.goBack();
  };

  render() {
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
                <p><IntlMessages id="app.userAuth.forgetPasswordText"/></p>
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <FormItem label="Enter Registered Email Address">
                  {getFieldDecorator('email', {
                    initialValue: "admin@g-axon.com",
                    rules: [{
                      required: true, type: 'email', message: 'The input is not valid E-mail!',
                    }],
                  })(
                    <Input placeholder="Email"/>
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.send"/>
                  </Button>
                </FormItem>
              </Form>
              <Link to="/signin"><IntlMessages
                id="app.userAuth.goback"/></Link>
            </div>
            <InfoView/>
          </div>
        </div>
      </div>
    );
  }
}

ForgetPassword = Form.create({})(ForgetPassword);

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default connect(mapStateToProps, {onResetPassword})(ForgetPassword);
