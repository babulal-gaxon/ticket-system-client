import {Avatar, Dropdown, Menu, Popconfirm, Tooltip} from "antd";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import React from "react";
import Permissions from "../../../util/Permissions";

const onShowRowDropdown = (currentCompany, context) => {
  const menu = (
    <Menu>
      {(Permissions.canCompanyEdit()) ?
        <Menu.Item key="2" onClick={() => context.onEditCompanyOption(currentCompany)}>
          Edit
        </Menu.Item> : null}
      {(Permissions.canCompanyDelete()) ?
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure to delete this Company?"
            onConfirm={() => {
              context.props.onDeleteCompanies({ids: [currentCompany.id]});
              context.onGetPaginatedData(context.state.current, context.state.itemNumbers, context.state.filterText);
            }}
            okText="Yes"
            cancelText="No">
            Delete
          </Popconfirm>
        </Menu.Item> : null}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <i className="icon icon-ellipse-h"/>
    </Dropdown>
  )
};


const CompaniesRow = (context) => {
  return [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      render: (text, record) => {
        return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
            {record.avatar ?
              <Avatar className="gx-mr-3 gx-size-60" src={MEDIA_BASE_URL + record.avatar.src}/> :
              <Avatar className="gx-mr-3 gx-size-60 gx-fs-xxl"
                      style={{backgroundColor: '#f56a00'}}>{record.company_name[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body">
              <span className="gx-mb-0 gx-text-capitalize">{record.company_name}</span>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Website',
      dataIndex: 'website',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.website ? record.website : "NA"}</span>
      },
    },
    {
      title: 'Company Members',
      dataIndex: 'companyMembers',
      render: (text, record) => {
        return <span className="gx-text-grey">
            {record.members && record.members.length > 0 ?
              record.members.map(member => {
                return member.avatar ?
                  <Tooltip key={member.id} placement="top" title={member.first_name + " " + member.last_name}>
                    <Avatar className="gx-size-50" src={MEDIA_BASE_URL + member.avatar.src}/>
                  </Tooltip>
                  :
                  <Tooltip key={member.id} placement="top" title={member.first_name + " " + member.last_name}>
                    <Avatar className=" gx-size-50" style={{backgroundColor: '#f56a00'}}>
                      {member.first_name[0].toUpperCase()}
                    </Avatar>
                  </Tooltip>
              }) : <span>No Member</span>}
              </span>
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

export default CompaniesRow;
