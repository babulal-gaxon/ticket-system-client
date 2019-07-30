import React, {Component} from 'react';
import {Button, Col, Divider, Form, Input, Select, Upload} from "antd/lib/index";
import axios from 'util/Api'
import {connect} from "react-redux";
import {onGetCountriesList} from "../../../appRedux/actions/GeneralSettings";
import {onSetGeneralInfo} from "../../../appRedux/actions/InitialSetup";
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";

const {Option} = Select;

class ThirdStep extends Component {
  constructor(props) {
    super(props);
    if (props.initialSteps.completed_steps && props.initialSteps.completed_steps.company_setup) {
      const {name, url, phone, email, address_line_1, address_line_2, city, state, country_id, zip_code, cpp_url} = props.initialSteps.completed_steps.company_setup;
      this.state = {
        name: name,
        url: url,
        phone: phone,
        email: email,
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        city: city,
        state: state,
        country_id: country_id,
        zip_code: zip_code,
        cpp_url: cpp_url
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
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
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
    this.props.onSetGeneralInfo({...this.state}, this.props.token, this.props.onMoveToNextStep);
  };

  onLogoSelect = () => {
    let file = this.state.fileList[0];
    const data = new FormData();
    data.append('file', file);
    data.append('title', file.name);
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
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };


  render() {
    const {name, url, phone, email, address_line_1, address_line_2, city, state, country_id, zip_code, cpp_url, fileList} = this.state;
    const props = {
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
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
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
              <Form.Item label="Company Name">
                {getFieldDecorator('name', {
                  initialValue: name,
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    message: 'Please Enter Company Name!'
                  }],
                })(<Input type="text" autoFocus onChange={(e) => this.setState({name: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Company Website" extra="Please enter website in 'http://www.example.com' format">
                {getFieldDecorator('url', {
                  initialValue: url,
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    message: 'Please Enter Company Website!'
                  }],
                })(<Input type="text" onChange={(e) => this.setState({url: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label="Upload Logo">
            <Upload {...props}>
              <Input placeholder="Choose file..." addonAfter="Browse"/>
            </Upload>
          </Form.Item>
          <Form.Item label="Client URl">
            {getFieldDecorator('cpp_url', {
              initialValue: cpp_url,
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                message: 'Please Enter Client URL!'
              }],
            })(<Input type="text" onChange={(e) => this.setState({cpp_url: e.target.value})}/>)}
          </Form.Item>
          <Divider orientation="left" className="gx-mb-4">Primary Contact</Divider>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Email Address">
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
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                  initialValue: phone,
                  validateTrigger: 'onBlur',
                  rules: [{
                    pattern: /^[0-9\b]+$/,
                    message: 'Please enter only numerical values',
                  }],
                })(<Input type="text" onChange={(e) => {
                  this.setState({phone: e.target.value})

                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <Divider orientation="left" className="gx-mb-4">Address</Divider>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Address Line 1">
                {getFieldDecorator('address_line_1', {
                  initialValue: address_line_1,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: 'Please Enter Address Line 1!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({address_line_1: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Address Line 2">
                {getFieldDecorator('address_line_2', {
                  initialValue: address_line_2,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: 'Please Enter Address Line 2!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({address_line_2: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={8} xs={24} className="gx-pl-0">
              <Form.Item label="Country">
                {getFieldDecorator('country_id', {
                  initialValue: country_id,
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Country Name!'
                    }],
                })(<Select
                  showSearch
                  style={{width: 200}}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={this.onCountrySelect}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
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
              <Form.Item label="State">
                {getFieldDecorator('state', {
                  initialValue: state,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: 'Please Enter State Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({state: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={8} xs={24} className="gx-pl-0 gx-pr-0">
              <Form.Item label="City">
                {getFieldDecorator('city', {
                  initialValue: city,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: 'Please Enter City Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({city: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label="Zip Code">
            {getFieldDecorator('zip_code', {
              initialValue: zip_code,
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  message: 'Please Enter Zip Code!'
                },
                {
                  pattern: /^[0-9\b]+$/,
                  message: 'Please enter only numerical values'
                }
              ],
            })(<Input type="text" onChange={(e) => {
              this.setState({zip_code: e.target.value})
            }}/>)}
          </Form.Item>
          <div className="gx-d-flex">
            <Button type="default" onClick={() => {
              this.props.onMoveToPrevStep()
            }}>Previous</Button>
            <Button type="primary" onClick={this.onValidationCheck}>Next</Button>
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
})(ThirdStep);
