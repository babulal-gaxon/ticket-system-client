import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";

const StatusesRow = (context) => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
      },
    },
    {
      title: 'Number of Orders',
      dataIndex: 'numberOfOrders',
      key: 'numberOfOrders',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.tickets_count}</span>
      },
    },
    {
      title: 'Color Code',
      dataIndex: 'colorCode',
      key: 'colorCode',
      render: (text, record) => {
        return <Tag color={record.color_code}>
          <span style={{color: record.color_code}}>{record.color_code}</span></Tag>
      },
    },
    {
      title: 'Default',
      dataIndex: 'default',
      key: 'default',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2"
                     style={{color: record.is_default === 1 ? "blue" : ""}}>{
          record.is_default === 1 ? "Default" : "Set Default"}</span>
      },
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.created_by}</span>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return <Tag color={record.status === 1 ? "green" : "red"}>
          {record.status === 1 ? "Active" : "Disabled"}
        </Tag>
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'empty',
      render: (text, record) => {
        return <span> {Permissions.canStatusEdit() ? <i className="icon icon-edit gx-mr-3"
                                                        onClick={() => context.onEditStatus(record)}/> : null}
          {Permissions.canStatusDelete() ? context.onDeletePopUp(record.id) : null}
          </span>
      },
    },
  ];
};

export default StatusesRow