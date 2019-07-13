import React, {Component} from "react"
import {Breadcrumb, Button, Col, Form, Input, Row, Select} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {
  onAddAttachments,
  onAddTickets,
  onGetFilterOptions,
  onGetFormDetails
} from "../../../appRedux/actions/TicketList";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";
import TicketAssigning from "./TicketAssigning";
import TicketAttachments from "./TicketAttachments";

const {Option} = Select;
const {TextArea} = Input;

class AddNewTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      priority_id: null,
      user_id: null,
      department_id: null,
      service_id: [],
      product_id: null,
      assign_to: null,
      tags: [],
      attachments: []
    };
  }

  componentDidMount() {
    this.props.onGetFormDetails();
    // this.props.onGetCustomersData();
    this.props.onGetFilterOptions();
  }

  onReturnTicketsScreen = () => {
    this.props.history.goBack();
  };

  onAssignStaff = (id) => {
    this.setState({assign_to: id})
  };

  onAddTicket = () => {
    this.setState({attachments: this.props.attachments}, () => {
      this.props.onAddTickets({...this.state}, this.props.history);
    })
  };

  onServiceSelectOptions = () => {
    const serviceOptions = [];
    this.props.formData.services.map(service => {
      return serviceOptions.push(<Option value={service.id}>{service.title}</Option>);
    });
    return serviceOptions;
  };

  onServiceSelect = (id) => {
    this.setState({service_id: this.state.service_id.concat(id)})
  };

  onServiceRemove = (value) => {
    const updatedServiceIds = this.state.service_id.filter(service => service !== value);
    this.setState({service_id: updatedServiceIds})
  };

  onAddTags = value => {
    this.setState({tags: value})
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onAddTicket();
      }
    });
  };

  handleSearch = (value) => {
    this.props.onGetCustomersData(null, null, value)
  };

  handleChange = (value) => {
    this.setState({user_id: value})
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, content, product_id, priority_id, department_id, service_id, user_id} = this.state;
    const {filterData, formData, customersList} = this.props;
    const ServiceOptions = this.onServiceSelectOptions();
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-font-weight-bold">Create Ticket</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/manage-tickets/all-tickets">Manage Tickets</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/manage-tickets/add-new-ticket">
                Create ticket
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <Form.Item label="Customer">
                  {getFieldDecorator('user_id', {
                    initialValue: user_id,
                    rules: [{required: true, message: 'Please Select Customer!'}],
                  })(<Select
                    showSearch
                    placeholder="Search customer"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                    notFoundContent={null}
                  >
                    {customersList.map(customer => {
                      return <Option value={customer.id}>{customer.first_name + " " + customer.last_name}</Option>
                    })}
                  </Select>)}
                </Form.Item>
                <Form.Item label="Subject">
                  {getFieldDecorator('title', {
                    initialValue: title,
                    rules: [{required: true, message: 'Please enter title!'}],
                  })(<Input onChange={(e) => {
                    this.setState({title: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Select Product">
                  <Select value={product_id} onChange={(value) => {
                    this.setState({product_id: value})
                  }}>
                    {formData.products.map(product => {
                      return <Option value={product.id}>{product.title}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Select Department">
                  <Select value={department_id} onChange={(value) => {
                    this.setState({department_id: value})
                  }}>
                    {formData.departments.map(department => {
                      return <Option value={department.id}>{department.name}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Services">
                  <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder="Please select Services"
                    value={service_id}
                    onSelect={this.onServiceSelect}
                    onDeselect={this.onServiceRemove}>
                    {ServiceOptions}
                  </Select>
                </Form.Item>
                <Form.Item label="Description">
                  <TextArea rows={4} className="gx-form-control-lg" value={content} onChange={(e) => {
                    this.setState({content: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Set Priority">
                  {getFieldDecorator('priority_id', {
                    initialValue: priority_id,
                    rules: [{required: true, message: 'Please Select Ticket Priority!'}],
                  })(<Select onChange={(value) => {
                    this.setState({priority_id: value})
                  }}>
                    {filterData.priority.map(priority =>
                      <Option key={priority.id} value={priority.id}>{priority.name}</Option>
                    )}
                  </Select>)}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.onValidationCheck}>
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <div>
                <div>Assign to</div>
                <TicketAssigning staffList={filterData.staffs}
                                 onAssignStaff={this.onAssignStaff}
                />
                <div className="gx-mb-3">Tags</div>
                <Select mode="tags" style={{width: '100%'}} placeholder="Type to add tags" onChange={this.onAddTags}
                        showSearch
                        showArrow={false}
                        notFoundContent={null}/>
              </div>
              <div className="gx-my-5">Attachments</div>
              <TicketAttachments onAddAttachments={this.props.onAddAttachments}/>
            </Col>
          </Row>
        </Widget>
        <InfoView/>
      </div>
    )
  }
}

AddNewTicket = Form.create({})(AddNewTicket);


const mapStateToProps = ({ticketList, customers}) => {
  const {formData, filterData, attachments} = ticketList;
  const {customersList} = customers;
  return {customersList, formData, filterData, attachments};
};

export default connect(mapStateToProps, {
  onAddTickets,
  onGetCustomersData,
  onGetFormDetails,
  onGetFilterOptions,
  onAddAttachments
})(AddNewTicket);


AddNewTicket.defaultProps = {
  attachments: [],
  formData: {
    departments: [],
    products: [],
    services: [],
  },
  filterData: {
    status: [],
    priority: [],
    staffs: []
  },
  customersList: []
};

AddNewTicket.propTypes = {
  attachments: PropTypes.array,
  formData: PropTypes.object,
  filterData: PropTypes.object,
  customersList: PropTypes.array
};