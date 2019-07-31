import React, {Component} from 'react';
import {Avatar, Table, Tag, Tooltip} from "antd";
import moment from "moment";
import Widget from "../../../../components/Widget";
import Permissions from "../../../../util/Permissions";
import {MEDIA_BASE_URL} from "../../../../constants/ActionTypes";

class RelatedTickets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    }
  }

  onGetTableColumns = () => {
    return [
      {
        title: 'Ticket Detail',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
              {record.assigned_by ?
                <Tooltip placement="top" title={record.assigned_by.first_name + " " + record.assigned_by.last_name}>
                  {record.assigned_by.avatar ?
                    <Avatar className="gx-mr-3 gx-size-50" src={MEDIA_BASE_URL + record.assigned_by.avatar.src}/> :
                    <Avatar className="gx-mr-3 gx-size-50"
                            style={{backgroundColor: '#f56a00'}}>{record.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                </Tooltip> : <Avatar className="gx-size-50 gx-mr-3" src="https://via.placeholder.com/150x150"/>}
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
                <Tag className="gx-ml-2" color="blue">{record.product_name}</Tag>
                <div>{record.content}</div>
              </div>
            </div>
          )
        },
      },
      {
        title: 'Assign Date',
        dataIndex: 'assignDate',
        key: 'assignDate',
        render: (text, record) => {
          return <span className="gx-text-grey">{moment(record.created_at.date).format('LL')}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'status_id',
        render: (text, record) => {
          return <Tag color="green">{record.status_name}</Tag>
        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority_name',
        key: 'priority_name',
        render: (text, record) => {
          return <Tag color={record.priority_color_code}> {record.priority_name}</Tag>
        },
      },
    ];
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  render() {
    const {selectedRowKeys} = this.state;
    const {customerTickets} = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div>
        <Widget title={<span className="gx-widget-heading">Related Tickets</span>}>
          <Table rowKey="id" rowSelection={rowSelection} columns={this.onGetTableColumns()}
                 className="gx-mb-4" dataSource={customerTickets}
                 onRow={(record) => ({
                   onClick: () => {
                     if (Permissions.canViewTicketDetail()) {
                       this.props.onGetTicketDetail(record)
                     }
                   }
                 })}
          />
        </Widget>
      </div>
    );
  }
}

export default RelatedTickets;
