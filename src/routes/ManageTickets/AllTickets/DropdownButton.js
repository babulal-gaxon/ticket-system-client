import React, {Component} from "react"
import {Dropdown, Menu, Popconfirm} from "antd";

class DropdownButton extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          Archive
        </Menu.Item>
        <Menu.Item key="2">
          Re-Open
        </Menu.Item>
        <Menu.Item key="3">
          Change Priority
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="4" >
          <Popconfirm
            title="Are you sure delete this Ticket?"
            onConfirm={() => this.props.onDeleteTicket(this.props.ticketId)}
            okText="Yes"
            cancelText="No">
            Delete
          </Popconfirm>
        </Menu.Item>
      </Menu>

    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        {this.props.children}
      </Dropdown>
    )
  }
};

export default DropdownButton
