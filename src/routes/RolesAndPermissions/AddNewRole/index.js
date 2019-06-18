import React, {Component} from "react"
import {
  Avatar,
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Form,
  Icon,
  Input,
  message,
  Radio,
  Row
} from "antd";
import Widget from "../../../components/Widget";
import {onAddRole, onEditRole, onGetRoleID} from "../../../appRedux/actions/RolesAndPermissions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";

const Panel = Collapse.Panel;
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};


class AddNewRole extends Component {
  constructor(props) {
    super(props);
    if (!this.props.selectedRole) {
      this.state = {
        name: "",
        status: 1,
        customerPermissions: [],
        contactPermissions: [],
        departmentsPermissions: [],
        labelPermissions: [],
        prioritiesPermissions: [],
        responsesPermissions: [],
        rolesPermissions: [],
        settingsPermissions: [],
        staffsPermissions: [],
        statusPermissions: [],
        ticketsPermissions: [],
        usersPermissions: [],
        permissions: [],
      }
    } else {
      setTimeout(this.onSetFieldsValue, 1000);
      this.state = {
        id: this.props.selectedRole.id,
        name: this.props.selectedRole.name,
        status: this.props.selectedRole.status,
        customerPermissions: [],
        contactPermissions: [],
        departmentsPermissions: [],
        labelPermissions: [],
        prioritiesPermissions: [],
        responsesPermissions: [],
        rolesPermissions: [],
        settingsPermissions: [],
        staffsPermissions: [],
        statusPermissions: [],
        ticketsPermissions: [],
        usersPermissions: [],
        permissions:[],
        filterText: ""
      }
    }
  }
  onSetFieldsValue = () => {
    this.props.form.setFieldsValue({
      name: this.state.name
    });
  };
  onSelectCustomerPermissions = checkedList => {
    this.setState({customerPermissions: checkedList})
  };
  onSelectContactPermissions = checkedList => {
    this.setState({contactPermissions: checkedList})
  };
  onSelectDepartmentPermissions = checkedList => {
    this.setState({departmentsPermissions: checkedList})
  };
  onSelectLabelPermissions = checkedList => {
    this.setState({labelPermissions: checkedList})
  };
  onSelectPriorityPermissions = checkedList => {
    this.setState({prioritiesPermissions: checkedList})
  };
  onSelectResponsesPermissions = checkedList => {
    this.setState({responsesPermissions: checkedList})
  };
  onSelectRolesPermissions = checkedList => {
    this.setState({rolesPermissions: checkedList})
  };
  onSelectSettingsPermissions = checkedList => {
    this.setState({settingsPermissions: checkedList})
  };
  onSelectStaffsPermissions = checkedList => {
    this.setState({staffsPermissions: checkedList})
  };
  onSelectStatusPermissions = checkedList => {
    this.setState({statusPermissions: checkedList})
  };
  onSelectTicketsPermissions = checkedList => {
    this.setState({ticketsPermissions: checkedList})
  };
  onSelectUsersPermissions = checkedList => {
    this.setState({usersPermissions: checkedList})
  };
  onCollectAllPermissions = () => {
    return [...this.state.customerPermissions,
  ...this.state.contactPermissions,
  ...this.state.departmentsPermissions,
  ...this.state.labelPermissions,
  ...this.state.prioritiesPermissions,
  ...this.state.responsesPermissions,
  ...this.state.rolesPermissions,
  ...this.state.settingsPermissions,
  ...this.state.staffsPermissions,
  ...this.state.statusPermissions,
  ...this.state.ticketsPermissions,
  ...this.state.usersPermissions];
  };
  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onAddButtonClick();
      }
    });
  };
  onAddButtonClick = () => {
    if (!this.props.selectedRole) {
      const addData = {
        name: this.state.name,
        status: this.state.status,
        permissions: this.onCollectAllPermissions()
      };
      this.props.onAddRole(addData, this.props.history,this.onAddSuccess);
      this.props.onGetRoleID(0);
    } else {
      const editedData = {
        name: this.state.name,
        status: this.state.status,
        permissions: this.onCollectAllPermissions(),
        id: this.state.id
      };
      console.log("edited data", editedData)
      this.props.onEditRole(editedData, this.props.history, this.onEditSuccess)
    }
  };
  onAddSuccess = () => {
    message.success('New Role has been added successfully.');
  };
  onEditSuccess = () => {
    message.success('The Role has been updated successfully.');
  };
  onStaffListOnEdit = () => {
    let staffWithRole = [];
    if (this.props.selectedRole !== null) {
      staffWithRole = this.props.staffList.filter(staff => staff.designation === this.props.selectedRole.name);
    }
    if(staffWithRole.length !== 0) {
      const filteredStaff = this.onFilterStaffList(staffWithRole);
      return filteredStaff.map(staff => {
        return <Widget styleName="gx-card-filter">
 <span className="gx-email gx-d-inline-block gx-mr-2">
             <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
   {staff.first_name + " " + staff.last_name} </span>
          <span> <i className="icon icon-edit gx-mr-3"/>
          <i className="icon icon-trash"/>
          </span>
        </Widget>
      })
    }
    else {
      return <div className="gx-mt-5">"No member associated yet to this role."</div>
    }
  };
  onFilterStaffList = (staffWithRole) => {
    return staffWithRole.filter(staff => staff.first_name.indexOf(this.state.filterText) !== 1)
  };
  render() {
    console.log("selected Role", this.props.selectedRole, this.state.customerPermissions)
    const {getFieldDecorator} =  this.props.form;
    const {name, status} = this.state;
    return (
      <div className="gx-main-layout-content">
      <Widget styleName="gx-card-filter">
        <h3>{this.props.selectedRole === null ? "Add New Role" : "Edit Role Details"}</h3>
                <Breadcrumb className="gx-mb-4">
                  <Breadcrumb.Item>
                    <Link to="/roles-permissions/all">Roles & Permission</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="gx-text-primary">
                    <Link to="/roles-permissions/add-new">{this.props.roleId === 0 ? "Add New Role" : "Edit Role Details"}</Link>
                  </Breadcrumb.Item>
                </Breadcrumb>
        <Row>
          <Col xl={15} lg={12} md={12} sm={12} xs={24}>
            <Form layout="vertical" style={{width: "80%"}}>
              <Form.Item label="Role Name">
                {getFieldDecorator('name', {
                  rules: [{required: true, message: 'Please Enter Role Name!'}],
                })(<Input type="text" value={name} onChange={(e) => this.setState({name: e.target.value})}/>)}
              </Form.Item>
              <Form.Item label="Status" >
                <Radio.Group value={status} onChange={(e) => {
                  this.setState({status: e.target.value})
                }}>
                  <Radio value={1}>Active</Radio>
                  <Radio value={0}>Disabled</Radio>
                </Radio.Group>
              </Form.Item>
              <h3 className="gx-mt-4">Features and Permissions</h3>
              <hr/>
              <Form.Item>
                <Collapse bordered={false} accordion>
                  <Panel header="Customers" key="1" showArrow={false} extra={<i className="icon icon-add-circle"/>}
                         style={customPanelStyle}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectCustomerPermissions}>
                      <Row>
                        {this.props.userPermissions.companies.map(company => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={company.id}>{company.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Company Contracts" key="2" showArrow={false} style={customPanelStyle}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectContactPermissions}>
                      <Row>
                        {this.props.userPermissions.contacts.map(contact => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={contact.id}>{contact.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Departments" key="3" style={customPanelStyle} showArrow={false}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectDepartmentPermissions}>
                      <Row>
                        {this.props.userPermissions.departments.map(department => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={department.id}>{department.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Labels" key="4" style={customPanelStyle} showArrow={false}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectLabelPermissions}>
                      <Row>
                        {this.props.userPermissions.labels.map(label => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={label.id}>{label.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Priorities" key="5" style={customPanelStyle}
                         extra={<i className="icon icon-add-circle"/>} showArrow={false}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectPriorityPermissions}>
                      <Row>
                        {this.props.userPermissions.priorities.map(priority => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={priority.id}>{priority.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Responses" key="6" style={customPanelStyle} showArrow={false}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectResponsesPermissions}>
                      <Row>
                        {this.props.userPermissions.responses.map(response => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={response.id}>{response.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Roles" key="7" showArrow={false} style={customPanelStyle}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectRolesPermissions}>
                      <Row>
                        {this.props.userPermissions.roles.map(role => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={role.id}>{role.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Settings" key="8" showArrow={false} style={customPanelStyle}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectSettingsPermissions}>
                      <Row>
                        {this.props.userPermissions.settings.map(setting => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={setting.id}>{setting.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Staffs" key="9" showArrow={false} style={customPanelStyle}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectStaffsPermissions}>
                      <Row>
                        {this.props.userPermissions.staffs.map(staff => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={staff.id}>{staff.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Status" key="10" showArrow={false} style={customPanelStyle}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectStatusPermissions}>
                      <Row>
                        {this.props.userPermissions.status.map(stat => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={stat.id}>{stat.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Tickets" key="11" showArrow={false} style={customPanelStyle}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectTicketsPermissions}>
                      <Row>
                        {this.props.userPermissions.tickets.map(ticket => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={ticket.id}>{ticket.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                  <Panel header="Users" key="12" showArrow={false} style={customPanelStyle}
                         extra={<i className="icon icon-add-circle"/>}>
                    <Checkbox.Group style={{width: '100%'}} onChange={this.onSelectUsersPermissions}>
                      <Row>
                        {this.props.userPermissions.users.map(user => {
                          return <Col span={12} className="gx-mb-2">
                            <Checkbox value={user.id}>{user.title}</Checkbox>
                          </Col>
                        })
                        }
                      </Row>
                    </Checkbox.Group>
                  </Panel>
                </Collapse>
              </Form.Item>
              <Divider/>
            </Form>
            <span>
                <Button type="primary" onClick={this.onValidationCheck}>
                  Save
                </Button>
                     <Button onClick = {() => this.props.history.goBack()}>
                  Cancel
                </Button>
                </span>
          </Col>
          {this.props.selectedRole !== null ?
            <Col xl={9} lg={12} md={12} sm={12} xs={24}>
              <h5 className="gx-mb-4">Associated Staff Members</h5>
              <div className="gx-d-flex gx-align-items-center">
                <Input
                  placeholder="Enter keywords to search roles"
                  prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}
                                value={this.state.filterText}
                                onChange={(e) => this.setState({filterText: e.target.value})}/>}/>
              </div>
              <div className="gx-mt-4">Member Name</div>
              {this.onStaffListOnEdit()}
            </Col> : null}
        </Row>
      </Widget>
        <InfoView/>
      </div>
    )
  }
}

AddNewRole = Form.create({})(AddNewRole);

const mapStateToProps = ({auth, rolesAndPermissions, supportStaff}) => {
  const {userPermissions} = auth;
  const {staffList} = supportStaff;
  const {roles, roleId, selectedRole} = rolesAndPermissions;
  return {userPermissions, roles, roleId, staffList, selectedRole}
};

export default connect(mapStateToProps, {onAddRole, onEditRole, onGetRoleID})(AddNewRole);

AddNewRole.defaultProps = {};

AddNewRole.propTypes = {};