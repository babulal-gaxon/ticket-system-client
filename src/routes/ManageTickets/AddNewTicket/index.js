import React, {Component} from "react"
import {Avatar, Breadcrumb, Button, Col, Form, Input, Row, Select} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {onAddTickets, onGetFilterOptions, onGetFormDetails} from "../../../appRedux/actions/TicketList";
import {Link} from "react-router-dom";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";
import TicketAssigning from "./TicketAssigning";
import TicketAttachments from "./TicketAttachments";
import axios from 'util/Api'
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";

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
      attachments: [],
      selectedFiles: []
    };
  }

  componentDidMount() {
    this.props.onGetFormDetails();
    this.props.onGetFilterOptions();
  }

  onReturnTicketsScreen = () => {
    this.props.history.goBack();
  };

  onAssignStaff = (id) => {
    this.setState({assign_to: id})
  };

  onAddTicket = () => {
    this.props.onAddTickets({...this.state}, this.props.history);
  };

  onServiceSelectOptions = () => {
    const serviceOptions = [];
    this.props.formData.services.map(service => {
      return serviceOptions.push(<Option value={service.id} key={service.id}>{service.title}</Option>);
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
        this.onSubmitForm();
      }
    });
  };

  onSubmitForm = () => {
    if (this.state.selectedFiles.length > 0) {
      this.onAddAttachments();
    } else {
      this.onAddTicket();
    }
  };

  onAddAttachments = () => {
    this.state.selectedFiles.map(file => {
      const data = new FormData();
      data.append('file', file);
      data.append('title', file.name);
      this.onUploadAttachment(data, file);
    })
  };

  onUploadAttachment = (data, file) => {
    console.log("in attachment")
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", data, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        this.props.fetchSuccess();
        const updatedFiles = this.state.selectedFiles.filter(attachment => attachment !== file);
        this.setState({attachments: this.state.attachments.concat(data.data), selectedFiles: updatedFiles}, () => {
          if (this.state.selectedFiles.length === 0) {
            this.onAddTicket();
          }
        })
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  handleSearch = (value) => {
    this.props.onGetCustomersData(null, null, value)
  };

  handleChange = (value) => {
    this.setState({user_id: value})
  };

  onSelectFiles = (files) => {
    this.setState({selectedFiles: files})
  };

  render() {
    console.log("selectedFiles in index", this.state.selectedFiles);
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
              <Link to="/manage-tickets/add-new-ticket" className="gx-text-primary">
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
                    validateTrigger: 'onBlur',
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
                    autoFocus
                  >
                    {customersList.map(customer => {
                      return <Option value={customer.id} key={customer.id}>
                        <span>{customer.avatar ?
                          <Avatar className="gx-mr-3 gx-size-30" src={customer.avatar.src}/> :
                          <Avatar className="gx-mr-3 gx-size-30"
                                  style={{backgroundColor: '#f56a00'}}>{customer.first_name[0].toUpperCase()}</Avatar>}</span>
                        <span className="gx-mx-5">{customer.first_name + " " + customer.last_name}</span>
                        <span>{customer.email}</span>
                      </Option>
                    })}
                  </Select>)}
                </Form.Item>
                <Form.Item label="Subject">
                  {getFieldDecorator('title', {
                    initialValue: title,
                    validateTrigger: 'onBlur',
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
                      return <Option value={product.id} key={product.id}>{product.title}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Select Department">
                  <Select value={department_id} onChange={(value) => {
                    this.setState({department_id: value})
                  }}>
                    {formData.departments.map(department => {
                      return <Option value={department.id} key={department.id}>{department.name}</Option>
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
                  {getFieldDecorator('content', {
                    initialValue: content,
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: 'Please enter the details!'
                      }],
                  })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                    this.setState({content: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Set Priority">
                  {getFieldDecorator('priority_id', {
                    initialValue: priority_id,
                    validateTrigger: 'onBlur',
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
              <TicketAttachments onSelectFiles={this.onSelectFiles}/>
            </Col>
          </Row>
        </Widget>
      </div>
    )
  }
}

AddNewTicket = Form.create({})(AddNewTicket);


const mapStateToProps = ({ticketList, customers}) => {
  const {formData, filterData} = ticketList;
  const {customersList} = customers;
  return {customersList, formData, filterData};
};

export default connect(mapStateToProps, {
  onAddTickets,
  onGetCustomersData,
  onGetFormDetails,
  onGetFilterOptions,
  fetchStart,
  fetchError,
  fetchSuccess
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
