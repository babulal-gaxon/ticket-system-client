import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import IntlMessages from "../../../util/IntlMessages";

const PrioritiesRow = (context) => {
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
      title: <IntlMessages id="common.description"/>,
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc ? record.desc :
          <IntlMessages id="common.na"/>}</span>
      },
    },
    {
      title: <IntlMessages id="common.colorCode"/>,
      dataIndex: 'colorCode',
      key: 'colorCode',
      render: (text, record) => {
        return <Tag color={record.color_code}><span
          style={{color: record.color_code}}>{record.color_code}</span></Tag>
      },
    },
    {
      title: <IntlMessages id="priorities.weight"/>,
      dataIndex: 'priorityValue',
      key: 'priorityValue',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.value}</span>
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
        return <Tag color={record.status ? "green" : "red"}>
          {record.status ? <IntlMessages id="common.active"/> : <IntlMessages id="common.disabled"/>}
        </Tag>
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'empty',
      render: (text, record) => {
        return <span>{Permissions.canPriorityEdit() ? <i className="icon icon-edit gx-mr-3"
                                                         onClick={() => context.onEditPriority(record)}/> : null}
          {Permissions.canPriorityDelete() ? context.onDeletePopUp(record.id) : null}
          </span>
      },
    },
  ];
};

export default PrioritiesRow
