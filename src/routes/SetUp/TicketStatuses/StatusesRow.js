import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import IntlMessages from "../../../util/IntlMessages";

const StatusesRow = (context) => {
  return [
    {
      title: <IntlMessages id="common.name"/>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.name}</span>
      },
    },
    {
      title: <IntlMessages id="statuses.orders"/>,
      dataIndex: 'numberOfOrders',
      key: 'numberOfOrders',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.tickets_count}</span>
      },
    },
    {
      title: <IntlMessages id="common.colorCode"/>,
      dataIndex: 'colorCode',
      key: 'colorCode',
      render: (text, record) => {
        return <Tag color={record.color_code}>
          <span style={{color: record.color_code}}>{record.color_code}</span></Tag>
      },
    },
    {
      title: <IntlMessages id="common.default"/>,
      dataIndex: 'default',
      key: 'default',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2"
                     style={{color: record.is_default === 1 ? "blue" : ""}}>{
          record.is_default === 1 ? <IntlMessages id="common.default"/> : <IntlMessages id="common.setDefault"/>}</span>
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
      dataIndex: 'status',
      key: 'status',
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
        return <span> {Permissions.canStatusEdit() ? <i className="icon icon-edit gx-mr-3 gx-pointer"
                                                        onClick={() => context.onEditStatus(record)}/> : null}
          {Permissions.canStatusDelete() ? <i className="icon icon-trash gx-pointer" onClick={() => context.onDeletePopUp(record.id)}/> : null}
          </span>
      },
    },
  ];
};

export default StatusesRow