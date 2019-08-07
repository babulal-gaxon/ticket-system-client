import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import IntlMessages from "../../../util/IntlMessages";



const CustomerLabelRow = (context) => {
  return [
    {
      title: <IntlMessages id="common.id"/>,
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.id}</span>
      },
    },
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
      dataIndex: 'desc',
      key: 'desc',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc}</span>
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
        return <span> {Permissions.canLabelEdit() ? <i className="icon icon-edit gx-mr-3"
                                                       onClick={() => context.onEditLabel(record)}/> : null}
          {Permissions.canLabelDelete() ? context.onDeletePopUp(record.id) : null}
          </span>
      },
    },
  ];
};

export default CustomerLabelRow;
