import React, {Component} from "react"
import {Button, Col, Form, Input, message, Radio, Row} from "antd/lib/index";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {onAddProfileImage, onAddSupportStaff, onEditSupportStaff} from "../../../appRedux/actions/SupportStaff";
import {onGetDepartments} from "../../../appRedux/actions/Departments";
import {Breadcrumb, Select} from "antd";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";
import {onGetRoles} from "../../../appRedux/actions/RolesAndPermissions";

const {Option} = Select;

class AddNewStaff extends Component {
  constructor(props) {
    super(props);
    if (this.props.staffId === 0) {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile: "",
        hourly_rate: "",
        departments_ids: [],
        account_status: 1,
        profile_pic:"",
        role_id: null
      };
    } else {
      setTimeout(this.onSetFieldsValue, 10);
      const selectedStaff = this.props.staffList.find(staff => staff.id === this.props.staffId);
      const {id, first_name, last_name, email, password, mobile, hourly_rate, account_status,role_id} = selectedStaff;
      const department_ids = selectedStaff.departments.map(department => {
        return department.pivot.department_id
      });
      this.state = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        mobile: mobile,
        hourly_rate: hourly_rate,
        account_status: account_status,
        departments_ids: department_ids,
        role_id: role_id
      }
    }
  }

  componentWillMount() {
    this.props.onGetDepartments();
    this.props.onGetRoles();
  }

  onSetFieldsValue = () => {
    this.props.form.setFieldsValue({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    });
  };
  onSetFieldsToReset = () => {
    this.props.form.setFieldsValue({
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    });
  };
  onReturnStaffScreen = () => {
    this.props.history.goBack();
  };
  onStaffAdd = () => {
    if (this.props.staffId === 0) {
      this.setState({profile_pic:this.props.profilePicId},
        () => {this.props.onAddSupportStaff({...this.state}, this.props.history, this.onAddSuccess)})


    } else {
      this.props.onEditSupportStaff({...this.state}, this.props.history, this.onEditSuccess);
    }
  };
  onAddSuccess = () => {
    message.success('New Staff has been added successfully.');
  };
  onEditSuccess = () => {
    message.success('The Staff details has been updated successfully.');
  };
  onDepartmentSelectOption = () => {
    const deptOptions = [];
    this.props.dept.map(department => {
      return deptOptions.push(<Option value={department.id}>{department.name}</Option>);
    });
    return deptOptions;
  };
  onDepartmentSelect = (id) => {
    console.log(this.state.departments_ids)
    this.setState({departments_ids: this.state.departments_ids.concat(id)});
    console.log("after id", this.state.departments_ids)
  };
  onDepartmentRemove = (value) => {
    const updatedDepartments = this.state.departments_ids.filter(department => department !== value)
    this.setState({departments_ids: updatedDepartments})
  };
  onReset = () => {
    this.setState({
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

  render() {
    const {getFieldDecorator} = this.props.form;
    const {mobile, hourly_rate, account_status, departments_ids, role_id} = this.state;
    const deptOptions = this.onDepartmentSelectOption();
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>{this.props.staffId === 0 ? "Add Staff Member" : "Edit Staff Details"}</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/staff/all-members">Staffs</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/staff/add-new-member">{this.props.staffId === 0 ? "Add Staff" : "Edit Staff"}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <hr/>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <Form.Item label="First Name">
                  {getFieldDecorator('first_name', {
                    rules: [{required: true, message: 'Please Enter First Name!'}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({first_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Last Name">
                  {getFieldDecorator('last_name', {
                    rules: [{required: true, message: 'Please Enter Last Name!'}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({last_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Email Address">
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
                <Form.Item label="Phone Number">
                  <Input type="text" value={mobile} onChange={(e) => {
                    this.setState({mobile: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Hourly Rate">
                  <Input type="text" addonAfter={<div>$</div>} value={hourly_rate} onChange={(e) => {
                    this.setState({hourly_rate: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Password">
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please Enter Password!'}],
                  })(<Input.Password type="text" onChange={(e) => {
                    this.setState({password: e.target.value})
                  }}/>)}
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
                <Form.Item label="Role">
                  <Select value={role_id} onChange={this.onSelectRole}>
                    {this.props.roles.map(role => {
                     return <Option value={role.id}>{role.name}</Option>
                    })}
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
                <Form.Item>
                <span>
                <Button type="primary" onClick={this.onValidationCheck}>
                  Save
                </Button>
                     <Button type="primary" onClick={() => {
                       this.onSetFieldsToReset();
                       this.onReset();
                     }}>
                  Reset
                </Button>
                     <Button onClick={this.onReturnStaffScreen}>
                  Cancel
                </Button>
                </span>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              {/*<ImageUpload onAddProfileImage={this.props.onAddProfileImage}/>*/}
            </Col>
          </Row>
        </Widget>
        <InfoView/>
      </div>
    )
  }
}

AddNewStaff = Form.create({})(AddNewStaff);

const mapStateToProps = ({departments, supportStaff,rolesAndPermissions}) => {
  const {staffId, staffList, profilePicId} = supportStaff;
  const {dept} = departments;
  const {roles} = rolesAndPermissions;
  return {dept, staffId, staffList, profilePicId, roles};
};

export default connect(mapStateToProps, {
  onEditSupportStaff,
  onAddSupportStaff,
  onGetDepartments,
  onAddProfileImage,
  onGetRoles
})(AddNewStaff);

AddNewStaff.defaultProps = {
  staffList: []
};

AddNewStaff.propTypes = {
  staffList: PropTypes.array,
  onAddSupportStaff: PropTypes.func,
  onEditSupportStaff: PropTypes.func
};