import React, {Component} from 'react';
import {Button, Divider, Popconfirm, Table, Tag} from "antd/lib/index";
import AddNewResponses from "../../SetUp/CannedResponses/AddNewResponses";
import {connect} from "react-redux";
import {
  onAddCannedResponse,
  onBulkDeleteResponses,
  onEditCannedResponse,
  onGetCannedResponses
} from "../../../appRedux/actions/CannedResponses";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";

class NinthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCanned: false,
      responseId: null,
    }
  }

  componentDidMount() {
    this.props.onGetCannedResponses();
  }

  onToggleAddCanned = () => {
    this.setState({showAddCanned: !this.state.showAddCanned})
  };

  onAddButtonClick = () => {
    this.setState({responseId: null, showAddCanned: true});
  };

  onEditResponse = (id) => {
    this.setState({responseId: id, showAddCanned: true});
  };

  onGetTableColumns = () => {
    return [
      {
        title: 'Short Title',
        dataIndex: 'shortTitle',
        key: 'shortTitle',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_title}</span>
        }
      },
      {
        title: 'Short Code',
        dataIndex: 'shortCode',
        key: 'shortCode',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_code}</span>
        },
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.message}</span>
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
          return <span> {Permissions.canResponseEdit() ? <i className="icon icon-edit gx-mr-3"
                                                            onClick={() => this.onEditResponse(record.id)}/> : null}
            {Permissions.canResponseDelete() ? this.onDeletePopUp(record.id) : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    return <Popconfirm
      title="Are you sure to delete this Response?"
      onConfirm={() => {
        this.props.onBulkDeleteResponses({ids: [recordId]});
        this.props.onGetCannedResponses()
      }}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4">Default Canned Responses</Divider>
        <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.responses}
               className="gx-mb-4" pagination={false}/>
        <div className="gx-d-flex gx-justify-content-between">
          <div>
            <Button type="default" onClick={() => this.props.onMoveToPrevStep()}>Previous</Button>
            <Button type="primary" onClick={() => this.props.onMoveToNextStep()}>Next</Button>
          </div>
          <div><Button onClick={this.onAddButtonClick}>+Add New</Button></div>
        </div>
        {this.state.showAddCanned ?
          <AddNewResponses showAddCanned={this.state.showAddCanned}
                           onToggleAddCanned={this.onToggleAddCanned}
                           onAddCannedResponse={this.props.onAddCannedResponse}
                           responseId={this.state.responseId}
                           onEditCannedResponse={this.props.onEditCannedResponse}
                           responses={this.props.responses}
          /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({cannedResponses}) => {
  const {responses} = cannedResponses;
  return {responses};
};


export default connect(mapStateToProps, {
  onGetCannedResponses,
  onAddCannedResponse,
  onEditCannedResponse,
  onBulkDeleteResponses
})(NinthStep);

NinthStep.defaultProps = {
  responses: []
};

NinthStep.propTypes = {
  responses: PropTypes.array
};