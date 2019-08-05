import React, {Component} from "react";
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Select, Table} from "antd";
import {connect} from "react-redux";

import Widget from "../../../components/Widget/index";
import {
  onBulkDeleteRoles,
  onDisableSelectedRole,
  onGetRoleDetail,
  onGetRoles
} from "../../../appRedux/actions/RolesAndPermissions";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import RoleRow from "./RoleRow";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

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

  onGetRolesData = (currentPage, itemsPerPage, filterText, updatingContent) => {
    if (Permissions.canRoleView()) {
      this.props.onGetRoles(currentPage, itemsPerPage, filterText, updatingContent);
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetRolesData(1, this.state.itemNumbers, this.state.filterText, true);
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1},
        () => {
          this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
        });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
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


  showBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedRoles.length !== 0) {
      confirm({
        title: messages["roles.message.delete"],
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
      Modal.info({
        title: messages["roles.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canRoleDelete() ?
          <Menu.Item key="1" onClick={this.showBulkDeleteConfirm}>
            <span><IntlMessages id="common.archive"/></span>
          </Menu.Item> : null}
        {Permissions.canRoleDelete() ?
          <Menu.Item key="2" onClick={this.showBulkDeleteConfirm}>
            <IntlMessages id="common.delete"/>
          </Menu.Item> : null}
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <IntlMessages id="common.bulkActions"/> <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onPageChange = page => {
    this.setState({current: page}, () => {
      this.onGetRolesData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  render() {
    const {current, totalItems, itemNumbers} = this.state;
    const roles = this.props.roles;
    const {messages} = this.props.intl;
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
          <h4 className="gx-widget-heading"><IntlMessages id="roles.title"/></h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item className="gx-text-primary"> <Link to="/roles-permissions/all" className="gx-text-primary">
              <IntlMessages id="roles.title"/></Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {(Permissions.canRoleAdd()) ?
                <Button type="primary" className="gx-btn-lg"
                        onClick={this.onAddButtonClick}>
                  <IntlMessages id="roles.addNew"/>
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder={messages["roles.searchPlaceHolder"]}
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
          <Table rowKey="id" rowSelection={rowSelection} columns={RoleRow(this)}
                 dataSource={roles}
                 loading={this.props.updatingContent}
                 pagination={{
                   pageSize: itemNumbers,
                   current: current,
                   total: totalItems,
                   showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                     <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                     <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive"/>
        </Widget>
      </div>

    );
  }
}

const mapStateToProps = ({rolesAndPermissions, commonData}) => {
  const {roles, totalItems} = rolesAndPermissions;
  const {updatingContent} = commonData;
  return {roles, updatingContent, totalItems}
};

export default connect(mapStateToProps, {
  onGetRoles,
  onBulkDeleteRoles,
  onGetRoleDetail,
  onDisableSelectedRole
})(injectIntl(RolesList));

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
