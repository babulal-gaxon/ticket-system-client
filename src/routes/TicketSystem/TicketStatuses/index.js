import React, {Component} from "react"
import {Breadcrumb, Button, Icon, Input, message, Popconfirm, Select, Table, Tag} from "antd";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {
  onAddTicketStatus,
  onDeleteTicketStatus,
  onEditTicketStatus,
  onGetTicketStatus
} from "../../../appRedux/actions/TicketStatuses";
import AddNewStatus from "./AddNewStatus";
import Widget from "../../../components/Widget/index";
import Permissions from "../../../util/Permissions";
import Auxiliary from "../../../util/Auxiliary";
import {Link} from "react-router-dom";

const ButtonGroup = Button.Group;
const { Option } = Select;
const Search = Input.Search;


class TicketStatuses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      statusId: 0,
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddStatus: false
    };
  };
  componentWillMount() {
    if(Permissions.canStatusView())
    {
      this.props.onGetTicketStatus();
    }
  };
  onToggleAddStatus = () => {
    this.setState({showAddStatus: !this.state.showAddStatus})
  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.statuses.length/this.state.itemNumbers);
    if(this.state.current < pages ) {
      this.setState({current: this.state.current + 1});
    }
    else {
      return null;
    }
  };
  onCurrentDecrement = () => {
    if(this.state.current !== 1) {
      this.setState({current: this.state.current - 1});
    }
    else{
      return null;
    }
  };
  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value});
  };
  onFilterData = () => {
    return this.props.statuses.filter(status => status.name.indexOf(this.state.filterText) !== -1);
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onAddButtonClick = () => {
    this.setState({statusId: 0, showAddStatus: true});
  };
  onEditStatus = (id) => {
    this.setState({statusId: id, showAddStatus: true});
  };
  onSelectOption = () => {
    return <Select defaultValue="Archive" style={{ width: 120 }}>
      <Option value="Archive">Archive</Option>
      <Option value="Delete">Delete</Option>
      <Option value="Disable">Disable</Option>
      <Option value="Export">Export</Option>
    </Select>
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
        title: 'Number of Orders',
        dataIndex: 'numberOfOrders',
        key: 'numberOfOrders',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.tickets_count}</span>
        },
      },
      {
        title: 'Color Code',
        dataIndex: 'colorCode',
        key: 'colorCode',
        render: (text, record) => {
          return <Tag color={record.color_code}>
            <span style={{color:record.color_code}}>{record.color_code}</span></Tag>
        },
      },
      {
        title: 'Default',
        dataIndex: 'default',
        key: 'default',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2" style={{color: record.is_default === 1 ? "blue" : ""}}>{
            record.is_default === 1 ? "Default" : "Set Default"}</span>
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
          return <span> {Permissions.canStatusEdit() ? <i className="icon icon-edit gx-mr-3"
                                                          onClick={() => this.onEditStatus(record.id)}/> : null}
            {Permissions.canStatusDelete() ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };
  onDeleteSuccessMessage = () => {
    message.success('The selected Status(s) has been deleted successfully.');
  };
  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Status?"
      onConfirm={() => this.props.onDeleteTicketStatus(recordId, this.onDeleteSuccessMessage)}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };
  onPageChange = page => {
    this.setState({
      current: page,
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
    this.setState({itemNumbers: value})
  };
  render() {
    const statuses = this.onFilterData();
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    console.log("in Show TicketStatuses", this.props.statuses);
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4>Ticket Status</h4>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to = "/ticket-system/ticket-Status">Ticket System</Link></Breadcrumb.Item>
            <Breadcrumb.Item className="gx-text-primary">Ticket Status</Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
            {Permissions.canStatusAdd() ?
              <Button type="primary" className="gx-btn-lg" onClick={this.onAddButtonClick}>
                Add New Status</Button> : null}
        <span>{this.onSelectOption()}</span>
      </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Enter keywords to search Status"
                style={{width: 200}}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
              />
              <div className="gx-ml-3">
                {this.onShowItemOptions()}
              </div>
                <ButtonGroup  className="gx-ml-3">
                  <Button type="default" onClick ={this.onCurrentDecrement} >
                    <i className="icon icon-long-arrow-left"/>
                  </Button>
                  <Button type="default" onClick ={this.onCurrentIncrement}>
                    <i className="icon icon-long-arrow-right"/>
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                   dataSource={statuses} className="gx-mb-4"
                   pagination = {{pageSize: this.state.itemNumbers,
                     current: this.state.current,
                     total:statuses.length,
                     showTotal:((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                     onChange: this.onPageChange}}/>
        </Widget>
        {this.state.showAddStatus ?
          <AddNewStatus showAddStatus={this.state.showAddStatus}
                        onToggleAddStatus={this.onToggleAddStatus}
                        onAddTicketStatus={this.props.onAddTicketStatus}
                        statusId={this.state.statusId}
                        onEditTicketStatus={this.props.onEditTicketStatus}
                        statuses={statuses}/> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ticketStatuses}) => {
  const {statuses, showAddStatus} = ticketStatuses;
  return {statuses, showAddStatus};
};

export default connect(mapStateToProps, {
  onGetTicketStatus,
  onAddTicketStatus,
  onDeleteTicketStatus,
  onEditTicketStatus
})(TicketStatuses);


TicketStatuses.defaultProps = {
  statuses: []
};

TicketStatuses.propTypes = {
  statuses: PropTypes.array
};