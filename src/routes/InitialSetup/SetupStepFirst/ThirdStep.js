import React, {Component} from 'react';
import {Button, Col, Divider, Form, Input, message, Select, Upload} from "antd/lib/index";
import axios from 'util/Api'
import {connect} from "react-redux";
import {onGetCountriesList} from "../../../appRedux/actions/GeneralSettings";
import {onSetGeneralInfo} from "../../../appRedux/actions/InitialSetup";
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";
import {getFileExtension, getFileSize} from "../../../util/Utills";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const {Option} = Select;

class ThirdStep extends Component {
  constructor(props) {
    super(props);
    if (props.initialSteps.completed_steps && props.initialSteps.completed_steps.company_setup) {
      const {name, url, phone, email, company_address, cpp_url} = props.initialSteps.completed_steps.company_setup;
      this.state = {
        name: name,
        url: url,
        phone: phone,
        email: email,
        address_line_1: company_address.address_line_1,
        address_line_2: company_address.address_line_2,
        city: company_address.city,
        state: company_address.state,
        country_id: company_address.country_id,
        zip_code: company_address.zip_code,
        cpp_url: cpp_url,
        fileList: []
      }
    } else {
      this.state = {
        name: "",
        url: "",
        logo: null,
        phone: null,
        email: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        country_id: "",
        zip_code: "",
        fileList: [],
        cpp_url: window.location.origin
      }
    }
  }

  componentDidMount() {
    this.props.onGetCountriesList();
  }

  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  onSearch = (val) => {
    console.log('search:', val);
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      console.log("err", err)
      if (!err) {
        this.onSubmitForm();
      }
    });
  };

  onSubmitForm = () => {
    if (this.state.fileList.length > 0) {
      this.onLogoSelect();
    } else {
      this.onInfoAdd();
    }
  };

  onInfoAdd = () => {
    this.props.onSetGeneralInfo({...this.state}, this.props.token, this.props.onMoveToNextStep, this);
  };

  onLogoSelect = () => {
    let file = this.state.fileList[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
    data.append('mime_type', file.type);
    this.onAddLogo(data);
  };

  onAddLogo = (file) => {
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        this.props.fetchSuccess();
        this.setState({logo: data.data}, () => {
          this.onInfoAdd();
          this.setState({fileList: []})
        })
      } else {
        this.props.fetchError(data.errors[0])
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };


  render() {
    const {name, url, phone, email, address_line_1, address_line_2, city, state, country_id, zip_code, cpp_url, fileList} = this.state;
    const {messages} = this.props.intl;
    const props = {
      accept: getFileExtension(),
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice(-1);
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        if (fileList.length > 0) {
          props.onRemove(fileList[0])
        }
        const isFileSize = file.size < getFileSize();
        if (!isFileSize) {
          message.error(messages["validation.message.imageSize"]);
        }
        if (isFileSize) {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
        }
        return false;
      },
      fileList,
    };
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="gx-flex-column gx-mt-3">
        <Form layout="vertical" style={{width: "70%"}}>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label={<IntlMessages id="companies.companyName"/>}>
                {getFieldDecorator('name', {
                  initialValue: name,
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    message: messages["validation.message.companyName"]
                  }],
                })(<Input type="text" autoFocus onChange={(e) => this.setState({name: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label={<IntlMessages id="settings.companyWebsite"/>}
                         extra={<IntlMessages id="common.websiteFormatMessage"/>}>
                {getFieldDecorator('url', {
                  initialValue: url,
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    message: messages["validation.settings.companyURL"]
                  }],
                })(<Input type="text" onChange={(e) => this.setState({url: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label={<IntlMessages id="common.companyLogo"/>}>
            <Upload {...props}>
              <Input placeholder={messages["common.chooseFile"]} readOnly
                     addonAfter={<IntlMessages id="common.browse"/>}/>
            </Upload>
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
          <Divider orientation="left" className="gx-mb-4"><IntlMessages id="setup.primaryContact"/></Divider>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label={<IntlMessages id="common.email"/>}>
                {getFieldDecorator('email', {
                  initialValue: email,
                  validate: [{
                    trigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: messages["validation.message.email"]
                      },
                    ],
                  }, {
                    trigger: 'onChange',
                    rules: [
                      {
                        type: 'email',
                        message: messages["validation.message.emailFormat"],
                      },
                    ],
                  }],
                })(<Input type="text" onChange={(e) => {
                  this.setState({email: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label={<IntlMessages id="common.phoneNo."/>}>
                {getFieldDecorator('phone', {
                  initialValue: phone,
                  validateTrigger: 'onBlur',
                  rules: [{
                    pattern: /^[0-9\b]+$/,
                    message: messages["validation.message.numericalValues"],
                  }],
                })(<Input type="text" onChange={(e) => {
                  this.setState({phone: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <Divider orientation="left" className="gx-mb-4"><IntlMessages id="common.address"/></Divider>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label={<IntlMessages id="setup.addressLine1"/>}>
                {getFieldDecorator('address_line_1', {
                  initialValue: address_line_1,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: messages["validation.setup.addressLine1"]}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({address_line_1: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label={<IntlMessages id="setup.addressLine2"/>}>
                {getFieldDecorator('address_line_2', {
                  initialValue: address_line_2,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: messages["validation.setup.addressLine1"]}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({address_line_2: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={8} xs={24} className="gx-pl-0">
              <Form.Item label={<IntlMessages id="common.country"/>}>
                {getFieldDecorator('country_id', {
                  initialValue: country_id,
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: messages["validation.message.country"]
                    }],
                })(<Select
                  showSearch
                  style={{width: 200}}
                  placeholder={messages["customer.address.countrySelect"]}
                  optionFilterProp="children"
                  onChange={this.onCountrySelect}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                  {this.props.countriesList.map(country => {
                    return <Option value={country.id} key={country.id}>{country.name}</Option>
                  })}
                </Select>)}
              </Form.Item>
            </Col>
            <Col sm={8} xs={24} className="gx-pl-0">
              <Form.Item label={<IntlMessages id="common.state"/>}>
                {getFieldDecorator('state', {
                  initialValue: state,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: messages["validation.message.state"]}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({state: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={8} xs={24} className="gx-pl-0 gx-pr-0">
              <Form.Item label={<IntlMessages id="common.city"/>}>
                {getFieldDecorator('city', {
                  initialValue: city,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: messages["validation.message.city"]}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({city: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label={<IntlMessages id="common.zip"/>}>
            {getFieldDecorator('zip_code', {
              initialValue: zip_code,
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  message: messages["validation.message.zip"]
                },
                {
                  pattern: /^[0-9\b]+$/,
                  message: messages["validation.message.numericalValues"]
                }
              ],
            })(<Input type="text" onChange={(e) => {
              this.setState({zip_code: e.target.value})
            }}/>)}
          </Form.Item>
          <div className="gx-d-flex">
            <Button type="default" onClick={() => {
              this.props.onMoveToPrevStep()
            }}><IntlMessages id="common.previous"/></Button>
            <Button type="primary" onClick={this.onValidationCheck}><IntlMessages id="common.next"/></Button>
          </div>
        </Form>
      </div>
    );
  }
}

ThirdStep = Form.create({})(ThirdStep);

const mapStateToProps = ({generalSettings, auth}) => {
  const {countriesList} = generalSettings;
  const {token} = auth;
  return {countriesList, token};
};

export default connect(mapStateToProps, {
  onGetCountriesList, onSetGeneralInfo, fetchSuccess,
  fetchStart, fetchError
})(injectIntl(ThirdStep));
