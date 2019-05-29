import React, {Component} from "react"
import Widget from "../../../components/Widget/index";
import {Button, Icon, Input, Table,Badge} from "antd";
import {connect} from "react-redux";
import {
  onAddCannedResponse, onDeleteCannedResponse, onGetCannedResponses,
  onToggleAddCanned
} from "../../../appRedux/actions/CannedResponses";
import AddNewResponses from "./AddNewResponses";


class CannedResponses extends Component {
  constructor(props) {
    super(props);
    this.state= {
      selectedRowKeys: []
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  componentWillMount() {
    this.props.onGetCannedResponses();
  }

  render() {
    const ButtonGroup = Button.Group;
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const columns = [

      {
        title: 'ID',
        dataIndex: 'id',
        key:'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.id}</span>

        },
      },
      {
        title: 'Short Title',
        dataIndex: 'shortTitle',
        key:'shortTitle',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_title}</span>
        },

      },

      {
        title: 'Short Code',
        dataIndex: 'shortCode',
        key:'shortCode',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_code}</span>
        },

      },
      {
        title: 'Message',
        dataIndex: 'message',
        key:'message',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.message}</span>
        },
      },
      {
        title: 'Created By',
        dataIndex: 'createdBy',
        key:'createdBy',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.user_id}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key:'Status',
        render: (text, record) => {
          return <Badge>
            {record.status}
          </Badge>
        },
      },
      {
        title: '',
        dataIndex: '',
        key:'empty',
        render: (text, record) => {
          return <span> <i className="icon icon-edit gx-mr-3"/>
            <i className="icon icon-trash" onClick = {() => this.props.onDeleteCannedResponse(record.id)}/>
          </span>
        },
      },
    ]

    console.log("in Show Responses",this.props.responses)
    return (

      <Widget
        title={<div>
          <Button type="primary" className="h4 gx-text-capitalize gx-mb-0" onClick = {this.props.onToggleAddCanned}>
            Add New Response</Button>


          {this.props.showAddCanned ?
            <AddNewResponses showAddCanned ={this.props.showAddCanned}
                           onToggleAddCanned={this.props.onToggleAddCanned}
                           onAddCannedResponse={this.props.onAddCannedResponse}/> : null}
        </div>} extra={
        <div className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
          <Input
            placeholder="Enter keywords to search tickets"
            prefix={<Icon type="search" style={{color: 'rgba(0,0,0,.25)'}}/>}
          />
          <ButtonGroup>
            <Button type="default" >
              <i className="icon icon-long-arrow-left"/>
            </Button>
            <Button type="default" >
              <i className="icon icon-long-arrow-right"/>
            </Button>
          </ButtonGroup>
        </div>
      } >
        <Table  rowSelection={rowSelection} columns={columns} dataSource={this.props.responses}
                className="gx-mb-4"/>

        <div className="gx-d-flex gx-flex-row">
        </div>
        <div>


        </div>
      </Widget>
    );
  }
}

const mapStateToProps = ({cannedResponses}) => {
  const {responses, showAddCanned} = cannedResponses;
  return {responses, showAddCanned};
}


export default connect(mapStateToProps, {
  onGetCannedResponses,
  onToggleAddCanned,
  onAddCannedResponse,
  onDeleteCannedResponse
})(CannedResponses);
