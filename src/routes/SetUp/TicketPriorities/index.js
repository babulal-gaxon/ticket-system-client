import React, {Component} from "react"
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Popconfirm, Select, Table, Tag} from "antd/lib/index";
import {connect} from "react-redux";
import {
  onAddTicketPriority,
  onBulkActivePriorities,
  onBulkDeletePriorities,
  onBulkInActivePriorities,
  onEditTicketPriority,
  onGetTicketPriorities
} from "../../../appRedux/actions/TicketPriorities";

import Widget from "../../../components/Widget";
import AddNewPriority from "./AddNewPriority";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";
import PrioritiesRow from "./PrioritiesRow";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;


class TicketPriorities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      currentPriority: null,
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddPriority: false,
      selectedPriorities: []
    };
    this.onGetPriorityData(this.state.current, this.state.itemNumbers, this.state.filterText);
  };

  onGetPriorityData = (currentPage, itemsPerPage, filterText, updatingContent) => {
    if (Permissions.canPriorityView()) {
      this.props.onGetTicketPriorities(currentPage, itemsPerPage, filterText, updatingContent);
    }
  };

  onToggleAddPriority = () => {
    this.setState({showAddPriority: !this.state.showAddPriority})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPriorityData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPriorityData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetPriorityData(1, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onAddButtonClick = () => {
    this.setState({currentPriority: null, showAddPriority: true});
  };

  onEditPriority = (priority) => {
    this.setState({currentPriority: priority, showAddPriority: true});
  };

  onShowBulkActiveConfirm = () => {
    if (this.state.selectedPriorities.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Priority(s) to ACTIVE?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedPriorities
          };
          this.props.onBulkActivePriorities(obj);
          this.setState({selectedRowKeys: [], selectedPriorities: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Priority(s) first",
      })
    }
  };

  onShowBulkDisableConfirm = () => {
    if (this.state.selectedPriorities.length !== 0) {
      confirm({
        title: "Are you sure to change the status of selected Priority(s) to DISABLED?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedPriorities
          };
          this.props.onBulkInActivePriorities(obj);
          this.setState({selectedRowKeys: [], selectedPriorities: []})
        }
      })
    } else {
      confirm({
        title: "Please Select Priority(s) first",
      })
    }
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.selectedPriorities.length !== 0) {
      confirm({
        title: "Are you sure to delete the selected Priority(s)?",
        onOk: () => {
          const obj = {
            ids: this.state.selectedPriorities
          };
          this.props.onBulkDeletePriorities(obj);
          this.onGetPriorityData(this.state.current, this.state.itemNumbers);
          this.setState({selectedRowKeys: [], selectedPriorities: []});
        }
      })
    } else {
      confirm({
        title: "Please Select Priority(s) first",
      })
    }
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {Permissions.canPriorityEdit() ?
          <Menu.Item key="1" onClick={this.onShowBulkActiveConfirm}>
            Active
          </Menu.Item> : null
        }
        {Permissions.canPriorityEdit() ?
          <Menu.Item key="2" onClick={this.onShowBulkDisableConfirm}>
            Disable
          </Menu.Item> : null
        }
        {Permissions.canPriorityDelete() ?
          <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
            Delete
          </Menu.Item> : null
        }
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Priority?"
      onConfirm={() => {
        this.props.onBulkDeletePriorities({ids: [recordId]});
        this.onGetPriorityData(this.state.current, this.state.itemNumbers, this.state.filterText);
      }}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  onPageChange = page => {
    this.setState({
      current: page,
    }, () => {
      this.onGetPriorityData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
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
      this.onGetPriorityData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const priorities = this.props.priorities;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedPriorities: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading">Ticket Priorities</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>Ticket System</Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">
              <Link to="/setup/ticket-priorities" className="gx-text-primary">Ticket Priorities</Link></Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              {Permissions.canPriorityAdd() ?
                <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                  Add New Priority
                </Button> : null}
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Enter keywords to search Priorities"
                style={{width: 350}}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}/>
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
          <Table rowKey="id" rowSelection={rowSelection} columns={PrioritiesRow(this)}
                 dataSource={priorities} className="gx-mb-4" loading={this.props.updatingContent}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}/>
        </Widget>
        {this.state.showAddPriority ?
          <AddNewPriority showAddPriority={this.state.showAddPriority}
                          onToggleAddPriority={this.onToggleAddPriority}
                          onAddTicketPriority={this.props.onAddTicketPriority}
                          currentPriority={this.state.currentPriority}
                          onEditTicketPriority={this.props.onEditTicketPriority}
                          /> : null}
      </div>
    );
  }
}


const mapStateToProps = ({ticketPriorities, commonData}) => {
  const {priorities, totalItems} = ticketPriorities;
  const {updatingContent} = commonData;
  return {priorities, totalItems, updatingContent};
};

export default connect(mapStateToProps, {
  onGetTicketPriorities,
  onAddTicketPriority,
  onEditTicketPriority,
  onBulkActivePriorities,
  onBulkInActivePriorities,
  onBulkDeletePriorities
})(TicketPriorities);

TicketPriorities.defaultProps = {
  priorities: [],
  totalItems: null
};

TicketPriorities.propTypes = {
  priorities: PropTypes.array,
  totalItems: PropTypes.number
};
