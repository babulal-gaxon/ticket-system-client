import React, {Component} from "react"
import {Breadcrumb, Button, Checkbox, Col, Collapse, Divider, Form, Input, Radio, Row} from "antd";
import Widget from "../../../components/Widget";
import {onAddRole, onDisableSelectedRole, onEditRole} from "../../../appRedux/actions/RolesAndPermissions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {onBulkDeleteStaff, onGetStaff, onSetCurrentStaff} from "../../../appRedux/actions/SupportStaff";
import StaffDetail from "../../Staff/StaffList/StaffDetail/index";
import StaffWithSelectedRole from "./StaffWithSelectedRole";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

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
        departmentsPermissions: [],
        labelPermissions: [],
        prioritiesPermissions: [],
        responsesPermissions: [],
        rolesPermissions: [],
        settingsPermissions: [],
        staffsPermissions: [],
        statusPermissions: [],
        ticketsPermissions: [],
        permissions: [],
        currentMember: null
      }
    } else {
      const selectedRole = this.props.selectedRole;
      this.state = {
        id: selectedRole.id,
        name: selectedRole.name,
        status: selectedRole.status,
        customerPermissions: selectedRole.role_permissions.customers ?
          selectedRole.role_permissions.customers.map(customer => customer.id) : [],
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
        permissions: [],
        filterText: "",
        checkedList: [],
        currentMember: null
      }
    }
    if (Permissions.canStaffView()) {
      this.props.onGetStaff();
    }
  }

  onSelectCustomerPermissions = checkedList => {
    this.setState({customerPermissions: checkedList})
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

  onGetTicketDetailsPermissions = checkedList => {
    this.setState({ticketsPermissions: checkedList})
  };

  onCollectAllPermissions = () => {
    return [...this.state.customerPermissions,
      ...this.state.departmentsPermissions,
      ...this.state.labelPermissions,
      ...this.state.prioritiesPermissions,
      ...this.state.responsesPermissions,
      ...this.state.rolesPermissions,
      ...this.state.settingsPermissions,
      ...this.state.staffsPermissions,
      ...this.state.statusPermissions,
      ...this.state.ticketsPermissions];
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
    const allSelected = this.props.userPermissions.customers.map(customer => {
      return customer.id
    });
    this.setState({customerPermissions: e.target.checked ? allSelected : []});
  };

  onCheckAllDepartments = e => {
    const allSelected = this.props.userPermissions.departments.map(department => {
      return department.id
    });
    this.setState({departmentsPermissions: e.target.checked ? allSelected : []});
  };

  onCheckAllLabels = e => {
    const allSelected = this.props.userPermissions.labels.map(label => {
      return label.id
    });
    this.setState({labelPermissions: e.target.checked ? allSelected : []})
  };

  onCheckAllPriorities = e => {
    const allSelected = this.props.userPermissions.priorities.map(priority => {
      return priority.id
    });
    this.setState({prioritiesPermissions: e.target.checked ? allSelected : []})
  };

  onCheckAllResponses = e => {
    const allSelected = this.props.userPermissions.responses.map(response => {
      return response.id
    });
    this.setState({responsesPermissions: e.target.checked ? allSelected : []})
  };

  onCheckAllRoles = e => {
    const allSelected = this.props.userPermissions.roles.map(role => {
      return role.id
    });
    this.setState({rolesPermissions: e.target.checked ? allSelected : []})
  };

  onCheckAllSettings = e => {
    const allSelected = this.props.userPermissions.settings.map(setting => {
      return setting.id
    });
    this.setState({settingsPermissions: e.target.checked ? allSelected : []})
  };

  onCheckAllStaffs = e => {
    const allSelected = this.props.userPermissions.staffs.map(staff => {
      return staff.id
    });
    this.setState({staffsPermissions: e.target.checked ? allSelected : []})
  };

  onCheckAllStatus = e => {
    const allSelected = this.props.userPermissions.status.map(stat => {
      return stat.id
    });
    this.setState({statusPermissions: e.target.checked ? allSelected : []})
  };

  onCheckAllTickets = e => {
    const allSelected = this.props.userPermissions.tickets.map(ticket => {
      return ticket.id
    });
    this.setState({ticketsPermissions: e.target.checked ? allSelected : []})
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
    const {messages} = this.props.intl;
    const {
      status, currentMember, name, customerPermissions, departmentsPermissions,
      labelPermissions, prioritiesPermissions, responsesPermissions, rolesPermissions, settingsPermissions,
      staffsPermissions, statusPermissions, ticketsPermissions
    } = this.state;
    const {selectedRole, onDisableSelectedRole, userPermissions, staffList, onSetCurrentStaff, history} = this.props;


    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4
            className="gx-font-weight-bold">{selectedRole === null ? <IntlMessages id="roles.addNew"/> : <IntlMessages id="roles.editDetail"/>}</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item onClick={onDisableSelectedRole}>
              <Link to="/roles-permissions/all"><IntlMessages id="roles.title"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link
                to="/roles-permissions/add-new"
                className="gx-text-primary">{selectedRole === null ? <IntlMessages id="roles.addNew"/> : <IntlMessages id="roles.editDetail"/>}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          {currentMember === null ? <Row>
            <Col xl={15} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "80%"}}>
                <Form.Item label={<IntlMessages id="roles.name"/>}>
                  {getFieldDecorator('name', {
                    initialValue: name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message:messages["validation.roles.name"]}],
                  })(<Input type="text" autoFocus onChange={(e) => this.setState({name: e.target.value})}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.status"/>}>
                  <Radio.Group value={status} onChange={(e) => {
                    this.setState({status: e.target.value})
                  }}>
                    <Radio value={1}><IntlMessages id="common.active"/></Radio>
                    <Radio value={0}><IntlMessages id="common.disabled"/></Radio>
                  </Radio.Group>
                </Form.Item>
                <h3 className="gx-mt-4"><IntlMessages id="roles.features"/></h3>
                <hr/>
                <Form.Item>
                  <Collapse bordered={false} accordion>
                    <Panel header={<IntlMessages id="sidebar.dashboard.customers"/>} key="1" showArrow={false} extra={<i className="icon icon-add-circle"/>}
                           style={customPanelStyle}>
                      <Checkbox className="gx-ml-auto"
                                indeterminate={customerPermissions.length > 0
                                && userPermissions.customers.length > customerPermissions.length}
                                onChange={this.onCheckAllCustomers}
                                checked={userPermissions.customers && userPermissions.customers.length === customerPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectCustomerPermissions}
                                      value={this.state.customerPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.customers.map(company => {
                            return <Col span={12} key={company.id} className="gx-mb-2">
                              <Checkbox value={company.id}>{company.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="sidebar.dashboard.departments"/>} key="3" style={customPanelStyle} showArrow={false}
                           extra={<i className="icon icon-add-circle"/>}>
                      <Checkbox
                        indeterminate={departmentsPermissions.length > 0
                        && userPermissions.departments.length > departmentsPermissions.length}
                        onChange={this.onCheckAllDepartments}
                        checked={userPermissions.departments.length === departmentsPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectDepartmentPermissions}
                                      value={departmentsPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.departments.map(department => {
                            return <Col span={12} key={department.id} className="gx-mb-2">
                              <Checkbox value={department.id}>{department.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="common.labels"/>} key="4" style={customPanelStyle} showArrow={false}
                           extra={<i className="icon icon-add-circle"/>}>
                      <Checkbox
                        indeterminate={labelPermissions.length > 0
                        && userPermissions.labels.length > labelPermissions.length}
                        onChange={this.onCheckAllLabels}
                        checked={userPermissions.labels.length === labelPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectLabelPermissions}
                                      value={labelPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.labels.map(label => {
                            return <Col span={12} key={label.id} className="gx-mb-2">
                              <Checkbox value={label.id}>{label.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="common.priorities"/>} key="5" style={customPanelStyle}
                           extra={<i className="icon icon-add-circle"/>} showArrow={false}>
                      <Checkbox
                        indeterminate={prioritiesPermissions.length > 0
                        && userPermissions.priorities.length > prioritiesPermissions.length}
                        onChange={this.onCheckAllPriorities}
                        checked={userPermissions.priorities.length === prioritiesPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectPriorityPermissions}
                                      value={prioritiesPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.priorities.map(priority => {
                            return <Col span={12} key={priority.id} className="gx-mb-2">
                              <Checkbox value={priority.id}>{priority.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="common.responses"/>} key="6" style={customPanelStyle} showArrow={false}
                           extra={<i className="icon icon-add-circle"/>}>
                      <Checkbox
                        indeterminate={responsesPermissions.length > 0
                        && userPermissions.responses.length > responsesPermissions.length}
                        onChange={this.onCheckAllResponses}
                        checked={userPermissions.responses.length === responsesPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectResponsesPermissions}
                                      value={responsesPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.responses.map(response => {
                            return <Col span={12} key={response.id} className="gx-mb-2">
                              <Checkbox value={response.id}>{response.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="common.roles"/>} key="7" showArrow={false} style={customPanelStyle}
                           extra={<i className="icon icon-add-circle"/>}>
                      <Checkbox
                        indeterminate={rolesPermissions.length > 0
                        && userPermissions.roles.length > rolesPermissions.length}
                        onChange={this.onCheckAllRoles}
                        checked={userPermissions.roles.length === rolesPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectRolesPermissions}
                                      value={rolesPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.roles.map(role => {
                            return <Col span={12} key={role.id} className="gx-mb-2">
                              <Checkbox value={role.id}>{role.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="sidebar.dashboard.settings"/>} key="8" showArrow={false} style={customPanelStyle}
                           extra={<i className="icon icon-add-circle"/>}>
                      <Checkbox
                        indeterminate={settingsPermissions.length > 0
                        && userPermissions.settings.length > settingsPermissions.length}
                        onChange={this.onCheckAllSettings}
                        checked={userPermissions.settings.length === settingsPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectSettingsPermissions}
                                      value={settingsPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.settings.map(setting => {
                            return <Col span={12} key={setting.id} className="gx-mb-2">
                              <Checkbox value={setting.id}>{setting.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="common.staffs"/>} key="9" showArrow={false} style={customPanelStyle}
                           extra={<i className="icon icon-add-circle"/>}>
                      <Checkbox
                        indeterminate={staffsPermissions.length > 0
                        && userPermissions.staffs.length > staffsPermissions.length}
                        onChange={this.onCheckAllStaffs}
                        checked={userPermissions.staffs.length === staffsPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectStaffsPermissions}
                                      value={staffsPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.staffs.map(staff => {
                            return <Col span={12} key={staff.id} className="gx-mb-2">
                              <Checkbox value={staff.id}>{staff.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="common.status"/>} key="10" showArrow={false} style={customPanelStyle}
                           extra={<i className="icon icon-add-circle"/>}>
                      <Checkbox
                        indeterminate={statusPermissions.length > 0
                        && userPermissions.status.length > statusPermissions.length}
                        onChange={this.onCheckAllStatus}
                        checked={userPermissions.status.length === statusPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onSelectStatusPermissions}
                                      value={statusPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.status.map(stat => {
                            return <Col span={12} key={stat.id} className="gx-mb-2">
                              <Checkbox value={stat.id}>{stat.title}</Checkbox>
                            </Col>
                          })
                          }
                        </Row>
                      </Checkbox.Group>
                    </Panel>
                    <Panel header={<IntlMessages id="common.tickets"/>} key="11" showArrow={false} style={customPanelStyle}
                           extra={<i className="icon icon-add-circle"/>}>
                      <Checkbox
                        indeterminate={ticketsPermissions.length > 0
                        && userPermissions.tickets.length > ticketsPermissions.length}
                        onChange={this.onCheckAllTickets}
                        checked={userPermissions.tickets.length === ticketsPermissions.length}>
                        <IntlMessages id="common.checkAl"/>
                      </Checkbox>
                      <Checkbox.Group style={{width: '100%'}}
                                      onChange={this.onGetTicketDetailsPermissions}
                                      value={ticketsPermissions}>
                        <Row className="gx-d-flex gx-flex-row">
                          {userPermissions.tickets.map(ticket => {
                            return <Col span={12} key={ticket.id} className="gx-mb-2">
                              <Checkbox value={ticket.id}>{ticket.title}</Checkbox>
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
                  <IntlMessages id="common.save"/>
                </Button>
                     <Button onClick={() => history.goBack()}>
                   <IntlMessages id="common.cancel"/>
                </Button>
                </span>
            </Col>
            {selectedRole !== null ?
              <Col xl={9} lg={12} md={12} sm={12} xs={24}>
                <StaffWithSelectedRole staffList={staffList}
                                       selectedRole={selectedRole}
                                       onSetCurrentStaff={onSetCurrentStaff}
                                       onSelectStaff={this.onSelectStaff}
                                       history={history}/>
              </Col> : null}
          </Row> : <StaffDetail staff={currentMember} onSetCurrentStaff={onSetCurrentStaff}
                                history={history} onSelectStaff={this.onSelectStaff}
                                onBackToList={this.onBackToList}/>}
        </Widget>
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
  onSetCurrentStaff,
  onBulkDeleteStaff
})(injectIntl(AddNewRole));

AddNewRole.defaultProps = {
  selectedRole: {},
  userPermissions: {},
  staffList: []
};

AddNewRole.propTypes = {
  selectedRole: PropTypes.object,
  userPermissions: PropTypes.object,
  staffList: PropTypes.array,
  onAddRole: PropTypes.func,
  onEditRole: PropTypes.func,
  onDisableSelectedRole: PropTypes.func,
  onGetStaff: PropTypes.func,
  onSetCurrentStaff: PropTypes.func,
  onBulkDeleteStaff: PropTypes.func
};
