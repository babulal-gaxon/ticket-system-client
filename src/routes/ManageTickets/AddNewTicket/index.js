import React, {Component} from "react"
import {Breadcrumb, Button, Col, Form, Input, Row, Select} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import {onGetDepartments} from "../../../appRedux/actions/Departments";
import {onAddTickets, onUpdateTickets} from "../../../appRedux/actions/TicketList";
import {onGetTicketPriorities} from "../../../appRedux/actions/TicketPriorities";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";
import {onGetProductsList} from "../../../appRedux/actions/Products";

const {Option} = Select;
const {TextArea} = Input;

class AddNewTicket extends Component {
  constructor(props) {
    super(props);
    if (this.props.ticketId === null) {
      this.state = {
        title: "",
        message: "",
        product: "",
        priority_id: "",
        user_id: "",
        department: ""
      };
    } else {
      const selectedTicket = this.props.tickets.find(ticket => ticket.id === this.props.ticketId);
      this.state = {...selectedTicket};
    }
  }

  componentWillMount() {
    this.props.onGetTicketPriorities();
    this.props.onGetStaff();
    this.props.onGetDepartments();
    this.props.onGetProductsList();
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

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onAddTicket();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, message, product, priority_id, department} = this.state;
    const {priorities} = this.props;
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
                  {getFieldDecorator('title', {
                    initialValue: title,
                    rules: [{required: true, message: 'Please Enter Title!'}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({title: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Select Product">
                  <Select defaultValue={product} onChange={(value) => {
                    this.setState({product: value})
                  }}>
                    {this.props.productsList.map(product => {
                      return <Option value = {product.id}>{product.title}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Select Department">
                  <Select defaultValue={department} onChange={(value) => {
                    this.setState({department: value})
                  }}>
                    {this.props.dept.map(department => {
                      return <Option value={department.id}>{department.name}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Description">
                  <TextArea rows={4} className="gx-form-control-lg" value={message} onChange={(e) => {
                    this.setState({message: e.target.value})
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
                {/*<Form.Item label="Assign Ticket To">*/}
                {/*  <Select value={user_id} onChange={(value) => {*/}
                {/*    this.setState({user_id: value})*/}
                {/*  }}>*/}
                {/*    {staffList.map(member => {*/}
                {/*  return <Option value={member.id} key ={member.id}>{member.staff_name}</Option>*/}
                {/*    })}*/}
                {/*  </Select>*/}
                {/*</Form.Item>*/}
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


const mapStateToProps = ({ticketPriorities, departments, supportStaff, ticketList, products}) => {
  const {priorities} = ticketPriorities;
  const {tickets, ticketId} = ticketList;
  const {staffList} = supportStaff;
  const {dept} = departments;
  const {productsList} = products;
  return {priorities, staffList, dept, tickets, ticketId, productsList};
};

export default connect(mapStateToProps, {
  onAddTickets,
  onGetTicketPriorities,
  onGetStaff,
  onGetDepartments,
  onUpdateTickets,
  onGetProductsList
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