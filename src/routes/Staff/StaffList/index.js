import React, {Component} from "react"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {
  onBulkDeleteStaff,
  onChangeStaffStatus,
  onGetStaff,
  onSetCurrentStaff
} from "../../../appRedux/actions/SupportStaff";
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Select, Table} from "antd";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";
import StaffRow from "./StaffRow";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";


const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddStaff: false,
      selectedStaff: []
    };
  };

  componentDidMount() {
    this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
  }

  onGetStaffDataPaginated = (currentPage, itemsPerPage, filterText, updatingContent) => {
    if (Permissions.canStaffView()) {
      this.props.onGetStaff(currentPage, itemsPerPage, filterText, updatingContent);
    }
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1},
        () => {
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
        });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.currentPage > 1) {
      this.setState({currentPage: this.state.currentPage - 1},
        () => {
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
        });
    } else {
      return null;
    }
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetStaffDataPaginated(1, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onAddButtonClick = () => {
    this.props.onSetCurrentStaff(null);
    this.props.history.push('/staff/add-new-member')
  };

  onShowBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedStaff.length !== 0) {
      confirm({
        title: messages["staff.message.delete"],
        onOk: () => {
          this.props.onBulkDeleteStaff({ids: this.state.selectedStaff}, null, this);
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedStaff: []});
        }
      })
    } else {
      Modal.info({
        title: messages["staff.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowBulkDeleteConfirm}>
          <IntlMessages id="common.archive"/>
        </Menu.Item>
        {(Permissions.canStaffDelete()) ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            <IntlMessages id="common.delete"/>
          </Menu.Item> : null
        }
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        <IntlMessages id="common.bulkActions"/> <Icon type="down"/>
      </Button>
    </Dropdown>
  };


  onDisableStaffStatus = (staffId) => {
    this.props.onChangeStaffStatus({ids: [staffId]}, 0, true, this);
  };

  onEnableStaffStatus = (staffId) => {
    this.props.onChangeStaffStatus({ids: [staffId]}, 1, true, this);
  };

  onSelectStaff = (currentMember) => {
    this.props.history.push(`/staff/member-detail?id=${currentMember.id}`)
  };

  onPageChange = page => {
    this.setState({
      currentPage: page,
    }, () => {
      this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onBackToList = () => {
    this.setState({currentMember: null})
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const staffList = this.props.staffList;
    const {messages} = this.props.intl;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedStaff: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="common.staffs"/></h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/staff/all-members" className="gx-text-primary"><IntlMessages id="common.staffs"/></Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canStaffAdd() ?
                <Button type="primary" className="gx-btn-lg"
                        onClick={this.onAddButtonClick}>
                  <IntlMessages id="staff.addNew"/></Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder={messages["staff.search.placeholder"]}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
                style={{width: 350}}
              />
              <div className="gx-ml-3">
                {this.onShowItemOptions()}
              </div>
              <ButtonGroup className="gx-ml-3">
                <Button type="default" onClick={this.onCurrentDecrement}>
                  <i className="icon icon-long-arrow-left"/>
                </Button>
                <Button type="default" onClick={this.onCurrentIncrement}>
                  <i className="icon icon-long-arrow-right"/>
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Table rowKey="id" rowSelection={rowSelection} columns={StaffRow(this)}
                 dataSource={staffList}
                 loading={this.props.updatingContent}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.currentPage,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                     <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                     <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive gx-mb-4"
                 onRow={(record) => ({
                   onClick: () => {
                     if (Permissions.canViewStaffDetail()) {
                       this.onSelectStaff(record)
                     }
                   }
                 })}/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
      </div>
    );
  }
}


const mapStateToProps = ({supportStaff, commonData}) => {
  const {staffList, totalItems} = supportStaff;
  const {updatingContent} = commonData;
  return {staffList, totalItems, updatingContent};
};


export default connect(mapStateToProps, {
  onGetStaff,
  onSetCurrentStaff,
  onBulkDeleteStaff,
  onChangeStaffStatus
})(injectIntl(StaffList));

StaffList.defaultProps = {
  staffList: [],
  totalItems: null
};

StaffList.propTypes = {
  staffList: PropTypes.array,
  totalItems: PropTypes.number,
  onGetStaff: PropTypes.func,
  onSetCurrentStaff: PropTypes.func,
  onBulkDeleteStaff: PropTypes.func,
  onDisableSupportStaff: PropTypes.func
};
