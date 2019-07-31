import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";

const ServicesRow = (context) => {
  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.title}</span>
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ? "NA" : record.desc}</span>
      },
    },
    {
      title: 'Support',
      dataIndex: 'support_enable',
      key: 'Support',
      render: (text, record) => {
        return <Tag color={record.support_enable === 1 ? "green" : "red"}>
          {record.support_enable === 1 ? "Enabled" : "Disabled"}
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
