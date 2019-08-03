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
import IntlMessages from "../../../util/IntlMessages";

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
        title: <IntlMessages id="common.name"/>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
        },
      },
      {
        title: <IntlMessages id="common.description"/>,
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc ? record.desc :
            <IntlMessages id="common.na"/>}</span>
        },
      },
      {
        title: <IntlMessages id="common.colorCode"/>,
        dataIndex: 'colorCode',
        key: 'colorCode',
        render: (text, record) => {
          return <Tag color={record.color_code}><span
            style={{color: record.color_code}}>{record.color_code}</span></Tag>
        },
      },
      {
        title: <IntlMessages id="priorities.weight"/>,
        dataIndex: 'priorityValue',
        key: 'priorityValue',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">0{record.value}</span>
        },
      },
      {
        title: <IntlMessages id="common.createdBy"/>,
        dataIndex: 'createdBy',
        key: 'createdBy',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.created_by}</span>
        },
      },
      {
        title: <IntlMessages id="common.status"/>,
        dataIndex: 'status_id',
        key: 'Status',
        render: (text, record) => {
          return <Tag color={record.status ? "green" : "red"}>
            {record.status ? <IntlMessages id="common.active"/> : <IntlMessages id="common.disabled"/>}
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
      okText={<IntlMessages id="common.yes"/>}
      cancelText={<IntlMessages id="common.no"/>}>
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4"><IntlMessages id="setup.defaultPriorityList"/></Divider>
        <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.priorities}
               className="gx-mb-4" pagination={false}/>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}><IntlMessages
              id="common.previous"/></Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}><IntlMessages
              id="common.next"/></Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+<IntlMessages id="common.addNew"/></Button></div>
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
