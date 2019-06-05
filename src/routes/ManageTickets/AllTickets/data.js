import {Avatar, Badge, Tooltip} from "antd";
import React from "react";

import DropdownButton from "./DropdownButton";

function lighten(color, luminosity) {

  // validate hex string
  color = new String(color).replace(/[^0-9a-f]/gi, '');
  if (color.length < 6) {
    color = color[0]+ color[0]+ color[1]+ color[1]+ color[2]+ color[2];
  }
  luminosity = luminosity || 0;

  // convert to decimal and change luminosity
  let newColor = "#", c, i, black = 0, white = 255;
  for (i = 0; i < 3; i++) {
    c = parseInt(color.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(black, c + (luminosity * white)), white)).toString(16);
    newColor += ("00"+c).substr(c.length);
  }
  return newColor;
}

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
      return (<div className="gx-media gx-flex-nowrap gx-align-items-center">

          <Tooltip placement="top" title={record.assigned_by}>
            <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
          </Tooltip>

          <div className="gx-media-body">
            <p className="gx-mb-0 gx-text-capitalize">{record.title}</p>
            <p className="gx-text-muted gx-mb-0 gx-text-truncate">
              this is dummy data, original data is not available.
            </p>
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
      return (
        <Tooltip placement="top" title="dummy data">
          <Avatar className="gx-size-36" src="https://via.placeholder.com/150x150"/>
        </Tooltip>
     )
    },
  },
  {
    title: 'Status',
    dataIndex: 'status_id',
    render: (text, record) => {
      return <span className="gx-badge gx-border gx-text-uppercase" style={{backgroundColor: lighten(record.status_color_code, 0.66), borderColor: record.status_color_code, color: record.status_color_code}}>
        {record.status_name}
      </span>
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
        }]} >
        <i className="icon icon-ellipse-h"/>
      </DropdownButton>
    },
  },
];