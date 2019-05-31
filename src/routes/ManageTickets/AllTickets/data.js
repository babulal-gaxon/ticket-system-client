import {Avatar, Badge, Tooltip} from "antd";
import React from "react";

import DropdownButton from "./DropdownButton";

const buttonWidth = 100;
export const ticketColumn = [
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
          <div style={{width: buttonWidth}}>
            <Tooltip placement="top" title={record.assigned_by}>
              <Avatar className="gx-mr-3 gx-size-36" src="https://via.placeholder.com/150x150"/>
            </Tooltip>
          </div>
          <div className="gx-media-body gx-task-item-content">
            <div>
              <p className="gx-mb-0">{record.title}</p>
              <div className="gx-text-muted">
                this is dummy data, original data is not available.
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
      return <span className="gx-email gx-d-inline-block gx-mr-2">Not available</span>
    },
  },
  {
    title: 'Assign Date',
    dataIndex: '',
    render: (text, record) => {
      return <span className="gx-email gx-d-inline-block gx-mr-2">Not available</span>
    },
  },
  {
    title: 'Assign to',
    dataIndex: '',
    render: (text, record) => {
      return (<div style={{width: buttonWidth}}>
        <Tooltip placement="top" title="dummy data">
          <Avatar className="gx-mr-3" src="https://via.placeholder.com/150x150"/>
        </Tooltip>
      </div>)
    },
  },
  {
    title: 'Status',
    dataIndex: 'status_id',
    render: (text, record) => {
      return <Badge style={{backgroundColor: record.status_color_code}}>
        {record.status_name}
      </Badge>
    },
  },
  {
    title: 'Priority',
    dataIndex: 'priority_name',
    render: (text, record) => {
      return <Badge style={record.priority_color_code}>
        {record.priority_name}
      </Badge>
    },
  },
  {
    title: '',
    dataIndex: '',
    render: (text, record) => {
      return <DropdownButton
        options={[{id: 3, value: 'Archived'}, {id: 2, value: 'Re-Open'}, {id: 1, value: 'Change Priority'}, {
          id: 4,
          value: 'Delete'
        }]}><i className="icon icon-ellipse-h"/>
      </DropdownButton>
    },
  },
];