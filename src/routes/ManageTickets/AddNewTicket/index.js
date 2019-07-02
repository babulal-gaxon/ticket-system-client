import React, {Component} from "react"
import {Breadcrumb, Button, Col, Form, Input, Row, Select} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import {onAddTickets, onGetFormDetails, onGetTickets, onUpdateTickets} from "../../../appRedux/actions/TicketList";
import {onGetTicketPriorities} from "../../../appRedux/actions/TicketPriorities";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";

const {Option} = Select;
const {TextArea} = Input;

class AddNewTicket extends Component {
  constructor(props) {
    super(props);
    if (this.props.ticketId === null) {
      this.state = {
        title: "",
        content: "",
        priority_id: null,
        user_id: null,
        department_id: null,
        service_id: []
      };
    } else {
      const selectedTicket = this.props.tickets.find(ticket => ticket.id === this.props.ticketId);
      this.state = {...selectedTicket};
    }
  }

  componentWillMount() {
    this.props.onGetTickets();
    this.props.onGetTicketPriorities();
    this.props.onGetStaff();
    this.props.onGetCustomersData();
    this.props.onGetFormDetails();
  }

  onReturnTicketsScreen = () => {
    this.props.history.goBack();
  };

  onAddTicket = () => {
    if (this.props.ticketId === null) {
      this.props.onAddTickets({...this.state}, this.props.history);
    } else {
      this.props.onUpdateTickets({...this.state}, this.props.history);
    }
  };

  onServiceSelectOptions = () => {
    const serviceOptions = [];
    // this.props.formData.services.map(service => {
    //   return serviceOptions.push(<Option value={service.id}>{service.name}</Option>);
    // });
    return serviceOptions;
  };

  onServiceSelect = (id) => {
    this.setState({service_id: this.state.label_ids.concat(id)})
  };

  onServiceRemove = (value) => {
    const updatedServiceIds = this.state.service_id.filter(service => service !== value)
    this.setState({service_id: updatedServiceIds})
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onAddTicket();
      }
    });
  };

  render() {
    console.log("form data", this.props.formData, );
    const {getFieldDecorator} = this.props.form;
    const {title, content, product_id, priority_id, department_id, service_id, user_id} = this.state;
    const {priorities, formData} = this.props;
    const ServiceOptions = this.onServiceSelectOptions();
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>{this.props.ticketId === null ? "Create Ticket" : "Edit Ticket Details"}</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/manage-tickets/all-tickets">Tickets</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/manage-tickets/add-new-ticket">{this.props.ticketId === null ?
                "Create ticket" : "Edit ticket"}
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
                  })(<Select onChange={(value) => {
                    this.setState({user_id: value})
                  }}>
                    {this.props.customersList.map(customer => {
                      return <Option value = {customer.id}>{customer.first_name + " " + customer.last_name}</Option>
                    })}
                  </Select>)}
                </Form.Item>
                  <Form.Item label="Subject">
                    {getFieldDecorator('title', {
                      initialValue: title,
                      rules: [{required: true, message: 'Please enter title!'}],
                    })(<Input onChange={(e) => {
                      this.setState({title: e.target.value})}}/>)}
                  </Form.Item>
                <Form.Item label="Select Product">
                  <Select defaultValue={product_id} onChange={(value) => {
                    this.setState({product_id: value})
                  }}>
                    {formData.products.map(product => {
                      return <Option value = {product.id}>{product.title}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Select Department">
                  <Select defaultValue={department_id} onChange={(value) => {
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
                    {priorities.map(priority =>
                      <Option key={priority.id} value={priority.id}>{priority.name}</Option>
                    )}
                  </Select>)}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.onValidationCheck}>
                    Add Ticket
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <div>data will come soon</div>
            </Col>
          </Row>
        </Widget>
        <InfoView/>
      </div>
    )
  }
}

AddNewTicket = Form.create({})(AddNewTicket);


const mapStateToProps = ({ticketPriorities,  supportStaff, ticketList, customers}) => {
  const {priorities} = ticketPriorities;
  const {tickets, ticketId, formData} = ticketList;
  const {staffList} = supportStaff;
  const {customersList} = customers;
  return {priorities, staffList,  tickets, ticketId, customersList, formData};
};

export default connect(mapStateToProps, {
  onGetTickets,
  onAddTickets,
  onGetTicketPriorities,
  onGetStaff,
  onUpdateTickets,
  onGetCustomersData,
  onGetFormDetails
})(AddNewTicket);


AddNewTicket.defaultProps = {
  staffList: [],
  priorities: [],
  showAddTicket: true
};

AddNewTicket.propTypes = {
  staffList: PropTypes.array,
  priorities: PropTypes.array,
  onAddTickets: PropTypes.func,
  showAddTicket: PropTypes.bool
};