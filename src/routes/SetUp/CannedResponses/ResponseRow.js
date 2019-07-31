import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";

const ResponseRow = (context) => {
  return [
    {
      title: 'Short Title',
      dataIndex: 'shortTitle',
      key: 'shortTitle',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_title}</span>
      }
    },
    {
      title: 'Short Code',
      dataIndex: 'shortCode',
      key: 'shortCode',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_code}</span>
      },
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.message}</span>
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
      dataIndex: 'status_id',
      key: 'Status',
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
        return <span> {Permissions.canResponseEdit() ? <i className="icon icon-edit gx-mr-3"
                                                          onClick={() => context.onEditResponse(record)}/> : null}
          {Permissions.canResponseDelete() ? context.onDeletePopUp(record.id) : null}
          </span>
      },
    },
  ];
};

export default ResponseRow
