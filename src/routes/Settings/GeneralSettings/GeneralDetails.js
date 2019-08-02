import React, {Component} from 'react';
import {Button, Divider, Form, Input, message, Upload} from "antd/lib/index";
import PropTypes from "prop-types";
import axios from 'util/Api'
import {getFileSize} from "../../../util/Utills";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

class GeneralDetails extends Component {
  constructor(props) {
    super(props);
    if (props.generalSettingsData === null) {
      this.state = {
        name: "",
        url: "",
        logo: null,
        favicon: null,
        allowed_ext: "",
        file_upload_max_size: null,
        email: "",
        logoList: [],
        faviconList: [],
        cpp_url: ""
      }
    } else {
      const {name, url, allowed_ext, file_upload_max_size, email, cpp_url, company_favicon, company_logo} = props.generalSettingsData;
      this.state = {
        name: name,
        url: url,
        logo: company_logo ? company_logo.id : null,
        favicon: company_favicon ? company_favicon.id : null,
        allowed_ext: allowed_ext,
        file_upload_max_size: file_upload_max_size,
        email: email,
        logoList: [],
        faviconList: [],
        cpp_url: cpp_url,
        logoName: company_logo ? company_logo.title : "",
        faviconName: company_favicon ? company_favicon.title : ""
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.generalSettingsData) {
      const {name, allowed_ext, file_upload_max_size, email, website, cpp_url, company_logo, company_favicon} = nextProps.generalSettingsData;
      if (JSON.stringify(nextProps.generalSettingsData) !== JSON.stringify(this.props.generalSettingsData)) {
        this.setState({
          name: name,
          url: website,
          logo: company_logo ? company_logo.id : null,
          favicon: company_favicon ? company_favicon.id : null,
          allowed_ext: allowed_ext,
          file_upload_max_size: file_upload_max_size,
          email: email,
          cpp_url: cpp_url,
          logoName: company_logo ? company_logo.title : "",
          faviconName: company_favicon ? company_favicon.title : ""
        })
      }
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        if (this.state.logoList.length > 0) {
          this.onLogoSelect();
        } else if (this.state.faviconList.length > 0) {
          this.onFaviconSelect();
        } else {
          this.props.onSaveGeneralDetails({...this.state})
        }
      }
    });
  };

  onLogoSelect = () => {
    let file = this.state.logoList[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    this.onAddLogo(data, "logo");
  };

  onFaviconSelect = () => {
    let file = this.state.faviconList[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    this.onAddLogo(data, "favicon");
  };

  onAddLogo = (file, key) => {
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        this.props.fetchSuccess();
        if (key === "logo") {
          this.setState({logo: data.data}, () => {
            if (this.state.faviconList.length > 0) {
              this.onFaviconSelect();
            } else {
              this.props.onSaveGeneralDetails({...this.state});
            }
            this.setState({logoList: []})
          })
        } else {
          this.setState({favicon: data.data}, () => {
            this.props.onSaveGeneralDetails({...this.state});
            this.setState({faviconList: []})
          })
        }
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  render() {
    const {messages} = this.props.intl;
    const {name, url, email, allowed_ext, file_upload_max_size, logoList, faviconList, cpp_url, logoName, faviconName} = this.state;
    const {getFieldDecorator} = this.props.form;
    const propsLogo = {
      accept: ".png",
      onRemove: file => {
        this.setState(state => {
          const index = state.logoList.indexOf(file);
          const newFileList = state.logoList.slice(-1);
          newFileList.splice(index, 1);
          return {
            logoList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        if (logoList.length > 0) {
          propsLogo.onRemove(logoList[0])
        }
        const isFileSize = file.size < getFileSize();
        if (!isFileSize) {
          message.error(messages["validation.message.imageSize"]);
        } else {
          this.setState(state => ({
            logoList: [...state.logoList, file],
          }));
        }
        return false;
      },
      fileList: logoList,
    };
    const propsFavicon = {
      accept: ".ico",
      onRemove: file => {
        this.setState(state => {
          const index = state.faviconList.indexOf(file);
          const newFileList = state.faviconList.slice(-1);
          newFileList.splice(index, 1);
          return {
            faviconList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        if (faviconList.length > 0) {
          propsFavicon.onRemove(faviconList[0])
        }
        const isFileSize = file.size < getFileSize();
        if (!isFileSize) {
          message.error(messages["validation.message.imageSize"]);
        } else {
          this.setState(state => ({
            faviconList: [...state.faviconList, file],
          }));
        }
        return false;
      },
      fileList: faviconList,
    };
    return (
      <div className="gx-main-layout-content">
        <Form layout="vertical" style={{width: "50%"}}>
          <Form.Item label={<IntlMessages id="companies.companyName"/>}>
            {getFieldDecorator('name', {
              initialValue: name,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: messages["validation.message.companyName"]}],
            })(<Input type="text" autoFocus onChange={(e) => {
              this.setState({name: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label={<IntlMessages id="settings.companyWebsite"/>} extra={<IntlMessages id="common.websiteFormatMessage"/>}>
            {getFieldDecorator('url', {
              initialValue: url,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: messages["validation.settings.companyURL"]}],
            })(<Input type="text" onChange={(e) => {
              this.setState({url: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label={<IntlMessages id="settings.clientURL"/>}>
            {getFieldDecorator('cpp_url', {
              initialValue: cpp_url,
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                message: messages["validation.settings.clientURL"]
              }],
            })(<Input type="text" onChange={(e) => this.setState({cpp_url: e.target.value})}/>)}
          </Form.Item>
          <Form.Item label={<IntlMessages id="common.companyLogo"/>}
                     extra={logoName && this.state.logoList.length === 0 ? logoName : <IntlMessages id="validation.settings.logoSize"/>}>
            <Upload {...propsLogo}>
              <Input placeholder={messages["common.chooseFile"]} addonAfter={<IntlMessages id="common.browse"/>} style={{width: "270%"}}/>
            </Upload>
          </Form.Item>
          <Form.Item label={<IntlMessages id="settings.favicon"/>}
                     extra={faviconName && this.state.logoList.length === 0 ? faviconName : <IntlMessages id="validation.settings.faviconSize"/>}>
            <Upload {...propsFavicon}>
              <Input placeholder="Choose file..." addonAfter="Browse" style={{width: "270%"}}/>
            </Upload>
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator('email', {
              initialValue: email,
              validate: [{
                trigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: 'Please Enter Email!'
                  },
                ],
              }, {
                trigger: 'onChange',
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ],
              }],
            })(<Input type="text" onChange={(e) => {
              this.setState({email: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="Allowed Extensions">
            {getFieldDecorator('allowed_ext', {
              initialValue: allowed_ext,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: 'Please Select Allowed Extensions!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({allowed_ext: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="File upload max size">
            {getFieldDecorator('file_upload_max_size', {
              initialValue: file_upload_max_size,
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  message: 'Please Select File upload size!'
                },
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
      </div>
    );
  }
}

GeneralDetails = Form.create({})(GeneralDetails);

export default injectIntl(GeneralDetails);

GeneralDetails.defaultProps = {
  generalSettingsData: null
};

GeneralDetails.propTypes = {
  generalSettingsData: PropTypes.object
};
