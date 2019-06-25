import React, {Component} from 'react';
import {Button, Divider, Form, Input} from "antd/lib/index";
import GeneralSettings from "./index";

class GeneralDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      url: "",
      logo: null,
      favicon: null,
      allowed_ext: "",
      file_upload_max_size: null,
      email: "",
      mobile: ""
    }}
  onSetFieldsValue = () => {
    this.props.form.setFieldsValue({
      name: this.state.name,
      allowed_ext: this.state.allowed_ext,
      file_upload_max_size: this.state.file_upload_max_size
    });
  };
  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        // this.onAddGeneralSettings();
      }
    });
  };
  render() {
    const {mobile} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form layout="vertical" style={{width:"50%"}}>
          <Form.Item label="Company Name">
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'Please Enter Company Name!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({name: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="Company Website">
            {getFieldDecorator('url', {
              rules: [{required: true, message: 'Please Enter Company Website!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({url: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="Company Logo" extra="Size should be 250X100px, Maximum image size 50kb">
            {getFieldDecorator('logo', {
              rules: [{required: true, message: 'Please Select Logo!'}],
            })(<Input type="file" placeholder="Choose file..." addonAfter="Browse"/>)}
          </Form.Item>
          <Form.Item label="Favicon" extra="Size should be 40X40px, Maximum image size 50kb">
            {getFieldDecorator('favicon', {
              rules: [{required: true, message: 'Please Select Favicon!'}],
            })(<Input type="file" placeholder="Choose file..." addonAfter="Browse"/>)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              rules: [{
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
                {
                  required: true,
                  message: 'Please Enter Email!'
                }],
            })(<Input type="text" onChange={(e) => {
              this.setState({email: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="Phone no.">
            <Input type="text" value={mobile} onChange={(e) => {
              this.setState({mobile: e.target.value})
            }}/>
          </Form.Item>
          <Form.Item label="Allowed Extensions">
            {getFieldDecorator('allowed_ext', {
              rules: [{required: true, message: 'Please Select Allowed Extensions!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({allowed_ext: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="File upload max size">
            {getFieldDecorator('file_upload_max_size', {
              rules: [{required: true, message: 'Please Select File upload size!'}],
            })(<Input type="text" addonAfter="MB" onChange={(e) => {
              this.setState({file_upload_max_size: e.target.value})
            }}/>)}
          </Form.Item>
        </Form>
        <Divider/>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <div className="gx-d-flex">
            <Button type="primary" style={{width: 100}}>
              Save
            </Button>
            <Button type="default" style={{width: 100}}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </div>
    );
  }
}

GeneralDetails = Form.create({})(GeneralDetails);

export default GeneralDetails;