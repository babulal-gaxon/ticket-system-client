import React, {Component} from 'react';
import {Button, Divider, Form, Input} from "antd/lib/index";
import InfoView from "../../../components/InfoView";

class GeneralDetails extends Component {
  constructor(props) {
    super(props);
    if (this.props.generalSettingsData === null) {
      this.state = {
        name: "",
        url: "",
        logo: null,
        favicon: null,
        allowed_ext: "",
        file_upload_max_size: null,
        email: ""
      }
    } else {
      const {name, website, file_upload_max_size, email, logo, favicon, allowed_ext} = this.props.generalSettingsData;
      this.state = {
        name: name,
        url: website,
        logo: logo,
        favicon: favicon,
        allowed_ext: allowed_ext,
        file_upload_max_size: file_upload_max_size,
        email: email
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.generalSettingsData) {
      const {name, allowed_ext, file_upload_max_size, email, logo, favicon, website} = nextProps.generalSettingsData;
      if (JSON.stringify(nextProps.generalSettingsData) !== JSON.stringify(this.props.generalSettingsData)) {
        this.setState({
          name: name,
          url: website,
          logo: logo,
          favicon: favicon,
          allowed_ext: allowed_ext,
          file_upload_max_size: file_upload_max_size,
          email: email
        })
      }
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.setState({logo: this.props.companyLogo, favicon: this.props.favicon}, () => {
          this.props.onSaveGeneralDetails({...this.state});
        });
      }
    });
  };

  onLogoSelect = (e) => {
    let file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    this.props.onAddCompanyLogo(data);
  };

  onFaviconSelect = (e) => {
    let file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    this.props.onAddCompanyFavicon(data);
  };

  render() {
    const {name, url, email, allowed_ext, file_upload_max_size} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="gx-main-layout-content">
        <Form layout="vertical" style={{width: "50%"}}>
          <Form.Item label="Company Name">
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{required: true, message: 'Please Enter Company Name!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({name: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="Company Website" extra="Please enter website in 'http//www.example.com' format">
            {getFieldDecorator('url', {
              initialValue: url,
              rules: [{required: true, message: 'Please Enter Company Website!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({url: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="Company Logo" extra="Size should be 250X100px, Maximum image size 50kb">
            {getFieldDecorator('logo', {
              rules: [{required: true, message: 'Please Select Logo!'}],
            })(<Input type="file" placeholder="Choose file..." addonAfter="Browse" onChange={this.onLogoSelect}/>)}
          </Form.Item>
          <Form.Item label="Favicon" extra="Size should be 40X40px, Maximum image size 50kb">
            {getFieldDecorator('favicon', {
              rules: [{required: true, message: 'Please Select Favicon!'}],
            })(<Input type="file" placeholder="Choose file..." addonAfter="Browse" onChange={this.onFaviconSelect}/>)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              initialValue: email,
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
          <Form.Item label="Allowed Extensions">
            {getFieldDecorator('allowed_ext', {
              initialValue: allowed_ext,
              rules: [{required: true, message: 'Please Select Allowed Extensions!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({allowed_ext: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="File upload max size">
            {getFieldDecorator('file_upload_max_size', {
              initialValue: file_upload_max_size,
              rules: [
                {
                  required: true,
                  message: 'Please Select File upload size!'},
                {
                  pattern: /^[0-9\b]+$/,
                  message: 'Please enter only numerical values',
                }],
            })(<Input type="text" addonAfter="MB" onChange={(e) => {
              this.setState({file_upload_max_size: e.target.value})
            }}/>)}
          </Form.Item>
        </Form>
        <Divider/>
        <Form.Item wrapperCol={{span: 12, offset: 6}}>
          <div className="gx-d-flex">
            <Button type="primary" style={{width: 100}} onClick={this.onValidationCheck}>
              Save
            </Button>
          </div>
        </Form.Item>
        <InfoView/>
      </div>
    );
  }
}

GeneralDetails = Form.create({})(GeneralDetails);

export default GeneralDetails;

