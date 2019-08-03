import React, {Component} from "react"
import {Button, Col, Form, Input, Modal, Radio, Row} from "antd/lib/index";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {
  onAddProfileImage,
  onAddSupportStaff,
  onBulkDeleteStaff,
  onEditSupportStaff
} from "../../../appRedux/actions/SupportStaff";
import {onGetDepartments} from "../../../appRedux/actions/Departments";
import {Breadcrumb, Divider, Select} from "antd";
import {Link} from "react-router-dom";
import {onGetRoles} from "../../../appRedux/actions/RolesAndPermissions";
import ImageUpload from "./ImageUpload";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const {Option} = Select;
const {confirm} = Modal;

class AddNewStaff extends Component {
  constructor(props) {
    super(props);
    if (props.currentStaff === null) {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile: "",
        hourly_rate: "",
        departments_ids: [],
        account_status: 1,
        profile_pic: null,
        role_id: null,
        designation: ""
      };
    } else {
      const selectedStaff = props.currentStaff;
      const {id, first_name, last_name, email, mobile, hourly_rate, status, role_id, avatar, designation} = selectedStaff;
      const department_ids = selectedStaff.departments.map(department => {
        return department.id
      });
      this.state = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile: mobile,
        hourly_rate: parseInt(hourly_rate),
        account_status: status,
        departments_ids: department_ids,
        role_id: role_id,
        profile_pic: avatar ? avatar.id : null,
        imageAvatar: avatar,
        password: "",
        designation: designation
      }
    }
  }

  componentDidMount() {
    this.props.onGetDepartments();
    this.props.onGetRoles();
  }

  onReturnStaffScreen = () => {
    this.props.history.goBack();
  };

  onStaffAdd = () => {
    let {profile_pic} = this.state;
    if (this.props.currentStaff === null) {
      this.props.onAddSupportStaff({...this.state, profile_pic}, this.props.history)
    } else {
      this.props.onEditSupportStaff({...this.state}, this.props.history);
    }
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
      password: "",
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
        this.onStaffAdd();
      }
    });
  };

  onSelectRole = value => {
    this.setState({role_id: value})
  };

  showDeleteConfirm = () => {
    const {messages} = this.props.intl;
    confirm({
      title: messages["staff.message.deleteProfile"],
      okText: messages["common.deleteProfile"],
      cancelText: messages["common.cancel"],
      onOk: () => {
        this.props.onBulkDeleteStaff({ids: this.props.currentStaff.id}, this.props.history)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {mobile, hourly_rate, account_status, departments_ids, role_id, first_name, last_name, email, password, designation} = this.state;
    const deptOptions = this.onDepartmentSelectOption();
    const {messages} = this.props.intl;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4
            className="ggx-widget-heading">{this.props.currentStaff === null ? <IntlMessages id="staff.addNew"/> :
            <IntlMessages id="staff.edit"/>}</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/staff/all-members"><IntlMessages id="common.staffs"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/staff/add-new-member"
                    className="gx-text-primary">{this.props.currentStaff === null ?
                <IntlMessages id="staff.addStaff"/> : <IntlMessages id="staff.editStaff"/>}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <hr/>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <Form.Item label={<IntlMessages id="common.firstName"/>}>
                  {getFieldDecorator('first_name', {
                    initialValue: first_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.firstName"]}],
                  })(<Input type="text" autoFocus onChange={(e) => {
                    this.setState({first_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.lastName"/>}>
                  {getFieldDecorator('last_name', {
                    initialValue: last_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: "validation.message.lastName"}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({last_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.emailAddress"/>}>
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
                          message: messages["validation.message.emailFormat"]
                        },
                      ],
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.phoneNo."/>}>
                  {getFieldDecorator('mobile', {
                    initialValue: mobile,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: messages["validation.message.numericalValues"]
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({phone: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.role"/>}>
                  {getFieldDecorator('role_id', {
                    initialValue: role_id,
                    validateTrigger: 'onBlur',
                    rules: [{
                      required: true,
                      message: messages["validation.roles.name"]
                    }],
                  })(<Select onChange={this.onSelectRole} placeholder="Select a Role">
                    {this.props.roles.map(role => {
                      return <Option value={role.id} key={role.id}>{role.name}</Option>
                    })}
                  </Select>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.hourlyRate"/>}>
                  {getFieldDecorator('hourly_rate', {
                    initialValue: hourly_rate,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: messages["validation.message.numericalValues"]
                    }]
                  })(<Input type="text" addonAfter={<div>$</div>} onChange={(e) => {
                    this.setState({hourly_rate: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.designation"/>}>
                  <Input type="text" value={designation} onChange={(e) => {
                    this.setState({designation: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.password"/>}
                           extra={this.props.currentStaff === null ? "" :
                             <IntlMessages id="validation.message.passwordUpdateNote"/>}>
                  {this.props.currentStaff === null ?
                    getFieldDecorator('password', {
                      initialValue: password,
                      validateTrigger: 'onBlur',
                      rules: [{
                        required: true,
                        message: messages["validation.message.inputPassword"]
                      },
                        {
                          min: 8,
                          message: messages["validation.message.passwordLength"],
                        }],
                    })(<Input.Password type="text" onChange={(e) => {
                      this.setState({password: e.target.value})
                    }}/>) :
                    <Input.Password type="text" onChange={(e) => {
                      this.setState({password: e.target.value})
                    }}/>}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.departmentHeading"/>}>
                  <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder={messages["common.department"]}
                    value={departments_ids}
                    onSelect={this.onDepartmentSelect}
                    onDeselect={this.onDepartmentRemove}>
                    {deptOptions}
                  </Select>
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.status"/>}>
                  <Radio.Group value={account_status} onChange={(e) => {
                    this.setState({account_status: e.target.value})
                  }}>
                    <Radio value={1}>{<IntlMessages id="common.active"/>}</Radio>
                    <Radio value={0}>{<IntlMessages id="common.disable"/>}</Radio>
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
                  {<IntlMessages id="common.save"/>}
                </Button>
              {this.props.currentStaff === null ?
                <Button type="primary" onClick={this.onReset} style={{width: 150}}>
                  {<IntlMessages id="common.reset"/>}
                </Button> : null}
              <Button onClick={this.onReturnStaffScreen} style={{width: 150}}>
                  {<IntlMessages id="common.cancel"/>}
                </Button>
            </span>
            {this.props.currentStaff !== null ?
              <span>
              <Button type="danger" ghost style={{width: 150}} onClick={this.showDeleteConfirm}>{<IntlMessages
                id="common.delete"/>}</Button>
            </span> : null}
          </div>
        </Widget>
      </div>
    )
  }
}

AddNewStaff = Form.create({})(AddNewStaff);

const mapStateToProps = ({departments, supportStaff, rolesAndPermissions}) => {
  const {currentStaff} = supportStaff;
  const {dept} = departments;
  const {roles} = rolesAndPermissions;
  return {dept, currentStaff, roles};
};

export default connect(mapStateToProps, {
  onEditSupportStaff,
  onAddSupportStaff,
  onGetDepartments,
  onAddProfileImage,
  onGetRoles,
  onBulkDeleteStaff
})(injectIntl(AddNewStaff));

AddNewStaff.defaultProps = {
  dept: [],
  currentStaff: null,
  roles: []
};

AddNewStaff.propTypes = {
  dept: PropTypes.array,
  currentStaff: PropTypes.number,
  roles: PropTypes.array,
  onAddSupportStaff: PropTypes.func,
  onEditSupportStaff: PropTypes.func
};
