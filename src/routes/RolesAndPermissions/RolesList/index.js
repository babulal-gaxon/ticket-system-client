import React, {Component} from "react";
import {Breadcrumb, Button, Dropdown, Input, Menu, Popconfirm, Select, Table, Tag} from "antd";
import {connect} from "react-redux";


import Widget from "../../../components/Widget/index";
import InfoView from '../../../components/InfoView'
import {
  onAddRole,
  onBulkDeleteRoles,
  onDeleteRole,
  onEditRole,
  onGetRoleID,
  onGetRoles
} from "../../../appRedux/actions/RolesAndPermissions";

const ButtonGroup = Button.Group;
const Option = Select.Option;
const Search = Input.Search;

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
      filterText: "",
      selectedRoles: []
    };
  };

  componentWillMount() {
    this.onGetRolesData(this.state.current, this.state.itemNumbers)
  };
  onGetRolesData = (currentPage, itemsPerPage) => {
    this.props.onGetRoles(currentPage, itemsPerPage);
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
    this.onGetRolesData(1, value)
  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1});
    } else {
      return null;
    }
    this.onGetRolesData(this.state.current + 1, this.state.itemNumbers)
  };
  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1});
    } else {
      return null;
    }
    this.onGetRolesData(this.state.current - 1, this.state.itemNumbers)
  };
  onGetRolesShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange} className="gx-mx-2">
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
          return <span className="gx-text-grey">{record.users_count}</span>
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
        {this.onShowRowDropdown(record)}
      </span>
        },
      },
    ];
  };
  onShowRowDropdown = (record) => {
    const menu = (
      <Menu>
        <Menu.Item key="2" onClick={() => {
          this.props.onGetRoleID(record.id);
          this.props.history.push("/roles-permissions/add-new")
        }}>
          Edit
        </Menu.Item>
        <Menu.Item key="3">
          <Popconfirm
            title="Are you sure Disable this Role?"
            onConfirm={() => this.onDisableRole(record)}
            okText="Yes"
            cancelText="No">
            Disable
          </Popconfirm>
        </Menu.Item>
        <Menu.Item key="3">
          Notes
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure delete this Ticket?"
            onConfirm={() => {this.props.onDeleteRole(record.id)
              this.onGetRolesData(this.state.current, this.state.itemNumbers)}}
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
  onDisableRole = (record) => {
    const updatedRecord = record;
    updatedRecord.status = 0;
    this.props.onGetRoleID(record.id);
    this.props.onEditRole(updatedRecord)
  };
  onSelectOption = () => {
    return <Select defaultValue="Archive" style={{width: 120}}>
      <Option value="Archive">Archive</Option>
      <Option value="Delete" onClick={() => {
        const obj = {
          role_ids: this.state.selectedRoles
        };
        this.props.onBulkDeleteRoles(obj);
        this.onGetRolesData(this.state.current, this.state.itemNumbers)
        this.setState({selectedRowKeys:[]})
      }}>Delete</Option>
    </Select>
  };
  onPageChange = page => {
    this.setState({current: page});
    this.onGetRolesData(page, this.state.itemNumbers)
  };
  render() {
    const roles = this.onFilterData();
    const selectedRowKeys = this.state.selectedRowKeys;
    let ids;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedResponses: ids, selectedRowKeys: selectedRowKeys})
      }};
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4>Roles & Permission</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item className="gx-text-primary">Roles & Permission</Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              <Button type="primary" className="gx-btn-lg"
                      onClick={this.onAddButtonClick}>
                Add New Role
              </Button>
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Search Roles here"
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
                style={{width: 200}}
              />
              {this.onGetRolesShowOptions()}
              <ButtonGroup>
                <Button type="default" onClick={this.onCurrentDecrement}>
                  <i className="icon icon-long-arrow-left"/>
                </Button>
                <Button type="default" onClick={this.onCurrentIncrement}>
                  <i className="icon icon-long-arrow-right"/>
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Table key={Math.random()} rowSelection={rowSelection} columns={this.rolesRowData()}
                 dataSource={roles}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
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
  const {roles, totalItems} = rolesAndPermissions;
  return {roles, totalItems}
};

export default connect(mapStateToProps, {
  onGetRoles,
  onAddRole,
  onDeleteRole,
  onGetRoleID,
  onEditRole,
  onBulkDeleteRoles
})(RolesList);

RolesList.defaultProps = {};

RolesList.propTypes = {};