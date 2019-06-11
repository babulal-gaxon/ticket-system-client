import React, {Component} from "react"
import {Button, Col, Form, Input, Row, Select} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {onGetStaff} from "../../../appRedux/actions/SupportStaff";
import {onGetDepartments} from "../../../appRedux/actions/Departments";
import {onAddTickets, onBackToList} from "../../../appRedux/actions/TicketList";
import {onGetTicketPriorities} from "../../../appRedux/actions/TicketPriorities";

class AddNewTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      product: "",
      priority_id: "",
      user_id: "",
      department: ""
    };
  };

  componentWillMount() {
    this.props.onGetTicketPriorities();
    this.props.onGetStaff();
    this.props.onGetDepartments();
  }

  onReturnTicketsScreen = () => {
    this.props.history.push('/manage-tickets/all-tickets');
  };

  onAddTicket = () => {
    console.log("add ticket state", this.state);
    this.props.onAddTickets(this.state);
    this.props.history.push('/manage-tickets/all-tickets');
  };

  render() {
    const {title, message, product, priority_id} = this.state;
    console.log("departments",this.props.dept);
    const {priorities} = this.props;
    const {Option} = Select;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter"
                title={
                  <i className="icon icon-arrow-left" onClick={this.onReturnTicketsScreen}/>
                }>
          <hr/>
          <div className="gx-mb-4"><h3>Create New Ticket</h3></div>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{ width: "60%"}}>
                <Form.Item label="Customer" required={true}>
                  <Input type="text" value={title} onChange={(e) => {
                    this.setState({title: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Select Product" >
                  <Select defaultValue={product} onChange={(value) => {
                    this.setState({product: value})
                  }} >
                    <Option value="demo1">Demo 1</Option>
                    <Option value="demo2">Demo 2</Option>
                    <Option value="demo3">Demo 3</Option>
                    <Option value="demo4">Demo 4</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Select Department" >
                  <Select defaultValue={this.state.department} onChange={(value) => {
                    this.setState({department: value})
                  }}>
                    {this.props.dept.map(department => {
                      return <Option value={department.id}>{department.name}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Description">
                  <Input className="gx-form-control-lg" type="textarea" value={message} onChange={(e) => {
                    this.setState({message: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Set Priority">
                  <Select defaultValue={priority_id} onChange={(value) => {
                    this.setState({priority_id: value})
                  }}>
                    {priorities.map(priority =>
                      <Option key={priority.id} value={priority.id}>{priority.name}</Option>
                    )}
                  </Select>
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
                  <Button type="primary" onClick={this.onAddTicket}>
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
      </div>
    )
  }
}


const mapStateToProps = ({ticketPriorities, departments, supportStaff}) => {
  const {priorities} = ticketPriorities;
  const {staffList} = supportStaff;
  const {dept} = departments;
  return {priorities, staffList, dept};
};

export default connect(mapStateToProps, {
  onAddTickets,
  onGetTicketPriorities,
  onGetStaff,
  onBackToList,
  onGetDepartments
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