import React, {Component} from 'react';
import {Button, Divider, Modal, Table, Tag} from "antd";
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
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const confirm = Modal.confirm;

class NinthStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCanned: false,
      currentResponse: null,
    }
  }

  componentDidMount() {
    this.props.onGetCannedResponses();
  }

  onToggleAddCanned = () => {
    this.setState({showAddCanned: !this.state.showAddCanned})
  };

  onAddButtonClick = () => {
    this.setState({currentResponse: null, showAddCanned: true});
  };

  onEditResponse = (response) => {
    this.setState({currentResponse: response, showAddCanned: true});
  };

  onGetTableColumns = () => {
    return [
      {
        title: <IntlMessages id="responses.shortTitle"/>,
        dataIndex: 'shortTitle',
        key: 'shortTitle',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_title}</span>
        }
      },
      {
        title: <IntlMessages id="responses.shortCode"/>,
        dataIndex: 'shortCode',
        key: 'shortCode',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_code}</span>
        },
      },
      {
        title: <IntlMessages id="common.message"/>,
        dataIndex: 'message',
        key: 'message',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.message}</span>
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

          return <Tag color={record.status === 1 ? "green" : "red"}>
            {record.status === 1 ? <IntlMessages id="common.active"/> : <IntlMessages id="common.disabled"/>}
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span> {Permissions.canResponseEdit() ? <i className="icon icon-edit gx-mr-3 gx-pointer"
                                                            onClick={() => this.onEditResponse(record)}/> : null}
            {Permissions.canResponseDelete() ?
              <i className="icon icon-trash gx-pointer" onClick={() => this.onDeletePopUp(record.id)}/> : null}
          </span>
        },
      },
    ];
  };

  onDeletePopUp = (recordId) => {
    const {messages} = this.props.intl;
    confirm({
      title: messages["responses.message.delete"],
      okText: messages["common.yes"],
      cancelText: messages["common.no"],
      onOk: () => {
        this.props.onBulkDeleteResponses({ids: [recordId]}, this);
        this.props.onGetCannedResponses()
      }
    })
  };

  render() {
    return (
      <div className="gx-flex-column gx-mt-3" style={{width: "60%"}}>
        <Divider orientation="left" className="gx-mb-4"><IntlMessages id="setup.defaultCannedList"/></Divider>
        <Table rowKey="id" columns={this.onGetTableColumns()} dataSource={this.props.responses}
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
        {this.state.showAddCanned ?
          <AddNewResponses showAddCanned={this.state.showAddCanned}
                           onToggleAddCanned={this.onToggleAddCanned}
                           onAddCannedResponse={this.props.onAddCannedResponse}
                           currentResponse={this.state.currentResponse}
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
})(injectIntl(NinthStep));

NinthStep.defaultProps = {
  responses: []
};

NinthStep.propTypes = {
  responses: PropTypes.array
};
