import React, {Component} from "react"
import {Button, Icon, Input, Select, Table, Tag} from "antd";
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

const ButtonGroup = Button.Group;
const { Option } = Select;


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
          return <Tag color={record.color_code}>{record.color_code}</Tag>
        },
      },
      {
        title: 'Default',
        dataIndex: 'default',
        key: 'default',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.is_default === 1 ? "Default" : "Set Default"}</span>
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
          return <Tag color={record.color_code}>
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
            {Permissions.canStatusDelete() ? <i className="icon icon-trash"
                                                onClick={() => this.props.onDeleteTicketStatus(record.id)}/> : null}
          </span>
        },
      },
    ];
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
      <Auxiliary>
        <Widget
          title={<span>
            {Permissions.canStatusAdd() ?
              <Button type="primary" className="h4 gx-text-capitalize gx-mb-0" onClick={this.onAddButtonClick}>
                Add New Status</Button> : null}
        <span>{this.onSelectOption()}</span>
      </span>}
          extra={
            <div className="gx-d-flex gx-align-items-center">
              <Input
                placeholder="Enter keywords to search Status"
                prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
              />
              <div className="gx-ml-3">
                {this.onShowItemOptions()}
              </div>
              <div className="gx-ml-3">
                <ButtonGroup className="gx-btn-group-flex">
                  <Button className="gx-mb-0" type="default" onClick ={this.onCurrentDecrement} >
                    <i className="icon icon-long-arrow-left"/>
                  </Button>
                  <Button className="gx-mb-0" type="default" onClick ={this.onCurrentIncrement}>
                    <i className="icon icon-long-arrow-right"/>
                  </Button>
                </ButtonGroup>
              </div>
            </div>}>

            <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                   dataSource={statuses} className="gx-mb-4"
                   pagination = {{pageSize: this.state.itemNumbers,
                     current: this.state.current,
                     total:statuses.length,
                     showTotal:((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                     onChange: this.onPageChange}}/>
          <div className="gx-d-flex gx-flex-row">
            <span>Showing {statuses.length} of {statuses.length}</span>
          </div>
        </Widget>
        {this.state.showAddStatus ?
          <AddNewStatus showAddStatus={this.state.showAddStatus}
                        onToggleAddStatus={this.onToggleAddStatus}
                        onAddTicketStatus={this.props.onAddTicketStatus}
                        statusId={this.state.statusId}
                        onEditTicketStatus={this.props.onEditTicketStatus}
                        statuses={statuses}/> : null}
      </Auxiliary>
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