import React, {Component} from "react"
import {connect} from "react-redux"
import {onGetTickets} from "../../../appRedux/actions/TicketListing";
import {Avatar, Button, Table} from "antd";
import Widget from "../../../components/Widget/index";

class TicketListing extends Component {

  componentWillMount() {
    this.props.onGetTickets();
  }

  render() {
    console.log("in tableListing", this.props.tickets);
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        render: (text, record) => {
          return <span className="gx-text-grey">{record.id}</span>

        },
      },
      {
        title: 'Ticket Detail',
        dataIndex: 'title',
        render: (text, record) => {
          return ( <div className="gx-media gx-task-list-item gx-flex-nowrap">
              <Avatar className="gx-mr-3 gx-size-36" src="https://via.placeholder.com/150x150"/>
              <div className="gx-media-body gx-task-item-content">
                <div>
                  <p className="gx-mb-0">{record.title}</p>
                  <div className="gx-text-muted">

                    <span>2 days ago</span>
                    <span className="gx-toolbar-separator">&nbsp;</span>
                    <span className="gx-email gx-d-inline-block gx-mr-2">
        from: {record.assigned_by}
        </span>
                  </div>
                </div>
              </div>
            </div>
          )
        },

      },
      {
        title: 'Product',
        dataIndex: '',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">Not from server</span>
        },
      },
      {
        title: 'Assign to',
        dataIndex: '',
        render: (text, record) => {
          return <p className="gx-mb-0">{record.users.map(user => {
            return user.first_name + " " + user.last_name
          })}</p>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        render: (text, record) => {
          return <span className={`gx-badge gx-hover gx-mb-0  gx-badge-${record.status_color_code}`}>
            {console.log("color", record.status_color_code)}
            {record.status_name}
        </span>
        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority_name',
        render: (text, record) => {
          return <span className={`gx-badge gx-hover gx-mb-0  gx-badge-${record.priority_color_code}`}>
          {record.priority_name}
        </span>
        },
      },
      {
        title: '',
        dataIndex: '',
        render: (text, record) => {
          return <span className="gx-mb-0">
        <i className="icon icon-ellipse-h "/></span>
        },
      },
    ];
    return (
      <Widget
        title={
          <h2 className="h4 gx-text-capitalize gx-mb-0">
            Ticket Listing</h2>
        } extra={
        <p className="gx-text-primary gx-mb-0 gx-pointer gx-d-none gx-d-sm-block">
          <Button type="primary">New Tickets</Button>
          <Button type="link">Snoozes</Button>
          <Button type="link">View All</Button>
        </p>
      }>
        <div>
          <Table columns={columns} dataSource={this.props.tickets} pagination={false}/>
        </div>
        <div>
          <Button type="default">View All</Button>
          <span>
          <i className="icon icon-schedule gx-mr-2 gx-fs-sm gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/>
          </span>
          <span>Last update 2 hours ago</span>
        </div>
      </Widget>
    );
  }
}


const mapStateToProps = ({ticketListing}) => {
  const {tickets} = ticketListing;
  return {tickets};
}

export default connect(mapStateToProps, {onGetTickets})(TicketListing);
