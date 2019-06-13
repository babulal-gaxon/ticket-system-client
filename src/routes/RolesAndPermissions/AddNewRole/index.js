import React, {Component} from "react"
import {Button, Checkbox, Col, Collapse, Divider, Form, Input, Radio, Row, Select, Switch} from "antd";
import Widget from "../../../components/Widget";
import {onAddRole, onEditRole} from "../../../appRedux/actions/RolesAndPermissions";
import {connect} from "react-redux";

const {Option} = Select;
const Panel = Collapse.Panel;
const CheckboxGroup = Checkbox.Group;


class AddNewRole extends Component {
  constructor(props) {
    super(props);
    if (this.props.roleId === 0) {
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
      const selectedRole = this.props.roles.find(role => role.id === this.props.roleId);
      const {name, status, permissions} = selectedRole;
      this.state = {
        name: name,
        status: status,
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
        permissions: permissions
      }
    }
  }
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

  onCollectAllPermissions = () =>{
    this.setState({permissions: this.state.permissions.concat(...this.state.customerPermissions,
        this.state.contactPermissions,
        this.state.departmentsPermissions,
        this.state.labelPermissions,
        this.state.prioritiesPermissions,
        this.state.responsesPermissions,
        this.state.rolesPermissions,
        this.state.settingsPermissions,
        this.state.staffsPermissions,
        this.state.statusPermissions,
        this.state.ticketsPermissions,
        this.state.usersPermissions)})
  };

  onAddButtonClick = () => {
      this.onCollectAllPermissions();
      if(this.props.roleId === 0) {
      const addData = {
        name: this.state.name,
        status:this.state.status,
        permissions: this.state.permissions
      };
      this.props.onAddRole(addData);
      this.props.history.push("/roles-permissions/all");
    }
    else {
      const EditedData = {
        name: this.state.name,
        status: this.state.status,
        permissions: this.state.permissions
      };
        this.props.onEditRole(EditedData)
        this.props.history.push('/staff/all-members');
      }
    };


    render() {
    console.log("in add role", this.props.userPermissions)
    console.log("in role aksl", this.state.permissions)
    console.log("inddhdfds", this.state.customerPermissions)
    const {name, status} = this.state;
    return (
      <Widget styleName="gx-card-filter"
              title={<i className="icon icon-arrow-left"/>}>
        <Form layout="vertical" style={{width: "60%"}}>
          <Form.Item label="Role Name">
            <Input type="text" value={name} onChange={(e) => this.setState({name: e.target.value})}/>
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
          <div className="gx-mr-2">
            <span>All permissions for all features</span>
            <span className="gx-ml-5"><Switch defaultChecked/></span>
          </div>
          <hr/>
          <Form.Item label="General">
            <Collapse accordion className="gx-mb-3">
              <Panel header="Customers" key="1" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Company Contracts" key="2" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Departments" key="3" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Labels" key="4" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Priorities" key="5" extra={<i className="icon icon-add-circle"/>} showArrow={false}>
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
              <Panel header="Responses" key="6" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Roles" key="7" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Settings" key="8" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Staffs" key="9" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Status" key="10" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Tickets" key="11" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
              <Panel header="Users" key="12" showArrow={false} extra={<i className="icon icon-add-circle"/>}>
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
          <Form.Item>
                <span>
                <Button type="primary" onClick ={this.onAddButtonClick}>
                  Save
                </Button>
                     <Button>
                  Cancel
                </Button>
                </span>
          </Form.Item>
          <Divider/>
        </Form>
      </Widget>
    )
  }
}

const mapStateToProps = ({auth, rolesAndPermissions}) => {
  const {userPermissions} = auth;
  const {roles, roleId} = rolesAndPermissions
  return {userPermissions, roles, roleId}
};

export default connect(mapStateToProps,{onAddRole, onEditRole})(AddNewRole);

AddNewRole.defaultProps = {};

AddNewRole.propTypes = {};