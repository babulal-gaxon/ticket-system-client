import React, {Component} from "react"
import {Button, Col, Form, Input, Row} from "antd/lib/index";
import PropTypes from "prop-types";
import Widget from "../../components/Widget";
import {connect} from "react-redux";
import {onAddProfileImage} from "../../appRedux/actions/SupportStaff";
import {onGetDepartments} from "../../appRedux/actions/Departments";
import {Divider, Select} from "antd";
import ImageUpload from "../Staff/AddNewStaff/ImageUpload";
import {getUserProfile, updateUserProfile} from "../../appRedux/actions";

const {Option} = Select;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      hourly_rate: "",
      departments_ids: [],
      profile_pic: null,
      designation: ""
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const authUser = nextProps.authUser;
    const {id, first_name, last_name, email, mobile, hourly_rate, avatar, designation} = authUser;
    const department_ids = authUser.departments ? authUser.departments.map(department => {
      return department.id
    }) : [];
    this.setState({
      id: id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      mobile: mobile,
      hourly_rate: hourly_rate ? parseInt(hourly_rate) : "",
      departments_ids: department_ids,
      profile_pic: avatar ? avatar.id : null,
      designation: designation
    });
  }

  componentDidMount() {
    this.props.getUserProfile();
    this.props.onGetDepartments();
  }

  goPreviousScreen = () => {
    this.props.history.goBack();
  };

  onSaveProfile = () => {
    this.props.updateUserProfile({...this.state}, this.props.history);
  };

  updateProfilePic = (profile_pic) => {
    this.setState({profile_pic})
  };

  onDepartmentSelectOption = () => {
    const deptOptions = [];
    this.props.dept.map(department => {
      return deptOptions.push(<Option value={department.id} key={department.id}>{department.name}</Option>);
    });
    return deptOptions;
  };

  onDepartmentSelect = (id) => {
    this.setState({departments_ids: this.state.departments_ids.concat(id)});
  };

  onDepartmentRemove = (value) => {
    const updatedDepartments = this.state.departments_ids.filter(department => department !== value);
    this.setState({departments_ids: updatedDepartments})
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSaveProfile();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {mobile, hourly_rate, departments_ids, first_name, last_name, email, designation} = this.state;
    const deptOptions = this.onDepartmentSelectOption();
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4
            className="ggx-widget-heading"> Edit Profile Details</h4>
          <hr/>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <Form.Item label="First Name">
                  {getFieldDecorator('first_name', {
                    initialValue: first_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: 'Please Enter First Name!'}],
                  })(<Input type="text" autoFocus onChange={(e) => {
                    this.setState({first_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Last Name">
                  {getFieldDecorator('last_name', {
                    initialValue: last_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: 'Please Enter Last Name!'}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({last_name: e.target.value})
                  }}/>)}
                </Form.Item>
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
                <Form.Item label="Phone Number">
                  {getFieldDecorator('mobile', {
                    initialValue: mobile,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: 'Please enter only numerical values',
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({phone: e.target.value})
                  }}/>)}
                </Form.Item>

                <Form.Item label="Hourly Rate">
                  {getFieldDecorator('hourly_rate', {
                    initialValue: hourly_rate,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: 'Please enter only numerical values',
                    }]
                  })(<Input type="text" addonAfter={<div>$</div>} onChange={(e) => {
                    this.setState({hourly_rate: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Designation">
                  <Input type="text" value={designation} onChange={(e) => {
                    this.setState({designation: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Department">
                  <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder="Please select Department"
                    value={departments_ids}
                    onSelect={this.onDepartmentSelect}
                    onDeselect={this.onDepartmentRemove}>
                    {deptOptions}
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <ImageUpload onAddProfileImage={this.props.onAddProfileImage}
                           context={this} imageAvatar={this.state.imageAvatar}/>
            </Col>
          </Row>
          <Divider/>
          <div className="gx-d-flex gx-justify-content-between">
            <span>
                <Button type="primary" onClick={this.onValidationCheck} style={{width: 150}}>
                  Save
                </Button>
                <Button onClick={this.goPreviousScreen} style={{width: 150}}>
                  Cancel
                </Button>
            </span>
          </div>
        </Widget>
      </div>
    )
  }
}

Profile = Form.create({})(Profile);

const mapStateToProps = ({departments, auth}) => {
  const {authUser} = auth;
  const {dept} = departments;
  return {dept, authUser};
};

export default connect(mapStateToProps, {
  updateUserProfile,
  getUserProfile,
  onGetDepartments,
  onAddProfileImage,
})(Profile);

Profile.defaultProps = {
  dept: [],
  authUser: null,
  roles: []
};

Profile.propTypes = {
  dept: PropTypes.array,
  authUser: PropTypes.object,
  roles: PropTypes.array,
  updateUserProfile: PropTypes.func
};
