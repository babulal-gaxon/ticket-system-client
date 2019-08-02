import {Avatar, Dropdown, Menu, Popconfirm, Tag, Tooltip} from "antd";
import React from "react";
import Permissions from "../../../util/Permissions";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import {getFormattedDate} from "../../../util/Utills";
import IntlMessages from "../../../util/IntlMessages";

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
            <IntlMessages id="manageTickets.sortBy"/>
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
      title: <IntlMessages id="common.id"/>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.id}</span>
      },
    },
    {
      title: <IntlMessages id="manageTickets.ticketDetail"/>,
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
            <Tooltip placement="top" title={record.assigned_by.first_name + " " + record.assigned_by.last_name}>
              {record.assigned_by.avatar ?
                <Avatar className="gx-mr-3 gx-size-50 gx-fs-xl" src={MEDIA_BASE_URL + record.assigned_by.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-50 gx-fs-xl"
                        style={{backgroundColor: '#f56a00'}}>{record.assigned_by.first_name[0].toUpperCase()}</Avatar>}
            </Tooltip>
            <div className="gx-media-body">
              <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
              {record.product_name ? <Tag className="gx-ml-2" color="blue">{record.product_name}</Tag> : null}
              <div>Created on {getFormattedDate(record.created_at)}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: <IntlMessages id="manageTickets.assignTo"/>,
      dataIndex: 'assignTo',
      key: 'assign_to',
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
              <IntlMessages id="common.notAssigned"/>}
          </div>
        )
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
