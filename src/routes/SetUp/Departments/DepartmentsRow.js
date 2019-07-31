import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";

const DepartmentsRow = (context) => {
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
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ? "NA" : record.desc}</span>
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
        return <span> {Permissions.canDepartmentEdit() ? <i className="icon icon-edit gx-mr-3"
                                                            onClick={() => context.onEditDepartment(record)}/> : null}
          {Permissions.canDepartmentDelete() ? context.onDeletePopUp(record.id) : null}
          </span>
      },
    },
  ];
};

export default DepartmentsRow