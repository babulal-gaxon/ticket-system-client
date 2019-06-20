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
import {onAddRole, onDisableSelectedRole, onEditRole} from "../../../appRedux/actions/RolesAndPermissions";
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
        permissions: []
      }
    } else {
      setTimeout(this.onSetFieldsValue, 10);
      this.state = {
        id: this.props.selectedRole.id,
        name: this.props.selectedRole.name,
        status: this.props.selectedRole.status,
        customerPermissions: this.props.selectedRole.role_permissions.companies ?
          this.props.selectedRole.role_permissions.companies.map(company => company.id) : [],
        contactPermissions: this.props.selectedRole.role_permissions.contacts ?
          this.props.selectedRole.role_permissions.contacts.map(contact => contact.id) : [],
        departmentsPermissions: this.props.selectedRole.role_permissions.departments ?
          this.props.selectedRole.role_permissions.departments.map(department => department.id) : [],
        labelPermissions: this.props.selectedRole.role_permissions.labels ?
          this.props.selectedRole.role_permissions.labels.map(label => label.id) : [],
        prioritiesPermissions: this.props.selectedRole.role_permissions.priorities ?
          this.props.selectedRole.role_permissions.priorities.map(priority => priority.id) : [],
        responsesPermissions: this.props.selectedRole.role_permissions.responses ?
          this.props.selectedRole.role_permissions.responses.map(response => response.id) : [],
        rolesPermissions: this.props.selectedRole.role_permissions.roles ?
          this.props.selectedRole.role_permissions.roles.map(role => role.id) : [],
        settingsPermissions: this.props.selectedRole.role_permissions.settings ?
          this.props.selectedRole.role_permissions.settings.map(setting => setting.id) : [],
        staffsPermissions: this.props.selectedRole.role_permissions.staffs ?
          this.props.selectedRole.role_permissions.staffs.map(staff => staff.id) : [],
        statusPermissions: this.props.selectedRole.role_permissions.status ?
          this.props.selectedRole.role_permissions.status.map(stat => stat.id) : [],
        ticketsPermissions: this.props.selectedRole.role_permissions.tickets ?
          this.props.selectedRole.role_permissions.tickets.map(ticket => ticket.id) : [],
        usersPermissions: this.props.selectedRole.role_permissions.users ?
          this.props.selectedRole.role_permissions.users.map(user => user.id) : [],
        permissions: [],
        filterText: "",
        checkedList: []
      }
    }
  }

  onSetFieldsValue = () => {
    this.props.form.setFieldsValue({
      name: this.state.name
    });
  };
  onSelectCustomerPermissions = checkedList => {
    this.setState({
      customerPermissions: checkedList})
  };
  onSelectContactPermissions = checkedList => {
    this.setState({
      contactPermissions: checkedList
    })
  };
  onSelectDepartmentPermissions = checkedList => {
    this.setState({
      departmentsPermissions: checkedList
    })
  };
  onSelectLabelPermissions = checkedList => {
    const allSelected = this.props.userPermissions.labels.map(label => {
      return label.id
    });
    this.setState({
      labelPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
  };
  onSelectPriorityPermissions = checkedList => {
    const allSelected = this.props.userPermissions.priorities.map(priority => {
      return priority.id
    });
    this.setState({
      prioritiesPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
  };
  onSelectResponsesPermissions = checkedList => {
    const allSelected = this.props.userPermissions.responses.map(response => {
      return response.id
    });
    this.setState({
      responsesPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
  };
  onSelectRolesPermissions = checkedList => {
    const allSelected = this.props.userPermissions.roles.map(role => {
      return role.id
    });
    this.setState({
      rolesPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
  };
  onSelectSettingsPermissions = checkedList => {
    const allSelected = this.props.userPermissions.settings.map(setting => {
      return setting.id
    });
    this.setState({
      settingsPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
  };
  onSelectStaffsPermissions = checkedList => {
    const allSelected = this.props.userPermissions.staffs.map(staff => {
      return staff.id
    });
    this.setState({
      staffsPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
  };
  onSelectStatusPermissions = checkedList => {
    const allSelected = this.props.userPermissions.status.map(stat => {
      return stat.id
    });
    this.setState({
      statusPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
  };
  onSelectTicketsPermissions = checkedList => {
    const allSelected = this.props.userPermissions.tickets.map(ticket => {
      return ticket.id
    });
    this.setState({
      ticketsPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
  };
  onSelectUsersPermissions = checkedList => {
    const allSelected = this.props.userPermissions.users.map(user => {
      return user.id
    });
    this.setState({
      usersPermissions: checkedList,
      indeterminate: !!checkedList.length && checkedList.length < allSelected.length,
      checkAll: checkedList.length === allSelected.length
    })
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
      this.props.onAddRole(addData, this.props.history, this.onAddSuccess);
    } else {
      const editedData = {
        name: this.state.name,
        status: this.state.status,
        permissions: this.onCollectAllPermissions(),
        id: this.state.id
      };
      console.log("edited data", editedData);
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
    if (staffWithRole.length !== 0) {
      const filteredStaff = this.onFilterStaffList(staffWithRole);
      return (
        <div>
          <div className="gx-mt-4">Member Name</div>
          {filteredStaff.map(staff => {
            return <Widget styleName="gx-card-filter">
        <span className="gx-email gx-d-inline-block gx-mr-2">
             <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
          {staff.first_name + " " + staff.last_name} </span>
              <span> <i className="icon icon-edit gx-mr-3"/>
          <i className="icon icon-trash"/>
          </span>
            </Widget>
          })};
        </div>
      )
    } else {
      return <div className="gx-mt-5">"No member associated yet to this role."</div>
    }
  };
  onFilterStaffList = (staffWithRole) => {
    return staffWithRole.filter(staff => staff.first_name.indexOf(this.state.filterText) !== 1)
  };
  onCheckAllCustomers = e => {
    const allSelected = this.props.userPermissions.companies.map(company => {
      return company.id
    });
    this.setState({
      customerPermissions: e.target.checked ? allSelected : []
    });
  };
  onCheckAllContacts = e => {
    const allSelected = this.props.userPermissions.contacts.map(company => {
      return company.id
    });
    this.setState({
      contactPermissions: e.target.checked ? allSelected : []
    });
  };
  onCheckAllDepartments = e => {
    const allSelected = this.props.userPermissions.departments.map(department => {
      return department.id
    });
    this.setState({
      departmentsPermissions: e.target.checked ? allSelected : []
    });
  };
  onCheckAllLabels = e => {
    const allSelected = this.props.userPermissions.labels.map(label => {
      return label.id
    });
    this.setState({
      labelPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };
  onCheckAllPriorities = e => {
    const allSelected = this.props.userPermissions.priorities.map(priority => {
      return priority.id
    });
    this.setState({
      prioritiesPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };
  onCheckAllResponses = e => {
    const allSelected = this.props.userPermissions.responses.map(response => {
      return response.id
    });
    this.setState({
      responsesPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };
  onCheckAllRoles = e => {
    const allSelected = this.props.userPermissions.roles.map(role => {
      return role.id
    });
    this.setState({
      rolesPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };
  onCheckAllSettings = e => {
    const allSelected = this.props.userPermissions.settings.map(setting => {
      return setting.id
    });
    this.setState({
      settingsPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };
  onCheckAllStaffs = e => {
    const allSelected = this.props.userPermissions.staffs.map(staff => {
      return staff.id
    });
    this.setState({
      staffsPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };
  onCheckAllStatus = e => {
    const allSelected = this.props.userPermissions.status.map(stat => {
      return stat.id
    });
    this.setState({
      statusPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };
  onCheckAllTickets = e => {
    const allSelected = this.props.userPermissions.tickets.map(ticket => {
      return ticket.id
    });
    this.setState({
      ticketsPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };
  onCheckAllUsers = e => {
    const allSelected = this.props.userPermissions.users.map(user => {
      return user.id
    });
    this.setState({
      usersPermissions: e.target.checked ? allSelected : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };

  render() {
    console.log("selected Role", this.props.selectedRole)
    const {getFieldDecorator} = this.props.form;
    const {name, status} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>{this.props.selectedRole === null ? "Add New Role" : "Edit Role Details"}</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item onClick={this.props.onDisableSelectedRole}>
              <Link to="/roles-permissions/all">Roles & Permission</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link
                to="/roles-permissions/add-new">{this.props.selectedRole === null ? "Add New Role" : "Edit Role Details"}</Link>
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
                <Form.Item label="Status">
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
                      <Checkbox className="gx-ml-auto"
                                indeterminate={this.state.customerPermissions.length > 0
                                && this.props.userPermissions.companies.length > this.state.customerPermissions.length}
                                onChange={this.onCheckAllCustomers}
                                checked={this.props.userPermissions.companies.length === this.state.customerPermissions.length}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectCustomerPermissions}
                                      value={this.state.customerPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllContacts}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectContactPermissions}
                                      value={this.state.contactPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllDepartments}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectDepartmentPermissions}
                                      value={this.state.departmentsPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllLabels}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectLabelPermissions}
                                      value={this.state.labelPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllPriorities}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectPriorityPermissions}
                                      value={this.state.prioritiesPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllResponses}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectResponsesPermissions}
                                      value={this.state.responsesPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllRoles}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectRolesPermissions}
                                      value={this.state.rolesPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllSettings}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectSettingsPermissions}
                                      value={this.state.settingsPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllStaffs}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectStaffsPermissions}
                                      value={this.state.staffsPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllStatus}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectStatusPermissions}
                                      value={this.state.statusPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllTickets}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectTicketsPermissions}
                                      value={this.state.ticketsPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllUsers}
                        checked={this.state.checkAll}>
                        Check all
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectUsersPermissions}
                                      value={this.state.usersPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
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
                     <Button onClick={() => this.props.history.goBack()}>
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

export default connect(mapStateToProps, {onAddRole, onEditRole, onDisableSelectedRole})(AddNewRole);

AddNewRole.defaultProps = {};

AddNewRole.propTypes = {};