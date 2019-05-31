import React, {Component} from "react"
import {Badge, Button, Icon, Input, Table} from "antd";
import {connect} from "react-redux";
import {
  onAddTicketPriority,
  onDeleteTicketPriority,
  onGetTicketPriorities,
  onToggleAddPriority
} from "../../../appRedux/actions/TicketPriorities";

import Widget from "../../../components/Widget/index";
import AddNewPriority from "./AddNewPriority";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";

const ButtonGroup = Button.Group;

class TicketPriorities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    };
  };
  componentWillMount() {
    this.props.onGetTicketPriorities();
  };
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onGetTableColumns = () => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.id}</span>

        },
      },
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
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc}</span>
        },
      },
      {
        title: 'Color Code',
        dataIndex: 'colorCode',
        key: 'colorCode',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.color_code}</span>
        },
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.user_id}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'Status',
        render: (text, record) => {
          return <Badge>
            {record.status}
          </Badge>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span>{Permissions.canPriorityEdit() ? <i className="icon icon-edit gx-mr-3"/> : null}
            {Permissions.canPriorityDelete() ? <i className="icon icon-trash"
                                                  onClick={() => this.props.onDeleteTicketPriority(record.id)}/> : null}
          </span>
        },
      },
    ];
  };
  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    console.log("in Show TicketPriorities", this.props.priorities);
    return (
      <Widget
        title={<div>
          {Permissions.canPriorityAdd() ? <Button type="primary" className="h4 gx-text-capitalize gx-mb-0"
                                                  onClick={this.props.onToggleAddPriority}>
            Add New Priority
          </Button> : null}
          {this.props.showAddPriority ?
            <AddNewPriority showAddPriority={this.props.showAddPriority}
                            onToggleAddPriority={this.props.onToggleAddPriority}
                            onAddTicketPriority={this.props.onAddTicketPriority}/> : null}
        </div>} extra={
        <div className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
          <Input
            placeholder="Enter keywords to search tickets"
            prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
          />
          <ButtonGroup>
            <Button type="default">
              <i className="icon icon-long-arrow-left"/>
            </Button>
            <Button type="default">
              <i className="icon icon-long-arrow-right"/>
            </Button>
          </ButtonGroup>
        </div>
      }>
        {Permissions.canPriorityView() ?
        <Table rowSelection={rowSelection} columns={this.onGetTableColumns()} dataSource={this.props.priorities}
               className="gx-mb-4"/> : null}
        <div>
        </div>
      </Widget>
    );
  }
}

const mapStateToProps = ({ticketPriorities}) => {
  const {priorities, showAddPriority} = ticketPriorities;
  return {priorities, showAddPriority};
};

export default connect(mapStateToProps, {
  onGetTicketPriorities,
  onToggleAddPriority,
  onAddTicketPriority,
  onDeleteTicketPriority
})(TicketPriorities);

TicketPriorities.defaultProps = {
  priorities: [],
  showAddPriority: false
};

TicketPriorities.propTypes = {
  priorities: PropTypes.array,
  showAddPriority: PropTypes.bool
};