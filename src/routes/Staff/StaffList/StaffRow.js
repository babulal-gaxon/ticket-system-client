import {Avatar, Dropdown, Menu, Popconfirm, Tag} from "antd";
import React from "react";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import Permissions from "../../../util/Permissions";
import IntlMessages from "../../../util/IntlMessages";

const onShowRowDropdown = (staff, context) => {
  const menu = (
    <Menu>
      {(Permissions.canStaffEdit()) ?
        <Menu.Item key="2" onClick={() => {
          context.props.onSetCurrentStaff(staff);
          context.props.history.push('/staff/add-new-member')
        }}>
          <IntlMessages id="common.edit"/>
        </Menu.Item> : null
      }
      {(Permissions.canStaffEdit()) ?
        <Menu.Item key="3">
          <Popconfirm
            title={`${<IntlMessages id="common.areYouSureTo"/>} ${staff.status === 1 ?
              <IntlMessages id="common.disable"/> : <IntlMessages id="common.enable"/>} ${<IntlMessages
              id="common.thisStaff"/>}`}
            onConfirm={() => {
              if (staff.status === 1) {
                context.onDisableStaffStatus(staff.id)
              } else {
                context.onEnableStaffStatus(staff.id)
              }

            }}
            okText={<IntlMessages id="common.yes"/>}
            cancelText={<IntlMessages id="common.no"/>}>
            {staff.status === 1 ? <IntlMessages id="common.disable"/> : <IntlMessages id="common.enable"/>}
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
            okText={<IntlMessages id="common.yes"/>}
            cancelText={<IntlMessages id="common.no"/>}>
            <IntlMessages id="common.delete"/>
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
      title: <IntlMessages id="common.name"/>,
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
      title: <IntlMessages id="common.hourlyRate"/>,
      dataIndex: 'hourlyRate',
      key: 'hourlyRate',
      render: (text, record) => {
        return <span
          className="gx-email gx-d-inline-block gx-mr-2"
          style={{color: record.hourly_rate === null ? "red" : ""}}>
            {record.hourly_rate === null ? <IntlMessages id="common.na"/> : `$${record.hourly_rate}/Hour`}</span>
      },
    },
    {
      title: <IntlMessages id="common.departmentHeading"/>,
      dataIndex: 'department',
      key: 'department',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">
            {record.departments.length !== 0 ? record.departments.map(department => {
              return department.name
            }).join() : <IntlMessages id="common.na"/>}
            </span>
      },
    },
    {
      title: <IntlMessages id="common.designation"/>,
      dataIndex: 'designation',
      key: 'designation',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2"
                     style={{color: record.designation === null ? "red" : ""}}>
            {record.designation === null ? <IntlMessages id="common.na"/> : record.designation}</span>
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
        return <span className="gx-p-2 gx-cursor-pointer" onClick={(e) => {
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
