import React, {Component} from 'react';
import {Button, Divider, Form, Input, Upload} from "antd/lib/index";
import InfoView from "../../../components/InfoView";
import PropTypes from "prop-types";
import axios from 'util/Api'

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
      logoList: [],
      faviconList: []
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.generalSettingsData) {
      const {name, allowed_ext, file_upload_max_size, email, logo, favicon, website, company_logo, company_favicon} = nextProps.generalSettingsData;
      if (JSON.stringify(nextProps.generalSettingsData) !== JSON.stringify(this.props.generalSettingsData)) {
        this.setState({
          name: name,
          url: website,
          logo: logo,
          favicon: favicon,
          allowed_ext: allowed_ext,
          file_upload_max_size: file_upload_max_size,
          email: email,
          // logoName: company_logo.title,
          // faviconName: company_favicon.title
        })
      }
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onLogoSelect();
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
            this.onFaviconSelect();
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
    const {name, url, email, allowed_ext, file_upload_max_size, logoList, faviconList} = this.state;
    const {getFieldDecorator} = this.props.form;
    const propsLogo = {
      onRemove: file => {
        this.setState(state => {
          const index = state.logoList.indexOf(file);
          const newFileList = state.logoList.slice(-1);
          newFileList.splice(index,1);
          return {
            logoList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        if(logoList.length >0) {
          propsLogo.onRemove(logoList[0])
        }
        this.setState(state => ({
          logoList: [...state.logoList, file],
        }));
        return false;
      },
      logoList,
    };
    const propsFavicon = {
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
        this.setState(state => ({
          faviconList: [...state.faviconList, file],
        }));

        return false;
      },
      faviconList,
    };
    return (
      <div className="gx-main-layout-content">
        <Form layout="vertical" style={{width: "50%"}}>
          <Form.Item label="Company Name">
            {getFieldDecorator('name', {
              initialValue: name,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: 'Please Enter Company Name!'}],
            })(<Input type="text" autoFocus onChange={(e) => {
              this.setState({name: e.target.value})
            }}/>)}
          </Form.Item>
          <Form.Item label="Company Website" extra="Please enter website in 'http//www.example.com' format">
            {getFieldDecorator('url', {
              initialValue: url,
              validateTrigger: 'onBlur',
              rules: [{required: true, message: 'Please Enter Company Website!'}],
            })(<Input type="text" onChange={(e) => {
              this.setState({url: e.target.value})
            }}/>)}
          </Form.Item>
          {this.props.generalSettingsData === null ?
            <Form.Item label="Company Logo" extra="Size should be 250X100px, Maximum image size 50kb">
              {getFieldDecorator('logo', {
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Select Logo!'}],
              })(<Upload {...propsLogo}>
                <Input placeholder="Choose file..." addonAfter="Browse"/>
              </Upload>)}
            </Form.Item> :
            <Form.Item label="Upload Logo" >
              <Upload {...propsLogo}>
                <Input placeholder="Choose file..." addonAfter="Browse"/>
              </Upload>
            </Form.Item>}
          {this.props.generalSettingsData === null ?
            <Form.Item label="Favicon" extra="Size should be 40X40px, Maximum image size 50kb">
              {getFieldDecorator('favicon', {
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Select Favicon!'}],
              })(<Upload {...propsFavicon}>
                <Input placeholder="Choose file..." addonAfter="Browse"/>
              </Upload>)}
            </Form.Item> :
            <Form.Item label="Upload Logo" >
              <Upload {...propsFavicon}>
                <Input placeholder="Choose file..." addonAfter="Browse"/>
              </Upload>
            </Form.Item>}
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
        <InfoView/>
      </div>
    );
  }
}

GeneralDetails = Form.create({})(GeneralDetails);

export default GeneralDetails;

GeneralDetails.defaultProps = {
  generalSettingsData: null
};

GeneralDetails.propTypes = {
  generalSettingsData: PropTypes.object
};