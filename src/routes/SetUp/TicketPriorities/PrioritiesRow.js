import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";

const PrioritiesRow = (context) => {
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc ? record.desc : "NA"}</span>
      },
    },
    {
      title: 'Color Code',
      dataIndex: 'colorCode',
      key: 'colorCode',
      render: (text, record) => {
        return <Tag color={record.color_code}><span
          style={{color: record.color_code}}>{record.color_code}</span></Tag>
      },
    },
    {
      title: 'Priority Weight',
      dataIndex: 'priorityValue',
      key: 'priorityValue',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">0{record.value}</span>
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
        return <Tag color={record.status ? "green" : "red"}>
          {record.status ? "Active" : "Disabled"}
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