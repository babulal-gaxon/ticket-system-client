import {Avatar, Dropdown, Menu, Popconfirm, Tag} from "antd";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import React from "react";
import Permissions from "../../../util/Permissions";
import IntlMessages from "../../../util/IntlMessages";

const onShowRowDropdown = (currentCustomer, context) => {
  const menu = (
    <Menu>
      {(Permissions.canCustomerEdit()) ?
        <Menu.Item key="1" onClick={() => {
          context.props.setCurrentCustomer(currentCustomer);
          context.props.history.push('/customers/add-customers')
        }}>
          <IntlMessages id="common.edit"/>
        </Menu.Item> : null}
      {(Permissions.canCustomerEdit()) ?
        <Menu.Item key="2" onClick={() => {
          context.setState({resetPasswordCustomerId: currentCustomer.id}, () => {
            context.onTogglePasswordModal()
          })
        }}>
          <IntlMessages id="app.userAuth.resetPassword"/>
        </Menu.Item> : null}
      {(Permissions.canCustomerEdit()) ?
        <Menu.Item key="3">
          <Popconfirm
            title={`Are you sure to ${currentCustomer.status === 1 ? <IntlMessages id="common.customer"/> : <IntlMessages id="common.customer"/>} this Customer?`}
            onConfirm={() => {
              if (currentCustomer.status === 1) {
                context.onDisableCustomerStatus(currentCustomer.id)
              } else {
                context.onEnableCustomerStatus(currentCustomer.id)
              }

            }}
            okText="Yes"
            cancelText="No">
            {currentCustomer.status === 1 ? <IntlMessages id="common.disable"/> : <IntlMessages id="common.enable"/>}
          </Popconfirm>
        </Menu.Item> : null}
      <Menu.Divider/>
      {(Permissions.canCustomerDelete()) ?
        <Menu.Item key="4">
          <Popconfirm
            title="Are you sure to delete this Customer?"
            onConfirm={() => {
              context.props.onDeleteCustomers({ids: [currentCustomer.id]});
              context.onGetPaginatedData(context.state.current, context.state.itemNumbers, context.state.filterText);
            }}
            okText="Yes"
            cancelText="No">
            <IntlMessages id="common.delete"/>
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

const CustomersRow = (context) => {
  return [
    {
      title: <IntlMessages id="common.customer"/>,
      dataIndex: 'title',
      key: 'customer',
      render: (text, record) => {
        return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
            {record.avatar ?
              <Avatar className="gx-mr-3 gx-size-50" src={MEDIA_BASE_URL + record.avatar.src}/> :
              <Avatar className="gx-mr-3 gx-size-50"
                      style={{backgroundColor: '#f56a00'}}>{record.first_name[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body">
              <span className="gx-mb-0 gx-text-capitalize">{record.first_name + " " + record.last_name}</span>
              <div className="gx-mt-1">
                <Tag color="#fc895f">{record.company ? record.company.company_name : null}</Tag>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: <IntlMessages id="common.email"/>,
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.email ? record.email : "NA"}</span>
      },
    },
    {
      title: <IntlMessages id="common.phoneNo."/>,
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => {
        return <span className="gx-text-grey">{record.phone ? record.phone : <IntlMessages id="common.na"/>}</span>
      },
    },
    {
      title: <IntlMessages id="common.labels"/>,
      dataIndex: 'labels',
      key: 'labels',
      render: (text, record) => {
        return (record.labels && record.labels.length > 0) ?
          record.labels.map(label => {
            return <Tag key={label.name}>{label.name}</Tag>
          }) : <IntlMessages id="common.na"/>
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

export default CustomersRow;
