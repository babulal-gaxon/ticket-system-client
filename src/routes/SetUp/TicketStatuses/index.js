import React, {Component} from "react"
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table} from "antd/lib/index";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {
  onAddTicketStatus,
  onBulkActiveStatuses,
  onBulkDeleteStatuses,
  onBulkInActiveStatuses,
  onEditTicketStatus,
  onGetTicketStatus
} from "../../../appRedux/actions/TicketStatuses";
import AddNewStatus from "./AddNewStatus";
import Widget from "../../../components/Widget";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";
import StatusesRow from "./StatusesRow";
import {injectIntl} from "react-intl";
import IntlMessages from "../../../util/IntlMessages";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;


class TicketStatuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      currentStatus: null,
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddStatus: false,
      selectedStatus: []
    };
  };

  componentDidMount() {
    this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText);
  }

  onGetStatusData = (currentPage, itemsPerPage, filterText, updatingContent) => {
    if (Permissions.canStatusView()) {
      this.props.onGetTicketStatus(currentPage, itemsPerPage, filterText, updatingContent);
    }
  };

  onToggleAddStatus = () => {
    this.setState({showAddStatus: !this.state.showAddStatus})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetStatusData(1, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({currentStatus: null, showAddStatus: true});
  };

  onEditStatus = (id) => {
    this.setState({currentStatus: id, showAddStatus: true});
  };

  onShowBulkActiveConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedStatus.length !== 0) {
      confirm({
        title: messages["statuses.message.active"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedStatus
          };
          this.props.onBulkActiveStatuses(obj, this);
          this.setState({selectedRowKeys: [], selectedStatus: []})
        }
      })
    } else {
      Modal.info({
        title: messages["statuses.message.selectFirst"],
        onOk() {
        },
      });
    }
  };

  onShowBulkDisableConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedStatus.length !== 0) {
      confirm({
        title: messages["statuses.message.disable"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedStatus
          };
          this.props.onBulkInActiveStatuses(obj, this);
          this.setState({selectedRowKeys: [], selectedStatus: []})
        }
      })
    } else {
      Modal.info({
        title: messages["statuses.message.selectFirst"],
        onOk() {
        },
      });

    }
  };

  onShowBulkDeleteConfirm = () => {
    const {messages} = this.props.intl;
    if (this.state.selectedStatus.length !== 0) {
      confirm({
        title: messages["statuses.message.delete"],
        onOk: () => {
          const obj = {
            ids: this.state.selectedStatus
          };
          this.props.onBulkDeleteStatuses(obj, this);
          this.setState({selectedRowKeys: [], selectedStatus: []});
        }
      })
    } else {
      Modal.info({
        title: messages["statuses.message.selectFirst"],
        onOk() {
        },
      });

    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canStatusEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            <IntlMessages id="common.active"/>
          </Menu.Item> : null
        }
        {Permissions.canStatusEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            <IntlMessages id="common.disable"/>
          </Menu.Item> : null
        }
        {Permissions.canStatusDelete() ?
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


  onDeletePopUp = (recordId) => {
    const {messages} = this.props.intl;
    confirm({
      title: messages["statuses.message.delete"],
      okText: messages["common.yes"],
    cancelText: messages["common.no"],
      onOk: () => {
        this.props.onBulkDeleteStatuses({ids: [recordId]}, this);
      }
    })
  };

  onPageChange = page => {
    this.setState({
      current: page
    }, () => {
      this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    })
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
      this.onGetStatusData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const statuses = this.props.statuses;
    const {messages} = this.props.intl;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedStatus: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="statuses.title"/></h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item><IntlMessages id="common.ticketSystem"/></Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/setup/ticket-Statuses" className="gx-text-primary"><IntlMessages
                id="statuses.title"/></Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canStatusAdd() ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  <IntlMessages id="statuses.new"/></Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder={messages["statuses.search.placeholder"]}
                style={{width: 350}}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
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
          <Table rowKey="id" rowSelection={rowSelection} columns={StatusesRow(this)}
                 dataSource={statuses} className="gx-mb-4" loading={this.props.updatingContent}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => <div><span>{<IntlMessages id="common.showing"/>}</span>
                     <span>{range[0]}-{range[1]}</span> <span>{<IntlMessages id="common.of"/>} </span>
                     <span>{total}</span> <span>{<IntlMessages id="common.items"/>}</span></div>),
                   onChange: this.onPageChange
                 }}/>
        </Widget>
        {this.state.showAddStatus ?
          <AddNewStatus showAddStatus={this.state.showAddStatus}
                        onToggleAddStatus={this.onToggleAddStatus}
                        onAddTicketStatus={this.props.onAddTicketStatus}
                        currentStatus={this.state.currentStatus}
                        onEditTicketStatus={this.props.onEditTicketStatus}
          /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ticketStatuses, commonData}) => {
  const {statuses, totalItems} = ticketStatuses;
  const {updatingContent} = commonData;
  return {statuses, totalItems, updatingContent};
};

export default connect(mapStateToProps, {
  onGetTicketStatus,
  onAddTicketStatus,
  onEditTicketStatus,
  onBulkActiveStatuses,
  onBulkInActiveStatuses,
  onBulkDeleteStatuses
})(injectIntl(TicketStatuses));


TicketStatuses.defaultProps = {
  statuses: [],
  totalItems: null
};

TicketStatuses.propTypes = {
  statuses: PropTypes.array,
  totalItems: PropTypes.number
};
