import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import IntlMessages from "../../../util/IntlMessages";

const ServicesRow = (context) => {
  return [
    {
      title: <IntlMessages id="common.title"/>,
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.title}</span>
      },
    },
    {
      title: <IntlMessages id="common.description"/>,
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ? <IntlMessages id="common.na"/> : record.desc}</span>
      },
    },
    {
      title: <IntlMessages id="common.support"/>,
      dataIndex: 'support_enable',
      key: 'Support',
      render: (text, record) => {
        return <Tag color={record.support_enable === 1 ? "green" : "red"}>
          {record.support_enable === 1 ? <IntlMessages id="common.enabled"/> : <IntlMessages id="common.disabled"/>}
        </Tag>
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'empty',
      render: (text, record) => {
        return <span>  {(Permissions.canServiceEdit()) ?
          <i className="icon icon-edit gx-mr-3" onClick={() => context.onEditIconClick(record)}/> : null}
          {(Permissions.canServiceDelete()) ? context.onDeletePopUp(record.id) : null}
          </span>
      },
    },
  ];
};

export default ServicesRow;
