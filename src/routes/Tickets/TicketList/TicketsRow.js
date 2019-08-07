import IntlMessages from "../../../util/IntlMessages";
import {Avatar, Tag, Tooltip} from "antd";
import React from "react";
import moment from "moment";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";

const TicketsRow = () => {
  return [
    {
      title: <IntlMessages id="tickets.id"/>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.id}</span>
      }
    },
    {
      title: <IntlMessages id="tickets.subject"/>,
      dataIndex: 'subject',
      key: 'subject',
      render: (text, record) => {
        return <div className="gx-d-flex gx-justify-content-start">
          <span>{record.title}</span>
          <span className="gx-ml-2">
              <Tag color="blue">{record.product_name}</Tag>
            </span>
        </div>
      },
    },
    {
      title: <IntlMessages id="tickets.assignTo"/>,
      dataIndex: 'assignTo',
      key: 'assignTo',
      render: (text, record) => {
        return (<div>
          {record.assigned_to ?
            <Tooltip placement="top" title={record.assigned_to.first_name + " " + record.assigned_to.last_name}
                     key={record.assigned_to.user_id}>
              {record.assigned_to.avatar ?
                <Avatar className="gx-mr-3 gx-size-36" src={MEDIA_BASE_URL + record.assigned_to.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-36"
                        style={{backgroundColor: '#f56a00'}}>{record.assigned_to.first_name[0].toUpperCase()}</Avatar>}
            </Tooltip>
            :
            <div><IntlMessages id="tickets.notAssigned"/></div>}
        </div>)
      },
    },
    {
      title: <IntlMessages id="tickets.department"/>,
      dataIndex: 'department',
      key: 'department',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.department_name}</span>
      },
    },
    {
      title: <IntlMessages id="tickets.status"/>,
      dataIndex: 'status_id',
      key: 'Status',
      render: (text, record) => {
        return <Tag color="green">
          {record.status_name}
        </Tag>
      },
    },
    {
      title: <IntlMessages id="tickets.lastActivity"/>,
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{moment(record.updated_at.date).fromNow()}</span>
      },
    },
  ];
};


export default TicketsRow