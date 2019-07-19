import React, {Component} from 'react';
import {Button, Col, Form, Input} from "antd/lib/index";

class StepFirst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      password: "",
      hostName: "",
      databaseName: ""
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {user_name, password, hostName, databaseName} = this.state;
    return (
      <div className="gx-flex-column gx-mt-3">
        <Form layout="vertical" style={{width: "70%"}}>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="User Name">
                {getFieldDecorator('user_name', {
                  initialValue: user_name,
                })(<Input type="text" onChange={(e) => this.setState({user_name: e.target.value})}/>)}
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
                {getFieldDecorator('hostName', {
                  initialValue: hostName,
                })(<Input type="text" onChange={(e) => this.setState({hostName: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Database">
                {getFieldDecorator('databaseName', {
                  initialValue: databaseName,
                })(<Input type="text" onChange={(e) => this.setState({databaseName: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
          <div className="gx-d-flex">
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
          </div>
        </Form>

      </div>
    );
  }
}

StepFirst = Form.create({})(StepFirst);

export default StepFirst;