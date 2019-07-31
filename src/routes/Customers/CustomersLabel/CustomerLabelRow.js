import {Popconfirm, Tag} from "antd";
import Permissions from "../../../util/Permissions";
import React from "react";

const onDeletePopUp = (recordId, context) => {
  return (
    <Popconfirm
      title="Are you sure to delete this Label?"
      onConfirm={() => {
        context.props.onDeleteLabel({ids: [recordId]});
        context.onGetLabelsList(context.state.current, context.state.itemNumbers, context.state.filterText);
      }}
      okText="Yes"
      cancelText="No">
      <i className="icon icon-trash"/>
    </Popconfirm>
  )
};

const onEditLabel = (label, context) => {
  context.setState({label: label, showAddLabel: true});
};

const CustomerLabelRow = (context) => {
  return [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.id}</span>
      },
    },
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
      dataIndex: 'desc',
      key: 'desc',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.desc}</span>
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
        return <span> {Permissions.canLabelEdit() ? <i className="icon icon-edit gx-mr-3"
                                                       onClick={() => onEditLabel(record, context)}/> : null}
          {Permissions.canLabelDelete() ? onDeletePopUp(record.id, context) : null}
          </span>
      },
    },
  ];
};

export default CustomerLabelRow;
