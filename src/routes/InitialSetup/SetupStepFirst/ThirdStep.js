import React, {Component} from 'react';
import {Button, Col, Divider, Form, Input, Select, Upload} from "antd/lib/index";
import {connect} from "react-redux";
import {onGetCountriesList} from "../../../appRedux/actions/GeneralSettings";
import {onSetGeneralInfo} from "../../../appRedux/actions/InitialSetup";
import axios from 'util/Api'
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";

const {Option} = Select;

class ThirdStep extends Component {
  constructor(props) {
    super(props);
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
      uploadedLogo: null,
      cpp_url: window.location.origin
    }
  }

  componentDidMount() {
    this.props.onGetCountriesList();
  }

  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSubmitForm();
      }
    });
  };

  onSubmitForm = () => {
    if (this.state.uploadedLogo) {
      this.onLogoSelect();
    } else {
      this.onInfoAdd();
    }
  };

  onInfoAdd = () => {
    this.props.onSetGeneralInfo({...this.state}, this.props.onMoveToNextStep);
  };

  onLogoSelect = () => {
    let file = this.state.uploadedLogo;
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
          this.setState({uploadedLogo: null})
        })
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };


  render() {
    console.log("this.props.countriesList", this.props.countriesList);
    const props = {
      onRemove: () => {
        this.setState({uploadedLogo: null})
      },
      beforeUpload: file => {
        this.setState({uploadedLogo: file});
        return false;
      },
    };
    const {getFieldDecorator} = this.props.form;
    const {name, url, phone, email, address_line_1, address_line_2, city, state, country_id, zip_code, cpp_url} = this.state;
    return (
      <div className="gx-flex-column gx-mt-3" >
        <Form layout="vertical" style={{width: "70%"}}>
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="Company Name">
                {getFieldDecorator('name', {
                  initialValue: name,
                  rules: [{
                    required: true,
                    message: 'Please Enter Company Name!'
                  }],
                })(<Input type="text" onChange={(e) => this.setState({name: e.target.value})}/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Company Website" extra="Please enter website in 'http//www.example.com' format">
                {getFieldDecorator('url', {
                  initialValue: url,
                  rules: [{
                    required: true,
                    message: 'Please Enter Company Website!'
                  }],
                })(<Input type="text" onChange={(e) => this.setState({url: e.target.value})}/>)}
              </Form.Item>
            </Col>
          </div>
          <Form.Item label="Upload Logo">
            {getFieldDecorator('uploadedLogo',
              {
                rules: [{required: true, message: 'Please Upload Company Logo!'}],
              })(
              <Upload {...props}>
                <Input placeholder="Choose file..." addonAfter="Browse"/>
              </Upload>)}
          </Form.Item>
          <Form.Item label="Client URl">
            {getFieldDecorator('cpp_url', {
              initialValue: cpp_url,
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
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Phone Number">
                {getFieldDecorator('phone', {
                  initialValue: phone,
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
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Country Name!'
                    }],
                })(<Select style={{width: "100%"}} onChange={this.onCountrySelect}>
                  {Object.keys(this.props.countriesList).map(country => {
                    return <Option value={country} key={country}>{this.props.countriesList[country]}</Option>
                  })}
                </Select>)}
              </Form.Item>
            </Col>
            <Col sm={8} xs={24} className="gx-pr-0">
              <Form.Item label="State">
                {getFieldDecorator('state', {
                  initialValue: state,
                  rules: [{required: true, message: 'Please Enter State Name!'}],
                })(<Input type="text" onChange={(e) => {
                  this.setState({state: e.target.value})
                }}/>)}
              </Form.Item>
            </Col>
            <Col sm={8} xs={24} className="gx-pl-0">
              <Form.Item label="City">
                {getFieldDecorator('city', {
                  initialValue: city,
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
            <Button type="primary" onClick={this.onValidationCheck}>Next</Button>
            <Button type="link" onClick={() => this.props.onMoveToNextStep()}>Skip</Button>
          </div>
        </Form>
      </div>
    );
  }
}

ThirdStep = Form.create({})(ThirdStep);

const mapStateToProps = ({generalSettings}) => {
  const {countriesList} = generalSettings;
  return {countriesList};
};

export default connect(mapStateToProps, {
  onGetCountriesList, onSetGeneralInfo, fetchSuccess,
  fetchStart,
  fetchError
})(ThirdStep);