import React, {Component} from 'react';
import {Button, Col, Form, Input} from "antd/lib/index";
import {connect} from "react-redux";
import {onSendDatabaseInfo} from "../../../appRedux/actions/InitialSetup";
import InfoView from "../../../components/InfoView";
import {onCheckInitialSetup} from "../../../appRedux/actions";

class StepFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      host: "",
      database: ""
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
    return (
      <div className="gx-flex-column gx-mt-3">
        <Form layout="vertical" style={{width: "70%"}}>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="User Name">
                {getFieldDecorator('username', {
                  initialValue: username,
                })(<Input type="text" onChange={(e) => this.setState({username: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  initialValue: password,
                })(<Input type="text" onChange={(e) => this.setState({password: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Host Name">
                {getFieldDecorator('host', {
                  initialValue: host,
                })(<Input type="text" onChange={(e) => this.setState({host: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Database">
                {getFieldDecorator('database', {
                  initialValue: database,
                })(<Input type="text" onChange={(e) => this.setState({database: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
          <div className="gx-d-flex">
            <Button type="primary" onClick={this.onValidationCheck}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
          </div>
        </Form>
        <InfoView/>
      </div>
    );
  }
}

StepFirst = Form.create({})(StepFirst);

export default connect(null, {
  onSendDatabaseInfo, onCheckInitialSetup
})(StepFirst);

