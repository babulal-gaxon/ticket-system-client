import React, {Component} from "react";
import {Button, Dropdown, Icon, Input, Menu, Popconfirm, Select, Table, Tag} from "antd";
import {connect} from "react-redux";


import Widget from "../../../components/Widget/index";
import InfoView from '../../../components/InfoView'
import {onAddRole, onDeleteRole, onGetRoleID, onGetRoles} from "../../../appRedux/actions/RolesAndPermissions";

const ButtonGroup = Button.Group;
const Option = Select.Option;

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
      filterText: ""
    };
  };

  componentWillMount() {
    this.props.onGetRoles();
  };

  onFilterData = () => {
    return this.props.roles.filter(role => role.name.indexOf(this.state.filterText) !== -1);
  };
  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value})
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onDropdownChange = (value) => {
    this.setState({itemNumbers: value});
  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.roles.length / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1});
    } else {
      return null;
    }
  };
  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1});
    } else {
      return null;
    }
  };
  onGetRolesShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };
  onAddButtonClick = () => {
    this.props.history.push("/roles-permissions/add-new")
  };
  rolesRowData = () => {
    return [
      {
        title: 'Role Name',
        dataIndex: 'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.name}</span>
        },
      },
      {
        title: 'Last Update',
        dataIndex: 'lastUpdate',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.updated_at}</span>
        },
      },
      {
        title: 'Users',
        dataIndex: 'users',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.users}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (text, record) => {
          return <Tag color={record.status === 1 ? "green" : "red"}>
            {record.status === 1 ? "Active" : "Disabled"}
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        render: (text, record) => {
          return <span onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
        {this.onShowRowDropdown(record.id)}
      </span>
        },
      },
    ];
  };

  onShowRowDropdown = (roleId) => {
    const menu = (
      <Menu>
        <Menu.Item key="2" onClick={() => {
          this.props.onGetRoleID(roleId);
          this.props.history.push("/roles-permissions/add-new")
        }}>
          Edit
        </Menu.Item>
        <Menu.Item key="3">
          Disable
        </Menu.Item>
        <Menu.Item key="3">
          Notes
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure delete this Ticket?"
            onConfirm={() => this.props.onDeleteRole(roleId)}
            okText="Yes"
            cancelText="No">
            Delete
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h"/>
      </Dropdown>
    )
  };

  render() {
    const roles = this.onFilterData();
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter"
                title={<span>
                  <Button type="primary" className="gx-btn-lg"
                          onClick={this.onAddButtonClick}>
                    New Role
                  </Button>
                </span>}
                extra={
                  <div className="gx-d-flex gx-align-items-center">
                    <Input
                      placeholder="Enter keywords to search roles"
                      prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      value={this.state.filterText}
                      onChange={this.onFilterTextChange}/>
                    <div className="gx-ml-3">
                      {this.onGetRolesShowOptions()}
                    </div>
                    <div className="gx-ml-3">
                      <ButtonGroup className="gx-btn-group-flex">
                        <Button className="gx-mb-0" type="default" onClick={this.onCurrentDecrement}>
                          <i className="icon icon-long-arrow-left"/>
                        </Button>
                        <Button className="gx-mb-0" type="default" onClick={this.onCurrentIncrement}>
                          <i className="icon icon-long-arrow-right"/>
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>}>
          <Table key={Math.random()} rowSelection={rowSelection} columns={this.rolesRowData()}
                 dataSource={roles}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.roles.length,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive"/>
          <div className="gx-d-flex gx-flex-row">
          </div>
          <div>
          </div>
        </Widget>
        <InfoView/>
      </div>

    );
  }
}

const mapStateToProps = ({rolesAndPermissions}) => {
  const {roles} = rolesAndPermissions;
  return {roles}
};

export default connect(mapStateToProps, {onGetRoles, onAddRole, onDeleteRole, onGetRoleID})(RolesList);

RolesList.defaultProps = {};

RolesList.propTypes = {};