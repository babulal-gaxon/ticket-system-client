import {Avatar, Dropdown, Menu, Popconfirm, Tag} from "antd";
import React from "react";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import Permissions from "../../../util/Permissions";

const onShowRowDropdown = (staff, context) => {
  const menu = (
    <Menu>
      {(Permissions.canStaffEdit()) ?
        <Menu.Item key="2" onClick={() => {
          context.props.onGetStaffId(staff.id);
          context.props.history.push('/staff/add-new-member')
        }}>
          Edit
        </Menu.Item> : null
      }
      {(Permissions.canStaffEdit()) ?
        <Menu.Item key="3">
          <Popconfirm
            title={`Are you sure to ${staff.status === 1 ? "Disable" : "Enable"} this Staff?`}
            onConfirm={() => {
              if (staff.status === 1) {
                context.onDisableStaff(staff.id)
              } else {
                context.onEnableStaff(staff.id)
              }

            }}
            okText="Yes"
            cancelText="No">
            {staff.status === 1 ? "Disable" : "Enable"}
          </Popconfirm>
        </Menu.Item> : null
      }
      <Menu.Divider/>
      {(Permissions.canStaffDelete()) ?
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure to delete this Staff?"
            onConfirm={() => {
              context.props.onBulkDeleteStaff({ids: [staff.id]});
              context.onGetStaffDataPaginated(context.state.currentPage, context.state.itemNumbers, context.state.filterText)
            }}
            okText="Yes"
            cancelText="No">
            Delete
          </Popconfirm>
        </Menu.Item> : null
      }
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <i className="icon icon-ellipse-h"/>
    </Dropdown>
  )
};

const StaffRow = (context) => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">
             {record.avatar ?
               <Avatar className="gx-mr-3 gx-size-50" src={MEDIA_BASE_URL + record.avatar.src}/> :
               <Avatar className="gx-mr-3 gx-size-50"
                       style={{backgroundColor: '#f56a00'}}>{record.first_name[0].toUpperCase()}</Avatar>}
          {record.first_name + " " + record.last_name} </span>
      }
    },
    {
      title: 'Hourly Rate',
      dataIndex: 'hourlyRate',
      key: 'hourlyRate',
      render: (text, record) => {
        return <span
          className="gx-email gx-d-inline-block gx-mr-2"
          style={{color: record.hourly_rate === null ? "red" : ""}}>
            {record.hourly_rate === null ? "NA" : `$${record.hourly_rate}/Hour`}</span>
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">
            {record.departments.length !== 0 ? record.departments.map(department => {
              return department.name
            }).join() : "NA"}
            </span>
      },
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2"
                     style={{color: record.designation === null ? "red" : ""}}>
            {record.designation === null ? "NA" : record.designation}</span>
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
        return <span onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}>
            {onShowRowDropdown(record, context)}
      </span>
      },
    },
  ];
};

export default StaffRow
