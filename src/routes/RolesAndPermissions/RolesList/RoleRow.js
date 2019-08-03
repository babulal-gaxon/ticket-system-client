import {Popconfirm, Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";
import {getFormattedDate} from "../../../util/Utills";
import IntlMessages from "../../../util/IntlMessages";


const onDeletePopUp = (recordId, context) => {
  return <Popconfirm
    title="Are you sure to delete this Role?"
    onConfirm={() => {
      context.props.onBulkDeleteRoles({ids: [recordId]});
      context.onGetRolesData(context.state.current, context.state.itemNumbers, context.state.filterText)
    }}
    okText={<IntlMessages id="common.yes"/>}
    cancelText={<IntlMessages id="common.no"/>}>
    <i className="icon icon-trash"/>
  </Popconfirm>
};
const RoleRow = (context) => {
  return [
    {
      title: <IntlMessages id="role.name"/>,
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.name}</span>
      },
    },
    {
      title: <IntlMessages id="common.lastUpdate"/>,
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      render: (text, record) => {
        return <span className="gx-text-grey">{getFormattedDate(record.updated_at)}</span>
      },
    },
    {
      title: <IntlMessages id="common.users"/>,
      dataIndex: 'users',
      key: 'users',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.users_count}</span>
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
