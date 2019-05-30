import {Avatar} from "antd";
import React from "react";

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
      return (<div className="gx-media gx-task-list-item gx-flex-nowrap">
          <Avatar className="gx-mr-3 gx-size-36" src="https://via.placeholder.com/150x150"/>
          <div className="gx-media-body gx-task-item-content">
            <div>
              <p className="gx-mb-0">{record.title}</p>
              <div className="gx-text-muted">
                <span>2 days ago</span>
                <span className="gx-toolbar-separator">&nbsp;</span>
                <span className="gx-email gx-d-inline-block gx-mr-2">
        from: {record.assigned_by}
        </span>
              </div>
            </div>
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
      return <p className="gx-mb-0">{record.users.map(user => {
        return user.first_name + " " + user.last_name
      })}</p>
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