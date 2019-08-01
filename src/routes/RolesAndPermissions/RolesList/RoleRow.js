import moment from "moment";
import {Popconfirm, Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import {getFormattedDate} from "../../../util/Utills";


const onDeletePopUp = (recordId, context) => {
  return <Popconfirm
    title="Are you sure to delete this Role?"
    onConfirm={() => {
      context.props.onBulkDeleteRoles({ids: [recordId]});
      context.onGetRolesData(context.state.current, context.state.itemNumbers, context.state.filterText)
    }}
    okText="Yes"
    cancelText="No">
    <i className="icon icon-trash"/>
  </Popconfirm>
};
const RoleRow = (context) => {
  return [
    {
      title: 'Role Name',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.name}</span>
      },
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      render: (text, record) => {
        return <span className="gx-text-grey">{getFormattedDate(record.updated_at.date)}</span>
      },
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.users_count}</span>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
        return <div> {!record.is_locked ?
          <span>{Permissions.canRoleEdit() ? <i className="icon icon-edit gx-mr-3" onClick={() => {
            context.props.onGetRoleDetail(record.id, context.props.history);
          }}/> : null}
            {Permissions.canRoleDelete() ? onDeletePopUp(record.id, context) : null}
          </span> : null}
        </div>
      },
    },
  ];
};

export default RoleRow;
