import React, {Component} from "react"
import {Breadcrumb, Button, Checkbox, Col, Collapse, Divider, Form, Input, Radio, Row} from "antd";
import Widget from "../../../components/Widget";
import {onAddRole, onDisableSelectedRole, onEditRole} from "../../../appRedux/actions/RolesAndPermissions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";
import {onBulkDeleteStaff, onGetStaff, onGetStaffId} from "../../../appRedux/actions/SupportStaff";
import StaffDetail from "../../Staff/StaffList/StaffDetail";
import StaffWithSelectedRole from "./StaffWithSelectedRole";
import PropTypes from "prop-types";

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
        currentMember: null
      }
    } else {
      const selectedRole = this.props.selectedRole;
      this.state = {
        id: selectedRole.id,
        name: selectedRole.name,
        status: selectedRole.status,
        customerPermissions: selectedRole.role_permissions.companies ?
          selectedRole.role_permissions.companies.map(company => company.id) : [],
        contactPermissions: selectedRole.role_permissions.contacts ?
          selectedRole.role_permissions.contacts.map(contact => contact.id) : [],
        departmentsPermissions: selectedRole.role_permissions.departments ?
          selectedRole.role_permissions.departments.map(department => department.id) : [],
        labelPermissions: selectedRole.role_permissions.labels ?
          selectedRole.role_permissions.labels.map(label => label.id) : [],
        prioritiesPermissions: selectedRole.role_permissions.priorities ?
          selectedRole.role_permissions.priorities.map(priority => priority.id) : [],
        responsesPermissions: selectedRole.role_permissions.responses ?
          selectedRole.role_permissions.responses.map(response => response.id) : [],
        rolesPermissions: selectedRole.role_permissions.roles ?
          selectedRole.role_permissions.roles.map(role => role.id) : [],
        settingsPermissions: selectedRole.role_permissions.settings ?
          selectedRole.role_permissions.settings.map(setting => setting.id) : [],
        staffsPermissions: selectedRole.role_permissions.staffs ?
          selectedRole.role_permissions.staffs.map(staff => staff.id) : [],
        statusPermissions: selectedRole.role_permissions.status ?
          selectedRole.role_permissions.status.map(stat => stat.id) : [],
        ticketsPermissions: selectedRole.role_permissions.tickets ?
          selectedRole.role_permissions.tickets.map(ticket => ticket.id) : [],
        usersPermissions: selectedRole.role_permissions.users ?
          selectedRole.role_permissions.users.map(user => user.id) : [],
        permissions: [],
        filterText: "",
        checkedList: [],
        currentMember: null
      }
    }
  }

  componentWillMount() {
    this.props.onGetStaff();
  }

  onSelectCustomerPermissions = checkedList => {
    this.setState({
      customerPermissions: checkedList
    })
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
    this.setState({
      labelPermissions: checkedList
    })
  };

  onSelectPriorityPermissions = checkedList => {
    this.setState({
      prioritiesPermissions: checkedList
    })
  };

  onSelectResponsesPermissions = checkedList => {
    this.setState({
      responsesPermissions: checkedList
    })
  };

  onSelectRolesPermissions = checkedList => {
    this.setState({
      rolesPermissions: checkedList
    })
  };

  onSelectSettingsPermissions = checkedList => {
    this.setState({
      settingsPermissions: checkedList
    })
  };

  onSelectStaffsPermissions = checkedList => {
    this.setState({
      staffsPermissions: checkedList
    })
  };

  onSelectStatusPermissions = checkedList => {
    this.setState({
      statusPermissions: checkedList
    })
  };

  onSelectTicketsPermissions = checkedList => {
    this.setState({
      ticketsPermissions: checkedList
    })
  };

  onSelectUsersPermissions = checkedList => {
    this.setState({
      usersPermissions: checkedList
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

  onAddButtonClick = () => {
    if (!this.props.selectedRole) {
      const addData = {
        name: this.state.name,
        status: this.state.status,
        permissions: this.onCollectAllPermissions()
      };
      this.props.onAddRole(addData, this.props.history);
    } else {
      const editedData = {
        name: this.state.name,
        status: this.state.status,
        permissions: this.onCollectAllPermissions(),
        id: this.state.id
      };
      this.props.onEditRole(editedData, this.props.history)
    }
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
      labelPermissions: e.target.checked ? allSelected : []
    })
  };

  onCheckAllPriorities = e => {
    const allSelected = this.props.userPermissions.priorities.map(priority => {
      return priority.id
    });
    this.setState({
      prioritiesPermissions: e.target.checked ? allSelected : []
    })
  };

  onCheckAllResponses = e => {
    const allSelected = this.props.userPermissions.responses.map(response => {
      return response.id
    });
    this.setState({
      responsesPermissions: e.target.checked ? allSelected : []
    })
  };

  onCheckAllRoles = e => {
    const allSelected = this.props.userPermissions.roles.map(role => {
      return role.id
    });
    this.setState({
      rolesPermissions: e.target.checked ? allSelected : []
    })
  };

  onCheckAllSettings = e => {
    const allSelected = this.props.userPermissions.settings.map(setting => {
      return setting.id
    });
    this.setState({
      settingsPermissions: e.target.checked ? allSelected : []
    })
  };

  onCheckAllStaffs = e => {
    const allSelected = this.props.userPermissions.staffs.map(staff => {
      return staff.id
    });
    this.setState({
      staffsPermissions: e.target.checked ? allSelected : []
    })
  };

  onCheckAllStatus = e => {
    const allSelected = this.props.userPermissions.status.map(stat => {
      return stat.id
    });
    this.setState({
      statusPermissions: e.target.checked ? allSelected : []
    })
  };

  onCheckAllTickets = e => {
    const allSelected = this.props.userPermissions.tickets.map(ticket => {
      return ticket.id
    });
    this.setState({
      ticketsPermissions: e.target.checked ? allSelected : []
    })
  };

  onCheckAllUsers = e => {
    const allSelected = this.props.userPermissions.users.map(user => {
      return user.id
    });
    this.setState({
      usersPermissions: e.target.checked ? allSelected : []
    })
  };

  onSelectStaff = (staff) => {
    this.setState({currentMember: staff})
  };

  onBackToList = () => {
    this.setState({currentMember: null})
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onAddButtonClick();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {status, currentMember, name} = this.state;

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
          {currentMember === null ? <Row>
            <Col xl={15} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "80%"}}>
                <Form.Item label="Role Name">
                  {getFieldDecorator('name', {
                    initialValue: name,
                    rules: [{required: true, message: 'Please Enter Role Name!'}],
                  })(<Input type="text" onChange={(e) => this.setState({name: e.target.value})}/>)}
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
                        indeterminate={this.state.contactPermissions.length > 0
                        && this.props.userPermissions.contacts.length > this.state.contactPermissions.length}
                        onChange={this.onCheckAllContacts}
                        checked={this.props.userPermissions.contacts.length === this.state.contactPermissions.length}>
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
                        indeterminate={this.state.departmentsPermissions.length > 0
                        && this.props.userPermissions.departments.length > this.state.departmentsPermissions.length}
                        onChange={this.onCheckAllDepartments}
                        checked={this.props.userPermissions.departments.length === this.state.departmentsPermissions.length}>
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
                        indeterminate={this.state.labelPermissions.length > 0
                        && this.props.userPermissions.labels.length > this.state.labelPermissions.length}
                        onChange={this.onCheckAllLabels}
                        checked={this.props.userPermissions.labels.length === this.state.labelPermissions.length}>
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
                        indeterminate={this.state.prioritiesPermissions.length > 0
                        && this.props.userPermissions.priorities.length > this.state.prioritiesPermissions.length}
                        onChange={this.onCheckAllPriorities}
                        checked={this.props.userPermissions.priorities.length === this.state.prioritiesPermissions.length}>
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
                        indeterminate={this.state.responsesPermissions.length > 0
                        && this.props.userPermissions.responses.length > this.state.responsesPermissions.length}
                        onChange={this.onCheckAllResponses}
                        checked={this.props.userPermissions.responses.length === this.state.responsesPermissions.length}>
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
                        indeterminate={this.state.rolesPermissions.length > 0
                        && this.props.userPermissions.roles.length > this.state.rolesPermissions.length}
                        onChange={this.onCheckAllRoles}
                        checked={this.props.userPermissions.roles.length === this.state.rolesPermissions.length}>
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
                        indeterminate={this.state.settingsPermissions.length > 0
                        && this.props.userPermissions.settings.length > this.state.settingsPermissions.length}
                        onChange={this.onCheckAllSettings}
                        checked={this.props.userPermissions.settings.length === this.state.settingsPermissions.length}>
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
                        indeterminate={this.state.staffsPermissions.length > 0
                        && this.props.userPermissions.staffs.length > this.state.staffsPermissions.length}
                        onChange={this.onCheckAllStaffs}
                        checked={this.props.userPermissions.staffs.length === this.state.staffsPermissions.length}>
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
                        indeterminate={this.state.statusPermissions.length > 0
                        && this.props.userPermissions.status.length > this.state.statusPermissions.length}
                        onChange={this.onCheckAllStatus}
                        checked={this.props.userPermissions.status.length === this.state.statusPermissions.length}>
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
                        indeterminate={this.state.ticketsPermissions.length > 0
                        && this.props.userPermissions.tickets.length > this.state.ticketsPermissions.length}
                        onChange={this.onCheckAllTickets}
                        checked={this.props.userPermissions.tickets.length === this.state.ticketsPermissions.length}>
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
                        indeterminate={this.state.usersPermissions.length > 0
                        && this.props.userPermissions.users.length > this.state.usersPermissions.length}
                        onChange={this.onCheckAllUsers}
                        checked={this.props.userPermissions.users.length === this.state.usersPermissions.length}>
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
                <StaffWithSelectedRole staffList={this.props.staffList}
                                       selectedRole={this.props.selectedRole}
                                       onGetStaffId={this.props.onGetStaffId}
                                       onSelectStaff={this.onSelectStaff}
                                       history={this.props.history}/>
              </Col> : null}
          </Row> : <StaffDetail staff={currentMember} onGetStaffId={this.props.onGetStaffId}
                                history={this.props.history} onSelectStaff={this.onSelectStaff}
                                onBackToList={this.onBackToList}/>}
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
  const {selectedRole} = rolesAndPermissions;
  return {userPermissions, staffList, selectedRole}
};

export default connect(mapStateToProps, {
  onAddRole,
  onEditRole,
  onDisableSelectedRole,
  onGetStaff,
  onGetStaffId,
  onBulkDeleteStaff
})(AddNewRole);

AddNewRole.defaultProps = {
  selectedRole: {},
  userPermissions: {},
  staffList: []
};

AddNewRole.propTypes = {
  selectedRole: PropTypes.object,
  userPermissions: PropTypes.object,
  staffList: PropTypes.array
};