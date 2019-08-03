import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import IntlMessages from "../../../util/IntlMessages";

const ResponseRow = (context) => {
  return [
    {
      title: <IntlMessages id="responses.shortTitle"/>,
      dataIndex: 'shortTitle',
      key: 'shortTitle',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_title}</span>
      }
    },
    {
      title: <IntlMessages id="responses.shortCode"/>,
      dataIndex: 'shortCode',
      key: 'shortCode',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.short_code}</span>
      },
    },
    {
      title: <IntlMessages id="common.message"/>,
      dataIndex: 'message',
      key: 'message',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.message}</span>
      },
    },
    {
      title: <IntlMessages id="common.createdBy"/>,
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.created_by}</span>
      },
    },
    {
      title: <IntlMessages id="common.status"/>,
      dataIndex: 'status_id',
      key: 'Status',
      render: (text, record) => {

        return <Tag color={record.status === 1 ? "green" : "red"}>
          {record.status === 1 ? <IntlMessages id="common.active"/> : <IntlMessages id="common.disabled"/>}
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
