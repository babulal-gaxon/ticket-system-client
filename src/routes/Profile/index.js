import React, {Component} from "react"
import {Button, Col, Form, Input, Modal, Radio, Row} from "antd/lib/index";
import PropTypes from "prop-types";
import Widget from "../../components/Widget";
import {connect} from "react-redux";
import {onAddProfileImage, onBulkDeleteStaff, onEditSupportStaff} from "../../appRedux/actions/SupportStaff";
import {onGetDepartments} from "../../appRedux/actions/Departments";
import {Divider, Select} from "antd";
import ImageUpload from "../Staff/AddNewStaff/ImageUpload";
import {onGetRoles} from "../../appRedux/actions/RolesAndPermissions";

const {Option} = Select;
const {confirm} = Modal;

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
      account_status: 1,
      profile_pic: null,
      role_id: null,
      designation: ""
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const authUser = nextProps.authUser;
    console.log("authUser", authUser);
    const {id, first_name, last_name, email, mobile, hourly_rate, account_status, role_id, avatar, designation} = authUser;
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
      account_status: account_status,
      departments_ids: department_ids,
      role_id: role_id,
      profile_pic: avatar ? avatar.id : null,
      designation: designation
    });
  }

  componentDidMount() {
    this.props.onGetDepartments();
    this.props.onGetRoles();
  }

  onReturnStaffScreen = () => {
    this.props.history.goBack();
  };

  onSaveProfile = () => {
    this.props.onEditSupportStaff({...this.state}, this.props.history);
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

  onReset = () => {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      hourly_rate: "",
      department_ids: [],
      account_status: 1,
      role_id: null
    })
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSaveProfile();
      }
    });
  };

  onSelectRole = value => {
    this.setState({role_id: value})
  };

  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this profile ?',
      okText: "Yes, Delete Profile",
      cancelText: "Cancel",
      onOk: () => {
        this.props.onBulkDeleteStaff({ids: this.props.authUser.id}, this.props.history)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {mobile, hourly_rate, account_status, departments_ids, role_id, first_name, last_name, email, designation} = this.state;
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
                <Form.Item label="Role">
                  {getFieldDecorator('role_id', {
                    initialValue: role_id,
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: true,
                      message: 'Please Select role!'
                    }],
                  })(<Select onChange={this.onSelectRole} placeholder="Select a Role">
                    {this.props.roles.map(role => {
                      return <Option value={role.id} key={role.id}>{role.name}</Option>
                    })}
                  </Select>)}
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
                <Form.Item label="Status">
                  <Radio.Group value={account_status} onChange={(e) => {
                    this.setState({account_status: e.target.value})
                  }}>
                    <Radio value={1}>Active</Radio>
                    <Radio value={0}>Disabled</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <ImageUpload onAddProfileImage={this.props.onAddProfileImage}
                           context={this}
                           imageAvatar={this.state.imageAvatar}/>
            </Col>
          </Row>
          <Divider/>
          <div className="gx-d-flex gx-justify-content-between">
            <span>
                <Button type="primary" onClick={this.onValidationCheck} style={{width: 150}}>
                  Save
                </Button>
              {this.props.authUser === null ?
                <Button type="primary" onClick={this.onReset} style={{width: 150}}>
                  Reset
                </Button> : null}
              <Button onClick={this.onReturnStaffScreen} style={{width: 150}}>
                  Cancel
                </Button>
            </span>
            {this.props.authUser !== null ?
              <span>
              <Button type="danger" ghost style={{width: 150}} onClick={this.showDeleteConfirm}>Delete</Button>
            </span> : null}
          </div>
        </Widget>
      </div>
    )
  }
}

Profile = Form.create({})(Profile);

const mapStateToProps = ({departments, auth, rolesAndPermissions}) => {
  const {authUser} = auth;
  const {dept} = departments;
  const {roles} = rolesAndPermissions;
  return {dept, authUser, roles};
};

export default connect(mapStateToProps, {
  onEditSupportStaff,
  onGetDepartments,
  onAddProfileImage,
  onGetRoles,
  onBulkDeleteStaff
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
  onEditSupportStaff: PropTypes.func
};
