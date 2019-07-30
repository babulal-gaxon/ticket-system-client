import React, {Component} from "react";
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd";
import {connect} from "react-redux";

import Widget from "../../../components/Widget/index";
import {
  onBulkDeleteRoles,
  onDisableSelectedRole,
  onGetRoleDetail,
  onGetRoles
} from "../../../appRedux/actions/RolesAndPermissions";
import moment from "moment";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;

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

  componentDidMount() {
    this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText);
  }

  onGetRolesData = (currentPage, itemsPerPage, filterText) => {
    if (Permissions.canRoleView()) {
      this.props.onGetRoles(currentPage, itemsPerPage, filterText);
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetRolesData(1, this.state.itemNumbers, this.state.filterText);
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText)
    });
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1},
        () => {
          this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText)
        });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText)
      });
    } else {
      return null;
    }
  };

  onGetRolesShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange} className="gx-mx-2">
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onAddButtonClick = () => {
    this.props.onDisableSelectedRole();
    this.props.history.push("/roles-permissions/add-new")
  };

  rolesRowData = () => {
    return [
      {
        title: 'Role Name',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.name}</span>
        },
      },
      {
        title: 'Last Update',
        dataIndex: 'lastUpdate',
        key: 'lastUpdate',
        render: (text, record) => {
          return <span className="gx-text-grey">{moment(record.updated_at.date).format('LL')}</span>
        },
      },
      {
        title: 'Users',
        dataIndex: 'users',
        key: 'users',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.users_count}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return <Tag color={record.status === 1 ? "green" : "red"}>
            {record.status === 1 ? "Active" : "Disabled"}
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <div> {!record.is_locked ?
            <span>{Permissions.canRoleEdit() ? <i className="icon icon-edit gx-mr-3" onClick={() => {
              this.props.onGetRoleDetail(record.id, this.props.history);
            }}/> : null}
              {Permissions.canRoleDelete() ? this.onDeletePopUp(record.id) : null}
          </span> : null}
          </div>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Role?"
      onConfirm={() => {
        this.props.onBulkDeleteRoles({ids: [recordId]});
        this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText)
      }}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  showBulkDeleteConfirm = () => {
    if (this.state.selectedRoles.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Role(s)?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedRoles
          };
          this.props.onBulkDeleteRoles(obj);
          this.onGetRolesData(this.state.current, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedRoles: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Roles first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canRoleDelete() ?
          <Menu.Item key="1" onClick={this.showBulkDeleteConfirm}>
            Archive
          </Menu.Item> : null}
        {Permissions.canRoleDelete() ?
          <Menu.Item key="2" onClick={this.showBulkDeleteConfirm}>
            Delete
          </Menu.Item> : null}
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText)
    });
  };

  render() {
    const {current, totalItems, itemNumbers} = this.state;
    const roles = this.props.roles;
    const selectedRowKeys = this.state.selectedRowKeys;
    let ids;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedRoles: ids, selectedRowKeys: selectedRowKeys});
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading">Roles & Permission</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item className="gx-text-primary"> <Link to="/roles-permissions/all" className="gx-text-primary">
              Roles & Permission</Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canRoleAdd()) ?
                <Button type="primary" className="gx-btn-lg"
                        onClick={this.onAddButtonClick}>
                  Add New Role
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Enter keywords to Search Roles"
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
                style={{width: 350}}
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
          <Table rowKey="id" rowSelection={rowSelection} columns={this.rolesRowData()}
                 dataSource={roles}
                 pagination={{
                   pageSize: itemNumbers,
                   current: current,
                   total: totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive"/>
        </Widget>
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
  onBulkDeleteRoles,
  onGetRoleDetail,
  onDisableSelectedRole
})(RolesList);

RolesList.defaultProps = {
  roles: [],
  totalItems: null
};

RolesList.propTypes = {
  roles: PropTypes.array,
  totalItems: PropTypes.number,
  onGetRoles: PropTypes.func,
  onBulkDeleteRoles: PropTypes.func,
  onGetRoleDetail: PropTypes.func,
  onDisableSelectedRole: PropTypes.func
};
