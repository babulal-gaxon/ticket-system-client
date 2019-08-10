import React, {Component} from "react";
import {Avatar, Button, Dropdown, Menu, Popconfirm, Table, Tag, Tooltip} from "antd";
import PropTypes from "prop-types";
import IntlMessages from "../../../util/IntlMessages";
import moment from "moment";
import Permissions from "../../../util/Permissions";
import {getFormattedDate} from "../../../util/Utills";
import Widget from "../../../components/Widget";

class TicketList extends Component {

  onNewTicketClick = () => {
    this.props.history.push('/manage-tickets/add-new-ticket');
  };

  onClickViewAll = () => {
    this.props.history.push('/manage-tickets/all-tickets')
  };

  onShowRowDropdown = (ticketId) => {
    const menu = (
      <Menu>
        {(Permissions.canTicketDelete()) ?
          <Menu.Item key="4">
            <Popconfirm
              title={<IntlMessages id="manageTickets.message.delete"/>}
              onConfirm={() => this.props.onDeleteTicket({ids: ticketId})}
              okText={<IntlMessages id="common.yes"/>}
              cancelText={<IntlMessages id="common.no"/>}>
              <span><IntlMessages id="common.archive"/></span>
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


   ticketRow = () => {
    return [
      {
        title: <IntlMessages id="common.id"/>,
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.id}</span>
        },
      },
      {
        title: <IntlMessages id="manageTickets.ticketDetail"/>,
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
              {record.author ?
                <Tooltip placement="top" title={record.author.display_name}>
                  {record.author.avatar ?
                    <Avatar className="gx-mr-3 gx-size-50 gx-fs-xl" src={record.author.avatar.src}/> :
                    <Avatar className="gx-mr-3 gx-size-50 gx-fs-xl"
                            style={{backgroundColor: '#f56a00'}}>{record.author.first_name[0].toUpperCase()}</Avatar>}
                </Tooltip> : null}
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
                <div className="gx-text-grey">{record.content}</div>
                <div>
                  <span>Created on {getFormattedDate(record.created_at)} |</span>
                  <span> From: {record.author.display_name}</span>
                </div>
              </div>
            </div>
          )
        },
      },
      {
        title: <IntlMessages id="common.productHeading"/>,
        dataIndex: '',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.product_name}</span>
        },
      },
      {
        title: <IntlMessages id="manageTickets.assignTo"/>,
        dataIndex: 'assignTo',
        key: 'assign_to',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">{record.assigned_to ? record.assigned_to.display_name : <IntlMessages id="common.notAssigned"/>}</span>
        },
      },
      {
        title: <IntlMessages id="common.status"/>,
        dataIndex: 'status_id',
        key: 'status_id',
        render: (text, record) => {
          return <Tag color="green">{record.status_name}</Tag>
        },
      },
      {
        title: <IntlMessages id="common.priority"/>,
        dataIndex: 'priority_name',
        key: 'priority_name',
        render: (text, record) => {
          return <Tag color={record.priority_color_code}> {record.priority_name}</Tag>
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
            {this.onShowRowDropdown(record.id)}
      </span>
        },
      },
    ];
  };

  render() {
    const {tickets} =  this.props;
    console.log("tickets", tickets)
    return (
      <div>
      {tickets && tickets.length > 0 ?
      <Widget>
        <div className="gx-d-flex gx-justify-content-between">
        <h4 className="gx-widget-heading"><IntlMessages id="dashboard.ticketListing"/></h4>
        <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
          <Button type="primary" onClick={this.onNewTicketClick}><IntlMessages id="dashboard.newTickets"/></Button>
          <Button type="link" className="gx-text-grey gx-ml-5" onClick={this.onClickViewAll}><IntlMessages id="dashboard.viewAll"/></Button>
        </p>
        </div>
        <div>
          <Table rowKey="id" columns={this.ticketRow()} dataSource={tickets}
                 pagination={false}/>
        </div>
        <div>
          <Button className="gx-mt-3" type="default" onClick={this.onClickViewAll}><IntlMessages id="dashboard.viewAll"/></Button>
          <span>
          <i className="icon icon-schedule gx-mr-2 gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
          </span>
          <span><IntlMessages id="tickets.lastUpdate"/>:  </span>
          <span>{moment(tickets[0].updated_at).fromNow()}</span>
        </div>
      </Widget> : null}
      </div>
    );
  }
}


export default TicketList;

TicketList.defaultProps = {
  tickets: []
};

TicketList.propTypes = {
  tickets: PropTypes.array
};
