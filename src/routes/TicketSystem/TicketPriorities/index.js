import React, {Component} from "react"
import {Breadcrumb, Button, Icon, Input, message, Popconfirm, Select, Table, Tag} from "antd";
import {connect} from "react-redux";
import {
  onAddTicketPriority,
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
      showAddPriority: false
    };
  };
  componentWillMount() {
    if(Permissions.canPriorityView())
    {
      this.props.onGetTicketPriorities();
    }
  };
  onToggleAddPriority = () => {
    this.setState({showAddPriority: !this.state.showAddPriority})
  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.priorities.length/this.state.itemNumbers);
    if(this.state.current < pages ) {
      this.setState({current: this.state.current + 1});
    }
    else {
    return null;
    }
  };
  onCurrentDecrement = () => {
    if (this.state.current !== 1) {
      this.setState({current: this.state.current - 1});
    } else {
      return null;
    }
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
    return <Select defaultValue="Archive" style={{width: 120}}>
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
    const priorities = this.onFilterData();
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
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
                     total: priorities.length,
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
  const {priorities} = ticketPriorities;
  return {priorities};
};

export default connect(mapStateToProps, {
  onGetTicketPriorities,
  onAddTicketPriority,
  onDeleteTicketPriority,
  onEditTicketPriority
})(TicketPriorities);

TicketPriorities.defaultProps = {
  priorities: []
};

TicketPriorities.propTypes = {
  priorities: PropTypes.array
};