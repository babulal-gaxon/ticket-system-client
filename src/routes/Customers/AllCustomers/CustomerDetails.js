import React, {Component} from "react"
import {Avatar, Col, Divider, Row, Table, Tag, Tooltip} from "antd";
import Widget from "../../../components/Widget";
import moment from "moment";
import {connect} from "react-redux";
import {
  getCustomerId,
  onGetCustomerCompany,
  onGetCustomerDetail,
  onGetCustomerTickets,
  onNullifyCurrentCustomer
} from "../../../appRedux/actions/Customers";
import Permissions from "../../../util/Permissions";
import PropTypes from "prop-types";
import qs from "qs";
import InfoView from "../../../components/InfoView";

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    }
  }

  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    this.props.onGetCustomerDetail(queryParams.id);
    this.props.onGetCustomerTickets(queryParams.id);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.currentCustomer === null && nextProps.currentCustomer) {
      this.props.onGetCustomerCompany(nextProps.currentCustomer.company.id);
    }
  }

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  componentWillUnmount() {
    this.props.onNullifyCurrentCustomer();
  }

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

  onGetTicketDetail = record => {
    this.props.history.push(`/manage-tickets/ticket-detail?id=${record.id}`);
  };

  onEditProfile = () => {
    this.props.getCustomerId(this.props.currentCustomer.id);
    this.props.history.push('/customers/add-customers')
  };

  onBackToList = () => {
    this.props.history.goBack();
  };

  render() {
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const {currentCustomer, customerCompanyMembers, customerTickets} = this.props;
    return (
      <div className="gx-main-layout-content">
        {currentCustomer ?
          <div className="gx-main-content">
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Widget>
                  <div className="gx-d-flex gx-justify-content-between gx-mb-5">
                    <span className="gx-font-weight-bold">Customer Details</span>
                    <i className="icon icon-arrow-left" onClick={this.onBackToList}/>
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
                        {(Permissions.canCustomerEdit()) ?
                          <span><Tag color="blue" onClick={this.onEditProfile}>
                <i className="icon icon-edit gx-mr-3"/>Edit Profile</Tag></span> : null}
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
                    <Col>{currentCustomer.phone ? <span>{currentCustomer.phone}</span> : "NA"}</Col>
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
                    <Col>
                      {currentCustomer.addresses.length > 0 ?
                        <div>
                          <div className="gx-d-flex gx-justify-content-between">
                            <p>{currentCustomer.addresses[0].address_line_1}</p>
                            {currentCustomer.addresses[0].address_type.map(type => {
                              return <Tag color="#108ee9" key={type}>{type}</Tag>
                            })}
                          </div>
                          <p>{`${currentCustomer.addresses[0].city}, ${currentCustomer.addresses[0].state} - ${currentCustomer.addresses[0].zip_code}`}</p>
                          <div>{currentCustomer.addresses.length > 1 ? `+ ${currentCustomer.addresses.length - 1} more` : null}</div>
                        </div>
                        : "NA"}
                    </Col>
                  </Row>
                </Widget>
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Widget>
                  <div className="gx-d-flex gx-justify-content-between gx-mb-5">
                    <span className="gx-font-weight-bold">Company Details</span>
                  </div>
                  {currentCustomer.company ?
                    <div>
                      <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
                        {currentCustomer.company.avatar ?
                          <Avatar className="gx-mr-3 gx-size-80" src={currentCustomer.company.avatar.src}/> :
                          <Avatar className="gx-mr-3 gx-size-80"
                                  style={{backgroundColor: '#f56a00'}}>{currentCustomer.company.company_name[0].toUpperCase()}</Avatar>}
                        <div className="gx-media-body">
                <span>
                  <h3 className="gx-mb-2 gx-text-capitalize gx-font-weight-bold">
                    {currentCustomer.company.company_name}
                  </h3>
                  <div>{currentCustomer.company.website}</div>
                </span>
                        </div>
                      </div>
                      {customerCompanyMembers.length > 1 ?
                        <div>
                          <div className="gx-mb-5">Other Members</div>
                          <div className="gx-d-flex gx-pl-0 gx-flex-sm-wrap">
                            {customerCompanyMembers.map(member => {
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
                    </div> : <div>Not associated with any Company</div>}
                </Widget>
              </Col>
            </Row>
            <Widget title={<span>Assigned Tickets</span>}>
              <Table rowKey="id" rowSelection={rowSelection} columns={this.onGetTableColumns()}
                     className="gx-mb-4" dataSource={customerTickets}
                     onRow={(record) => ({
                       onClick: () => {
                         if (Permissions.canViewTicketDetail()) {
                           this.onGetTicketDetail(record)
                         }
                       }
                     })}
              />
            </Widget>
          </div> : null}
        <InfoView/>
      </div>
    );
  }
}

const mapPropsToState = ({customers, ticketList}) => {
  const {currentTicket} = ticketList;
  const {customerTickets, customerCompanyMembers, currentCustomer} = customers;
  return {customerTickets, customerCompanyMembers, currentTicket, currentCustomer};
};

export default connect(mapPropsToState, {
  getCustomerId,
  onGetCustomerTickets,
  onGetCustomerCompany,
  onGetCustomerDetail,
  onNullifyCurrentCustomer
})(CustomerDetails);

CustomerDetails.defaultProps = {
  customerTickets: [],
  currentTicket: null,
  customerCompanyMembers: [],
  currentCustomer: null
};

CustomerDetails.propTypes = {
  customerTickets: PropTypes.array,
  currentTicket: PropTypes.object,
  customerCompanyMembers: PropTypes.array,
  currentCustomer: PropTypes.object,
};

