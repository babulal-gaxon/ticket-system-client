import React, {Component} from "react"
import Widget from "../../../components/Widget/index";
import {Button, Icon, Input, Table,Badge} from "antd";
import {connect} from "react-redux";


class TicketPriorities extends Component {
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
    this.props.onGetTicketPriorities();
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
        title: 'Name',
        dataIndex: 'name',
        key:'name',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
        },

      },

      {
        title: 'Description',
        dataIndex: 'description',
        key:'description',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.description}</span>
        },

      },
      {
        title: 'Color Code',
        dataIndex: 'colorCode',
        key:'colorCode',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.color_code}</span>
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
            <i className="icon icon-trash" onClick = {() => this.props.onDeleteTicketPriority(record.id)}/>
          </span>
        },
      },
    ]

    console.log("in Show TicketPriorities",this.props.priorities)
    return (

      <Widget
        title={<div>
          <Button type="primary" className="h4 gx-text-capitalize gx-mb-0" onClick = {this.props.onToggleAddPriority}>
            Add New Response</Button>


          {this.props.showAddPriority ?
            <AddNewPriority showAddPriority ={this.props.showAddPriority}
                            onToggleAddPriority={this.props.onToggleAddPriority}
                             onAddTicketPriority={this.props.onAddTicketPriority}/> : null}
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
        <Table  rowSelection={rowSelection} columns={columns} dataSource={this.props.priorities}
                className="gx-mb-4"/>

        <div className="gx-d-flex gx-flex-row">
        </div>
        <div>


        </div>
      </Widget>
    );
  }
}

const mapStateToProps = ({ticketPriorities}) => {
  const {priorities, showAddPriority} = ticketPriorities;
  return {priorities, showAddPriority};
}


export default connect(mapStateToProps, {
  onGetTicketPriorities,
  onToggleAddPriority,
  onAddTicketPriority,
  onDeleteTicketPriority
})(TicketPriorities);
