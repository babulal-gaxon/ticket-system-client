import {Avatar, Dropdown, Menu, Popconfirm, Tag, Tooltip} from "antd";
import moment from "moment";
import React from "react";
import Permissions from "../../../util/Permissions";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";

const onShowRowDropdown = (ticketId, context) => {
  const menu = (
    <Menu>
      {(Permissions.canTicketDelete()) ?
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure to Archive this Ticket?"
            onConfirm={() => context.props.onDeleteTicket({ids: ticketId})}
            okText="Yes"
            cancelText="No">
            Archive
          </Popconfirm>
        </Menu.Item> : null}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <i className="icon icon-ellipse-h"/>
    </Dropdown>
  )
};


const TicketRow = (context) => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.id}</span>
      },
    },
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
              <div>Created on {moment(record.created_at.date).format('LL')}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Assign to',
      dataIndex: 'assignTo',
      key: 'assign_to',
      render: (text, record) => {

        console.log("record.assigned_to", record.assigned_to)
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
              <Tooltip placement="top" title="Not assigned">
                Not assigned
              </Tooltip>}
          </div>
        )
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
    {
      title: '',
      dataIndex: '',
      key: 'empty',
      render: (text, record) => {
        return <span onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}>
            {onShowRowDropdown(record.id, context)}
      </span>
      },
    },
  ];
};

export default TicketRow;
