import {Avatar, Tag, Tooltip} from "antd";
import React from "react";
import moment from "moment";


export const ticketListcolumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (text, record) => {
      return <span className="gx-text-grey">{record.id}</span>
    },
  },
  {
    title: 'Ticket Detail',
    dataIndex: 'title',
    render: (text, record) => {
      return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
          {record.assigned_by ?
            <Tooltip placement="top" title={record.assigned_by.first_name + " " + record.assigned_by.last_name}>
              {record.assigned_by.avatar ?
                <Avatar className="gx-mr-3 gx-size-50" src={record.assigned_by.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-50"
                        style={{backgroundColor: '#f56a00'}}>{record.assigned_by.first_name[0].toUpperCase()}</Avatar>}
            </Tooltip> : <Avatar className="gx-size-50 gx-mr-3" src="https://via.placeholder.com/150x150"/>}
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
            <Tag className="gx-ml-2" color="blue">{record.product_name}</Tag>
            <div>Created on {moment(record.created_at.date).format('LL')}</div>
          </div>
        </div>
      )
    },
  },
  {
    title: 'Product',
    dataIndex: '',
    render: (text, record) => {
      return <span className="gx-email gx-d-inline-block gx-mr-2">Not from server</span>
    },
  },
  {
    title: 'Assign to',
    dataIndex: '',
    render: (text, record) => {
      console.log("record", record);
      return (<div>
          {record.assigned_to ?
            <Tooltip placement="top" title={record.assigned_to.first_name + " " + record.assigned_to.last_name}
                     key={record.assigned_to.user_id}>
              {record.assigned_to.avatar ?
                <Avatar className="gx-mr-3 gx-size-36" src={record.assigned_to.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-36"
                        style={{backgroundColor: '#f56a00'}}>{record.assigned_to.first_name[0].toUpperCase()}</Avatar>}
            </Tooltip>
            :
            <Tooltip placement="top" title="Not assigned">
              <Avatar className="gx-size-36"/>
            </Tooltip>}
        </div>
      )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status_id',
    render: (text, record) => {
      return <span className={`gx-badge gx-hover gx-mb-0  gx-badge-${record.status_color_code}`}>
            {console.log("color", record.status_color_code)}
        {record.status_name}
        </span>
    },
  },
  {
    title: 'Priority',
    dataIndex: 'priority_name',
    render: (text, record) => {
      return <span className={`gx-badge gx-hover gx-mb-0  gx-badge-${record.priority_color_code}`}>
          {record.priority_name}
        </span>
    },
  },
  {
    title: '',
    dataIndex: '',
    render: (text, record) => {
      return <span className="gx-mb-0">
        <i className="icon icon-ellipse-h "/></span>
    },
  },
];

export const incrementData = [
  {name: 'Page A', price: 200},
  {name: 'Page B', price: 1200},
  {name: 'Page C', price: 600},
  {name: 'Page D', price: 1600},
  {name: 'Page D', price: 1000},
  {name: 'Page H', price: 2260},
  {name: 'Page K', price: 800},
];
