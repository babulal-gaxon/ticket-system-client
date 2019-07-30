import React, {Component} from 'react';
import {Button, Divider, Popconfirm, Table, Tag} from "antd/lib/index";
import AddNewPriority from "../../SetUp/TicketPriorities/AddNewPriority";
import Permissions from "../../../util/Permissions";
import {connect} from "react-redux";
import {
  onAddTicketPriority,
  onBulkDeletePriorities,
  onEditTicketPriority,
  onGetTicketPriorities
} from "../../../appRedux/actions/TicketPriorities";
import PropTypes from "prop-types";

class SeventhStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPriority: false,
      priorityId: null
    }
  }

  componentDidMount() {
    this.props.onGetTicketPriorities();
  }

  onToggleAddPriority = () => {
    this.setState({showAddPriority: !this.state.showAddPriority})
  };

  onAddButtonClick = () => {
    this.setState({priorityId: null, showAddPriority: true});
  };

  onEditPriority = (id) => {
    this.setState({priorityId: id, showAddPriority: true});
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
          return <Tag color={record.color_code}><span
            style={{color: record.color_code}}>{record.color_code}</span></Tag>
        },
      },
      {
        title: 'Priority Weight',
        dataIndex: 'priorityValue',
        key: 'priorityValue',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">0{record.value}</span>
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

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Priority?"
      onConfirm={() => {
        this.props.onBulkDeletePriorities({ids: [recordId]});
        this.props.onGetTicketPriorities();
      }}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4">Default Priority List</Divider>
        <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.priorities}
               className="gx-mb-4" pagination={false}/>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
        </div>
        {this.state.showAddPriority ?
          <AddNewPriority showAddPriority={this.state.showAddPriority}
                          onToggleAddPriority={this.onToggleAddPriority}
                          onAddTicketPriority={this.props.onAddTicketPriority}
                          priorityId={this.state.priorityId}
                          onEditTicketPriority={this.props.onEditTicketPriority}
                          priorities={this.props.priorities}/> : null}
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
  onEditTicketPriority,
  onBulkDeletePriorities
})(SeventhStep);

SeventhStep.defaultProps = {
  priorities: []
};

SeventhStep.propTypes = {
  priorities: PropTypes.array
};
