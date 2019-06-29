import React, {Component} from "react"
import {Avatar, Col, Divider, Row, Table, Tag} from "antd";
import Widget from "../../../components/Widget";

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onGetTableColumns = () => {
    return [
      {
        title: 'Ticket Detail',
        dataIndex: 'ticketDetail',
        key: 'ticketDetail',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">Demo</span>
        },
      },
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        render: (text, record) => {
          return <span className="gx-email gx-d-inline-block gx-mr-2">Demo Product</span>
        },
      },
      {
        title: 'Assign Date',
        dataIndex: 'assignDate',
        key: 'assignDate',
        render: (text, record) => {
          return <Tag color={record.color_code}>Demo Date</Tag>
        },
      },
      {
        title: 'Status',
        dataIndex: 'status_id',
        key: 'Status',
        render: (text, record) => {
          return <Tag color="blue">
            status
          </Tag>
        },
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        render: (text, record) => {
          return <Tag color="red">
            Priority
          </Tag>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span><i className="icon icon-edit gx-mr-3"/>
            <i className="icon icon-trash"/>
          </span>
        },
      },
    ];
  };

  onEditProfile = () => {
    this.props.getCustomerId(this.props.currentCustomer.id);
    this.props.history.push('/customers/add-customers')
  };

  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const currentCustomer = this.props.currentCustomer;
    const currentCustomerCompany = this.props.currentCustomerCompany;
    return (
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
                <Avatar className="gx-mr-3 gx-size-100" src="https://via.placeholder.com/150x150"/>
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
                  <div>Other Members</div>
                  {currentCustomerCompany.members.map(member => {
                    if (member.id !== currentCustomer.id) {
                      return <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5 ">
                        {member.avatar ?
                          <Avatar className="gx-mr-3 gx-size-100" src={member.avatar.src}/> :
                          <Avatar className="gx-mr-3 gx-size-100"
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
                      </div>
                    }
                  })}
                </div> :
                <div className="gx-text-center">Currently No Other Members of this company is associated.</div>}
            </Widget>
          </Col>
        </Row>
        <Widget title={<span>Assigned Tickets</span>}>
          <Table rowSelection={rowSelection} columns={this.onGetTableColumns()}
                 className="gx-mb-4"/>
        </Widget>
      </div>
    );
  }
}

export default CustomerDetails