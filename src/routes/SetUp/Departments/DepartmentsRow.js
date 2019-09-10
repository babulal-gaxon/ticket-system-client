import {Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import IntlMessages from "../../../util/IntlMessages";

const DepartmentsRow = (context) => {
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
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc === null ?
          <IntlMessages id="common.na"/> : record.desc}</span>
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
        return <span> {Permissions.canDepartmentEdit() ? <i className="icon icon-edit gx-mr-3 gx-pointer"
                                                            onClick={() => context.onEditDepartment(record)}/> : null}
          {Permissions.canDepartmentDelete() ? <i className="icon icon-trash gx-pointer" onClick={() => context.onDeletePopUp(record.id)}/> : null}
          </span>
      },
    },
  ];
};

export default DepartmentsRow
