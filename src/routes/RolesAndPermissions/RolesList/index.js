import React, {Component} from "react";
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd";
import {connect} from "react-redux";


import Widget from "../../../components/Widget/index";
import InfoView from '../../../components/InfoView'
import {
  onBulkDeleteRoles,
  onDisableSelectedRole,
  onGetRoleDetail,
  onGetRoles
} from "../../../appRedux/actions/RolesAndPermissions";
import moment from "moment";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";

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

  componentWillMount() {
    this.onGetRolesData(this.state.current, this.state.itemNumbers);
  };

  onGetRolesData = (currentPage, itemsPerPage) => {
    if (Permissions.canRoleView()) {
      this.props.onGetRoles(currentPage, itemsPerPage);
    }
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
    this.setState({itemNumbers: value, current: 1},
      () => {
        this.onGetRolesData(this.state.current, this.state.itemNumbers)
      });
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1},
        () => {
          this.onGetRolesData(this.state.current, this.state.itemNumbers)
        });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1},
        () => {
          this.onGetRolesData(this.state.current, this.state.itemNumbers)
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
        render: (text, record) => {
          return <span className="gx-text-grey">{record.name}</span>
        },
      },
      {
        title: 'Last Update',
        dataIndex: 'lastUpdate',
        render: (text, record) => {
          return <span className="gx-text-grey">{moment(record.updated_at).format('LL')}</span>
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
        key: 'empty',
        render: (text, record) => {
          return <span> {Permissions.canRoleEdit() ? <i className="icon icon-edit gx-mr-3" onClick={() => {
            this.props.onGetRoleDetail(record.id, this.props.history);
          }}/> : null}
            {Permissions.canRoleDelete() ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Role?"
      onConfirm={() => {
        this.props.onBulkDeleteRoles({ids: [recordId]});
        this.onGetRolesData(this.state.current, this.state.itemNumbers)
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
        <Menu.Item key="1">
          Archive
        </Menu.Item>
        {Permissions.canRoleDelete() ?
          <Menu.Item key="2" onClick={this.showBulkDeleteConfirm}>
          Delete
        </Menu.Item>
          : null}
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onPageChange = page => {
    this.setState({current: page},
      () => {
        this.onGetRolesData(this.state.current, this.state.itemNumbers)
      });
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
        this.setState({selectedRoles: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4>Roles & Permission</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item className="gx-text-primary">Roles & Permission</Breadcrumb.Item>
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
  onBulkDeleteRoles,
  onGetRoleDetail,
  onDisableSelectedRole
})(RolesList);

RolesList.defaultProps = {
  roles:[],
  totalItems: null
};

RolesList.propTypes = {
  roles:PropTypes.array,
  totalItems: PropTypes.number
};