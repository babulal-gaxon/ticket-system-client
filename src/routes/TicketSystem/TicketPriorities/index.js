import React, {Component} from "react"
import {Breadcrumb, Button, Icon, Input, message, Popconfirm, Select, Table, Tag} from "antd";
import {connect} from "react-redux";
import {
  onAddTicketPriority, onBulkActivePriorities, onBulkDeletePriorities, onBulkInActivePriorities,
  onDeleteTicketPriority,
  onEditTicketPriority,
  onGetTicketPriorities
} from "../../../appRedux/actions/TicketPriorities";

import Widget from "../../../components/Widget/index";
import AddNewPriority from "./AddNewPriority";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;


class TicketPriorities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      priorityId: 0,
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddPriority: false,
      selectedPriorities: []
    };
  };
  componentWillMount() {
    this.onGetPriorityData(this.state.current, this.state.itemNumbers);
  };
  onGetPriorityData = (currentPage, itemsPerPage) => {
    if(Permissions.canPriorityView())
    {
      this.props.onGetTicketPriorities(currentPage, itemsPerPage);
    }
  };
  onToggleAddPriority = () => {
    this.setState({showAddPriority: !this.state.showAddPriority})
  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems/this.state.itemNumbers);
    if(this.state.current < pages ) {
      this.setState({current: this.state.current + 1});
    }
    else {
    return null;
    }
    this.onGetPriorityData(this.state.current + 1, this.state.itemNumbers);
  };
  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1});
    } else {
      return null;
    }
    this.onGetPriorityData(this.state.current - 1, this.state.itemNumbers);
  };
  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value});
  };
  onFilterData = () => {
    return this.props.priorities.filter(priority => priority.name.indexOf(this.state.filterText) !== -1);
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onAddButtonClick = () => {
    this.setState({priorityId: 0, showAddPriority: true});
  };
  onEditPriority = (id) => {
    this.setState({priorityId: id, showAddPriority: true});
  };
  onSelectOption = () => {
    return <Select defaultValue="Active" style={{width: 120}}>
      <Option value="Active">
        {this.state.selectedPriorities.length !== 0 ?
          <Popconfirm
            title="Are you sure to change the status of selected Priority(s) to ACTIVE?"
            onConfirm={() => {
              const obj = {
                priority_ids: this.state.selectedPriorities
              };
              this.props.onBulkActivePriorities(obj, this.onStatusChangeMessage);
              this.setState({selectedRowKeys: []})
            }}
            okText="Yes"
            cancelText="No">
            Active
          </Popconfirm> :
          <Popconfirm
            title="Please select Priority(s) first"
            okText="Ok">
            Active
          </Popconfirm>}</Option>
      <Option value="Disable">
        {this.state.selectedPriorities.length !== 0 ?
          <Popconfirm
            title="Are you sure to change the status of selected Priority(s) to DISABLED?"
            onConfirm={() => {
              const obj = {
                priority_ids: this.state.selectedPriorities
              };
              this.props.onBulkInActivePriorities(obj, this.onStatusChangeMessage);
              this.setState({selectedRowKeys: []})
            }}
            okText="Yes"
            cancelText="No">
            Disable
          </Popconfirm> :
          <Popconfirm
            title="Please select Priority(s) first"
            okText="Ok">
            Disable
          </Popconfirm>}</Option>
      <Option value="Delete">
        {this.state.selectedPriorities.length !== 0 ?
          <Popconfirm
            title="Are you sure to delete the selected Priority(s)?"
            onConfirm={() => {
              const obj = {
                priority_ids: this.state.selectedPriorities
              };
              this.props.onBulkDeletePriorities(obj, this.onDeleteSuccessMessage);
              this.setState({selectedRowKeys: []})
            }}
            okText="Yes"
            cancelText="No">
            Delete
          </Popconfirm> :
          <Popconfirm
            title="Please select Priority(s) first"
            okText="Ok">
            Delete
          </Popconfirm>}
      </Option>
    </Select>
  };
  onStatusChangeMessage = () => {
    message.success('The status of selected Priorities has been changed successfully.');
  };
  onGetTableColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc ? record.desc : "NA"}</span>
        },
      },
      {
        title: 'Color Code',
        dataIndex: 'colorCode',
        key: 'colorCode',
        render: (text, record) => {
          return <Tag color ={record.color_code}><span style={{color:record.color_code}}>{record.color_code}</span></Tag>
        },
      },
      {
        title: 'Priority Value',
        dataIndex: 'priorityValue',
        key: 'priorityValue',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{`0${record.value} - some message`}</span>
        },
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.created_by}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'Status',
        render: (text, record) => {
          return <Tag color={record.status ? "green" : "red"}>
            {record.status ? "Active" : "Disabled"}
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span>{Permissions.canPriorityEdit() ? <i className="icon icon-edit gx-mr-3"
                                                           onClick={() => this.onEditPriority(record.id)}/> : null}
            {Permissions.canPriorityDelete() ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };
  onDeleteSuccessMessage = () => {
    message.success('The selected Priority(s) has been deleted successfully.');
  };
  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Priority?"
      onConfirm={() => this.props.onDeleteTicketPriority(recordId, this.onDeleteSuccessMessage)}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };
  onPageChange = page => {
    this.setState({
      current: page,
    });
    this.onGetPriorityData(page, this.state.itemNumbers);
  };
  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };
  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1})
    this.onGetPriorityData(1,value);
  };
  render() {
    const selectedRowKeys = this.state.selectedRowKeys;
    const priorities = this.onFilterData();
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedPriorities:ids, selectedRowKeys: selectedRowKeys})
      }};
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4>Ticket Priorities</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to = "/ticket-system/ticket-priorities">Ticket System</Link></Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">Ticket Priorities</Breadcrumb.Item>
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
                style={{width: 200}}
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
            <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                   dataSource={priorities} className="gx-mb-4"
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
                          priorityId={this.state.priorityId}
                          onEditTicketPriority={this.props.onEditTicketPriority}
                          priorities={priorities}/> : null}
      </div>
    );
  }
}


const mapStateToProps = ({ticketPriorities}) => {
  const {priorities, totalItems} = ticketPriorities;
  return {priorities, totalItems};
};

export default connect(mapStateToProps, {
  onGetTicketPriorities,
  onAddTicketPriority,
  onDeleteTicketPriority,
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