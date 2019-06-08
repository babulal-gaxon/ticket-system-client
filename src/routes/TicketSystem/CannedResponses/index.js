import React, {Component} from "react"
import {Badge, Button, Icon, Input, Select, Table, Tag} from "antd";
import {connect} from "react-redux";

import {
  onAddCannedResponse,
  onDeleteCannedResponse,
  onEditCannedResponse,
  onGetCannedResponses
} from "../../../appRedux/actions/CannedResponses";
import AddNewResponses from "./AddNewResponses";
import Widget from "../../../components/Widget/index";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";

const ButtonGroup = Button.Group;
const {Option} = Select;

class CannedResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      responseId: 0,
      filterText: "",
      itemNumbers: 10,
      current: 1,
      showAddCanned: false
    };
  };
  componentWillMount() {
    if(Permissions.canResponseView()) {
      this.props.onGetCannedResponses();
    }
  };
  onToggleAddCanned = () => {
    this.setState({showAddCanned: !this.state.showAddCanned})
  };
  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.responses.length/this.state.itemNumbers);
    console.log("pages", pages)
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
  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };
  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value})
  };
  onAddButtonClick = () => {
    this.setState({responseId: 0, showAddCanned: true});
  };
  onEditResponse = (id) => {
    this.setState({responseId: id, showAddCanned: true});
  };
  onFilterData = () => {
    return this.props.responses.filter(response => response.short_title.indexOf(this.state.filterText) !== -1);
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
          return <Tag>
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
            {Permissions.canResponseDelete() ? <i className="icon icon-trash"
                                                  onClick={() => this.props.onDeleteCannedResponse(record.id)}/> : null}
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
    const responses = this.onFilterData();
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    console.log("in Show Responses", this.props.responses);
    return (
      <div className="gx-main-content">
        {console.log("in return", this.state.filterText)}
        <Widget
          title={<span>
            {Permissions.canResponseAdd() ? <Button type="primary" className="h4 gx-text-capitalize gx-mb-0"
                                                    onClick={this.onAddButtonClick}>
              Add New Response</Button> : null}
            <span>{this.onSelectOption()}</span>
          </span>}
          extra={
            <div className="gx-d-flex gx-align-items-center">
              <Input
                placeholder="Enter keywords to search Responses"
                prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
                value={this.state.filterText}
                onChange={this.onFilterTextChange}/>
              <div className="gx-ml-3">
                {this.onShowItemOptions()}
              </div>
              <div className="gx-ml-3">
                <ButtonGroup className="gx-btn-group-flex">
                  <Button className="gx-mb-0" type="default" onClick={this.onCurrentDecrement}>
                    <i className="icon icon-long-arrow-left"/>
                  </Button>
                  <Button className="gx-mb-0" type="default" onClick={this.onCurrentIncrement}>
                    <i className="icon icon-long-arrow-right"/>
                  </Button>
                </ButtonGroup>
              </div>
            </div>}>

            <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                   dataSource={responses} className="gx-mb-4"
                   pagination={{
                     pageSize: this.state.itemNumbers,
                     current: this.state.current,
                     total: responses.length,
                     showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                     onChange: this.onPageChange
                   }}/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        {this.state.showAddCanned ?
          <AddNewResponses showAddCanned={this.state.showAddCanned}
                           onToggleAddCanned={this.onToggleAddCanned}
                           onAddCannedResponse={this.props.onAddCannedResponse}
                           responseId={this.state.responseId}
                           onEditCannedResponse={this.props.onEditCannedResponse}
                           responses={responses}
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
  onDeleteCannedResponse,
  onEditCannedResponse
})(CannedResponses);

CannedResponses.defaultProps = {
  responses: []
};

CannedResponses.propTypes = {
  responses: PropTypes.array
};