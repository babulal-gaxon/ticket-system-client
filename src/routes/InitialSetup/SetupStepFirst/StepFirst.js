import React, {Component} from 'react';
import {Button, Col, Form, Input, Row} from "antd/lib/index";
import {connect} from "react-redux";
import {onCheckInitialSetup, onSendDatabaseInfo} from "../../../appRedux/actions/InitialSetup";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

class StepFirst extends Component {
  constructor(props) {
    super(props);
    if (props.initialSteps.completed_steps && props.initialSteps.completed_steps.database_setup) {
      const {username, host, database} = props.initialSteps.completed_steps.database_setup;
      this.state = {
        username: username,
        password: "",
        host: host,
        database: database,
      }
    } else {
      this.state = {
        username: "",
        password: "",
        host: "",
        database: "",
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.databaseInfo !== null) {
      this.setState({isFormOpen: false})
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onSendDatabaseInfo({...this.state}, this.props.onMoveToNextStep);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {username, password, host, database} = this.state;
    const {isFormVisible, initialSteps} = this.props;
    const {messages} = this.props.intl;
    return (
      <div className="gx-flex-column gx-mt-3">
        {!isFormVisible ?
          <Form layout="vertical" style={{width: "70%"}}>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label={<IntlMessages id="setup.hostName"/>}>
                  {getFieldDecorator('host', {
                    initialValue: host,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.setup.host"]}],
                  })(<Input type="text" onChange={(e) => this.setState({host: e.target.value})}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="setup.database"/>}>
                  {getFieldDecorator('database', {
                    initialValue: database,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.setup.database"]}],
                  })(<Input type="text" onChange={(e) => this.setState({database: e.target.value})}/>)}
                </Form.Item>
              </Col>
            </div>
            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label={<IntlMessages id="setup.userName"/>}>
                  {getFieldDecorator('username', {
                    initialValue: username,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.setup.username"]}],
                  })(<Input type="text" autoFocus onChange={(e) => this.setState({username: e.target.value})}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label={<IntlMessages id="common.password"/>}>
                  {getFieldDecorator('password', {
                    initialValue: password,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.inputPassword"]}],
                  })(<Input.Password type="text" onChange={(e) => this.setState({password: e.target.value})}/>)}
                </Form.Item>
              </Col>
            </div>
          </Form> : <div style={{width: "70%"}}>
            <div className="gx-d-flex gx-justify-content-between gx-mb-3">
              <span><IntlMessages id="sidebar.dashboard.settings"/>:</span>
              <span onClick={() => this.props.onFormOpen()}>
                <i className="icon icon-edit gx-mr-2"/><IntlMessages id="common.edit"/></span>
            </div>
            <Row>
              <Col span={6} className="gx-font-weight-bold">
                <IntlMessages id="setup.hostDetails"/>
              </Col>
              <Col>{initialSteps.completed_steps.database_setup.host}</Col>
            </Row>
            <Row className="gx-my-1">
              <Col span={6} className="gx-font-weight-bold">
                <IntlMessages id="setup.databaseDetails"/>
              </Col>
              <Col>{initialSteps.completed_steps.database_setup.database}</Col>
            </Row>
            <Row>
              <Col span={6} className="gx-font-weight-bold">
                <IntlMessages id="setup.userNameDetails"/>
              </Col>
              <Col>{initialSteps.completed_steps.database_setup.username}</Col>
            </Row>
          </div>}
        <div className="gx-d-flex gx-mt-3">
          <Button type="primary" onClick={this.onValidationCheck}><IntlMessages id="common.next"/></Button>
          {initialSteps && initialSteps.completed_steps.database_setup ?
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}><IntlMessages id="common.skip"/></Button> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({initialSetup}) => {
  const {databaseInfo} = initialSetup;
  return {databaseInfo};
};

StepFirst = Form.create({})(StepFirst);

export default connect(mapStateToProps, {
  onSendDatabaseInfo, onCheckInitialSetup
})(injectIntl(StepFirst));

