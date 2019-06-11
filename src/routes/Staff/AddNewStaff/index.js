import React, {Component} from "react"
import {Button, Col, Form, Input, Radio, Row} from "antd/lib/index";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {onAddSupportStaff, onEditSupportStaff} from "../../../appRedux/actions/SupportStaff";
import {onGetDepartments} from "../../../appRedux/actions/Departments";
import {Select} from "antd";

const { Option } = Select;

class AddNewStaff extends Component {
  constructor(props) {
    super(props);
    if(this.props.staffId === 0){
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile: "",
        hourly_rate: "",
        departments_ids: [],
        account_status: 1
      };
    }
    else {
    const selectedStaff = this.props.staffList.find(staff => staff.id === this.props.staffId);
      const {id, first_name, last_name, email, password, mobile, hourly_rate, account_status} = selectedStaff;
    const department_ids = selectedStaff.departments.map(department =>{
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
      departments_ids: department_ids
    }
    }
  }
  componentWillMount() {
    this.props.onGetDepartments();
  }
  onReturnStaffScreen = () => {
    this.props.history.push('/staff/all-members');
  };
  onStaffAdd = () => {
    if(this.props.staffId === 0) {
      this.props.onAddSupportStaff({...this.state});
      this.props.history.push('/staff/all-members');
  }
    else {
    this.props.onEditSupportStaff({...this.state});
    this.props.history.push('/staff/all-members');
    }
  };
  onDepartmentSelectOption = () => {
    const deptOptions = [];
    this.props.dept.map(department => {
      deptOptions.push(<Option value={department.id}>{department.name}</Option>);
      });
    return deptOptions;
    };

  onDepartmentSelect = (id) => {
    this.setState({departments_ids: this.state.departments_ids.concat(id)})
  };
  onDepartmentRemove = (value ) => {
    const updatedDepartments =  this.state.departments_ids.filter(department => department.id !== value )
    this.setState({departments_ids: updatedDepartments})
  };

  onReset = () => {
    this.setState({first_name: "",
      last_name: "",
      email: "",
      password: "",
      mobile: "",
      hourly_rate: "",
      department_ids: [],
      account_status: 1})
  };
  render() {
    const {first_name, last_name, email, password, mobile, hourly_rate, account_status,departments_ids} = this.state;
    const deptOptions = this.onDepartmentSelectOption();
    console.log("this.state",this.state)

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter"
                title={
                  <i className="icon icon-arrow-left" onClick={this.onReturnStaffScreen}/>
                }>
          <hr/>
          <div className="gx-mb-4"><h3>Add Staff Member</h3></div>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
          <Form layout="vertical" style={{ width: "60%"}}>
            <Form.Item label="First Name">
              <Input type="text" value={first_name} onChange={(e) => {
                this.setState({first_name: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Last Name">
              <Input type="text" value={last_name} onChange={(e) => {
                this.setState({last_name: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Email Address">
              <Input type="text" value={email} onChange={(e) => {
                this.setState({email: e.target.value})
              }}/>
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
              <Input.Password type="text" value={password} onChange={(e) => {
                this.setState({password: e.target.value})
              }}/>
            </Form.Item>
            <Form.Item label="Department">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
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
              <Form.Item>
                <span>
                <Button type="primary" onClick={this.onStaffAdd}>
                  Save
                </Button>
                     <Button type="primary" onClick={this.onReset}>
                  Reset
                </Button>
                     <Button onClick={this.onReturnStaffScreen}>
                  Cancel
                </Button>
                </span>
              </Form.Item>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <div>data will come soon</div>
            </Col>
          </Row>
        </Widget>
      </div>
    )
  }
}


const mapStateToProps = ({ departments, supportStaff}) => {
  const {staffId, staffList} = supportStaff;
  const {dept} = departments;
  return {dept, staffId, staffList};
};

export default connect(mapStateToProps, {
  onEditSupportStaff,
  onAddSupportStaff,
  onGetDepartments
})(AddNewStaff);

AddNewStaff.defaultProps = {
  staffList: []
};

AddNewStaff.propTypes = {
  staffList: PropTypes.array,
  onAddSupportStaff: PropTypes.func,
  onEditSupportStaff: PropTypes.func
};