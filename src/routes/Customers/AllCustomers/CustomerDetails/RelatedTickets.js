import React, {Component} from 'react';
import {Avatar, Table, Tag, Tooltip} from "antd";
import Widget from "../../../../components/Widget";
import Permissions from "../../../../util/Permissions";
import {MEDIA_BASE_URL} from "../../../../constants/ActionTypes";
import {getFormattedDate} from "../../../../util/Utills";
import IntlMessages from "../../../../util/IntlMessages";

class RelatedTickets extends Component {

  onGetTableColumns = () => {
    return [
      {
        title: <IntlMessages id="manageTickets.ticketDetail"/>,
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
                <Tooltip placement="top" title={record.assigned_by.first_name + " " + record.assigned_by.last_name}>
                  {record.assigned_by.avatar ?
                    <Avatar className="gx-mr-3 gx-size-50" src={MEDIA_BASE_URL + record.assigned_by.avatar.src}/> :
                    <Avatar className="gx-mr-3 gx-size-50"
                            style={{backgroundColor: '#f56a00'}}>{record.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                </Tooltip>
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
        title: <IntlMessages id="manageTickets.assignDate"/>,
        dataIndex: 'assignDate',
        key: 'assignDate',
        render: (text, record) => {
          return <span className="gx-text-grey">{getFormattedDate(record.created_at)}</span>
        },
      },
      {
        title: <IntlMessages id="common.status"/>,
        dataIndex: 'status_id',
        key: 'status_id',
        render: (text, record) => {
          return <Tag color="green">{record.status_name}</Tag>
        },
      },
      {
        title: <IntlMessages id="common.priority"/>,
        dataIndex: 'priority_name',
        key: 'priority_name',
        render: (text, record) => {
          return <Tag color={record.priority_color_code}> {record.priority_name}</Tag>
        },
      },
    ];
  };

  render() {
    const {customerTickets} = this.props;

    return (
      <div>
        <Widget title={<span className="gx-widget-heading"><IntlMessages id="customer.details.tickets"/>,</span>}>
          <Table rowKey="id" columns={this.onGetTableColumns()}
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
