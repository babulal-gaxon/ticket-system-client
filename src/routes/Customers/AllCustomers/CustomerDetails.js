import React, {Component} from "react"
import {Avatar, Col, Divider, Row, Table, Tag, Tooltip} from "antd";
import Widget from "../../../components/Widget";
import TicketDetail from "../../ManageTickets/AllTickets/TicketDetail";
import moment from "moment";

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      currentTicket: null
    }
  }

  componentDidMount() {
    const currentCustomer = this.props.currentCustomer;
    this.props.onGetCustomerTickets(currentCustomer.id);
  }

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onGetTableColumns = () => {
    return [
      {
        title: 'Ticket Detail',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => {
          return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
              {record.assigned_by ?
                <Tooltip placement="top" title={record.assigned_by.first_name + " " + record.assigned_by.last_name}>
                  {record.assigned_by.avatar ?
                    <Avatar className="gx-mr-3 gx-size-50" src={record.assigned_by.avatar.src}/> :
                    <Avatar className="gx-mr-3 gx-size-50"
                            style={{backgroundColor: '#f56a00'}}>{record.assigned_by.first_name[0].toUpperCase()}</Avatar>}
                </Tooltip> : <Avatar className="gx-size-50 gx-mr-3" src="https://via.placeholder.com/150x150"/>}
              <div className="gx-media-body">
                <span className="gx-mb-0 gx-text-capitalize">{record.title}</span>
                <Tag className="gx-ml-2" color="blue">{record.product_name}</Tag>
                <div>{record.content}</div>
              </div>
            </div>
          )
        },
      },
      {
        title: 'Assign Date',
        dataIndex: 'assignDate',
        key: 'assignDate',
        render: (text, record) => {
          return <span className="gx-text-grey">{moment(record.created_at.date).format('LL')}</span>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'status_id',
        render: (text, record) => {
          return <Tag color="green">{record.status_name}</Tag>
        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority_name',
        key: 'priority_name',
        render: (text, record) => {
          return <Tag color={record.priority_color_code}> {record.priority_name}</Tag>
        },
      },
    ];
  };

  onSelectTicket = record => {
    this.setState({currentTicket: record})
  };

  onEditProfile = () => {
    this.props.getCustomerId(this.props.currentCustomer.id);
    this.props.history.push('/customers/add-customers')
  };

  render() {
    console.log("customerTickets", this.props.currentCustomerCompany);
    const {selectedRowKeys, currentTicket} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const {currentCustomer, currentCustomerCompany, customerTickets} = this.props;
    return (
      <div>
        {currentTicket === null ?
      <div className="gx-main-content">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Widget>
              <div className="gx-d-flex gx-justify-content-between gx-mb-5">
                <span className="gx-font-weight-bold">Customer Details</span>
                <i className="icon icon-arrow-left" onClick={() => this.props.onBackToList()}/>
              </div>
              <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                {currentCustomer.avatar ?
                  <Avatar className="gx-mr-3 gx-size-100" src={currentCustomer.avatar.src}/> :
                  <Avatar className="gx-mr-3 gx-size-100"
                          style={{backgroundColor: '#f56a00'}}>{currentCustomer.first_name[0].toUpperCase()}</Avatar>}
                <div className="gx-media-body">
                  <div className="gx-d-flex gx-justify-content-between">
                    <span className="gx-mb-0 gx-text-capitalize gx-font-weight-bold">
                      {currentCustomer.first_name + " " + currentCustomer.last_name}</span>
                    <span><Tag color="blue" onClick={this.onEditProfile}>
                <i className="icon icon-edit gx-mr-3"/>Edit Profile</Tag></span>
                  </div>
                  <div className="gx-mt-2">
                    <Tag color={currentCustomer.status === 1 ? "green" : "red"}>
                      {currentCustomer.status === 1 ? "Active" : "Disabled"}
                    </Tag>
                  </div>
                </div>
              </div>
              <Row>
                <Col span={6}>
                  Email
                </Col>
                <Col>{currentCustomer.email}</Col>
              </Row>
              <Divider/>
              <Row>
                <Col span={6}>
                  Phone
                </Col>
                <Col>{currentCustomer.phone}</Col>
              </Row>
              <Divider/>
              <Row>
                <Col span={6}>
                  Status
                </Col>
                <Col>{currentCustomer.status === 1 ? "Active" : "Disabled"}</Col>
              </Row>
              <Divider/>
              <Row>
                <Col span={6}>
                  Address
                </Col>
                <Col>{currentCustomer.address}</Col>
              </Row>
            </Widget>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Widget>
              <div className="gx-d-flex gx-justify-content-between gx-mb-5">
                <span className="gx-font-weight-bold">Company Details</span>
              </div>
              <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                {currentCustomerCompany.avatar ?
                  <Avatar className="gx-mr-3 gx-size-80" src={currentCustomerCompany.avatar.src}/> :
                  <Avatar className="gx-mr-3 gx-size-80"
                          style={{backgroundColor: '#f56a00'}}>{currentCustomerCompany.company_name[0].toUpperCase()}</Avatar>}
                <div className="gx-media-body">
                <span>
                  <span className="gx-mb-0 gx-text-capitalize">
                    {currentCustomerCompany.company_name}
                  </span>
                  <div>{currentCustomerCompany.website}</div>
                </span>
                </div>
              </div>
              {currentCustomerCompany.members.length > 1 ?
                <div>
                  <div className="gx-mb-5">Other Members</div>
                  <div className="gx-d-flex gx-pl-0">
                    {currentCustomerCompany.members.map(member => {
                      return (member.id !== currentCustomer.id) ?
                        <div key={member.id}
                             className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5 gx-mx-5">
                          {member.avatar ?
                            <Avatar className="gx-mr-3 gx-size-50" src={member.avatar.src}/> :
                            <Avatar className="gx-mr-3 gx-size-50"
                                    style={{backgroundColor: '#f56a00'}}>{member.first_name[0].toUpperCase()}</Avatar>}
                          <div className="gx-media-body">
                            <div className="gx-d-flex gx-justify-content-between">
                    <span
                      className="gx-mb-0 gx-text-capitalize gx-font-weight-bold">{member.first_name + " " + member.last_name}</span>
                            </div>
                            <div className="gx-mt-2">
                              <span>{member.email}</span>
                            </div>
                          </div>
                        </div> : null
                    })}
                  </div>
                </div> :
                <div className="gx-text-center">Currently No Other Members of this company is associated.</div>}
            </Widget>
          </Col>
        </Row>
        <Widget title={<span>Assigned Tickets</span>}>
          <Table rowKey="id" rowSelection={rowSelection} columns={this.onGetTableColumns()}
                 className="gx-mb-4" dataSource={customerTickets}
                 onRow={(record) => ({
                   onClick: () => {
                     this.onSelectTicket(record)
                   }
                 })}
          />
        </Widget>
      </div> : <TicketDetail currentTicket={currentTicket}/>}
      </div>
    );
  }
}

export default CustomerDetails