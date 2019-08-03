import React, {Component} from "react"
import {Avatar, Breadcrumb, Button, Col, Form, Input, Row, Select} from "antd";
import PropTypes from "prop-types";
import Widget from "../../../components/Widget";
import {connect} from "react-redux";
import {onAddTickets, onGetFilterOptions, onGetFormDetails, onGetTagsList} from "../../../appRedux/actions/TicketList";
import {Link} from "react-router-dom";
import {onGetCustomersData} from "../../../appRedux/actions/Customers";
import TicketAssigning from "./TicketAssigning";
import TicketAttachments from "./TicketAttachments";
import axios from 'util/Api'
import {fetchError, fetchStart, fetchSuccess} from "../../../appRedux/actions";
import {MEDIA_BASE_URL} from "../../../constants/ActionTypes";
import {isDepartmentSelectionEnable, isProductSelectionEnable, isServiceSelectionEnable} from "../../../util/Utills";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

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
      data.append('type', 'ticket');
      this.onUploadAttachment(data, file);
      return file;
    })
  };

  onUploadAttachment = (data, file) => {
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
      } else {
        this.props.fetchError(data.errors[0])
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  handleSearch = (value) => {
    this.props.onGetCustomersData(null, null, value)
  };

  onSearchTags = (value) => {
    this.props.onGetTagsList(value);
  };

  handleChange = (value) => {
    this.setState({user_id: value})
  };

  onSelectFiles = (files) => {
    this.setState({selectedFiles: files})
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {title, content, product_id, priority_id, department_id, service_id, user_id} = this.state;
    const {filterData, formData, customersList, tagsList} = this.props;
    const ServiceOptions = this.onServiceSelectOptions();
    const {messages} = this.props.intl;

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4 className="gx-widget-heading"><IntlMessages id="manageTickets.createTicket"/></h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/manage-tickets/all-tickets"><IntlMessages id="sidebar.dashboard.manage.tickets"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/manage-tickets/add-new-ticket" className="gx-text-primary">
                <IntlMessages id="manageTickets.createTicket"/>
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <Form.Item label={<IntlMessages id="common.customer"/>}>
                  {getFieldDecorator('user_id', {
                    initialValue: user_id,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.selectCustomer"]}],
                  })(<Select
                    showSearch
                    placeholder={messages["manageTickets.filterBar.searchCustomer"]}
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
                          <Avatar className="gx-mr-3 gx-size-30" src={MEDIA_BASE_URL + customer.avatar.src}/> :
                          <Avatar className="gx-mr-3 gx-size-30"
                                  style={{backgroundColor: '#f56a00'}}>{customer.first_name[0].toUpperCase()}</Avatar>}</span>
                        <span className="gx-mx-5">{customer.first_name + " " + customer.last_name}</span>
                        <span>{customer.email}</span>
                      </Option>
                    })}
                  </Select>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.subject"/>}>
                  {getFieldDecorator('title', {
                    initialValue: title,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.selectTitle"]}],
                  })(<Input placeholder={messages["common.subject"]} onChange={(e) => {
                    this.setState({title: e.target.value})
                  }}/>)}
                </Form.Item>
                {isProductSelectionEnable() ? <Form.Item label={<IntlMessages id="common.product"/>}>
                  <Select value={product_id} placeholder={messages["manageTickets.selectProducts"]}
                          onChange={(value) => {
                            this.setState({product_id: value})
                          }}>
                    {formData.products.map(product => {
                      return <Option value={product.id} key={product.id}>{product.title}</Option>
                    })}
                  </Select>
                </Form.Item> : null}
                {isDepartmentSelectionEnable() ? <Form.Item label={<IntlMessages id="common.department"/>}>
                  <Select value={department_id} placeholder={messages["manageTickets.selectDepartments"]}
                          onChange={(value) => {
                            this.setState({department_id: value})
                          }}>
                    {formData.departments.map(department => {
                      return <Option value={department.id} key={department.id}>{department.name}</Option>
                    })}
                  </Select>
                </Form.Item> : null}
                {isServiceSelectionEnable() ? <Form.Item label={<IntlMessages id="common.services"/>}>
                  <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder={messages["manageTickets.selectServices"]}
                    value={service_id}
                    onSelect={this.onServiceSelect}
                    onDeselect={this.onServiceRemove}>
                    {ServiceOptions}
                  </Select>
                </Form.Item> : null}
                <Form.Item label={<IntlMessages id="common.description"/>}>
                  {getFieldDecorator('content', {
                    initialValue: content,
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: messages["validation.message.description"]
                      }],
                  })(<TextArea rows={4} placeHolder={messages["manageTickets.enterDescription"]}
                               className="gx-form-control-lg" onChange={(e) => {
                    this.setState({content: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.setPriority"/>}>
                  {getFieldDecorator('priority_id', {
                    initialValue: priority_id,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: messages["validation.message.priority"]}],
                  })(<Select placeHolder={messages["manageTickets.setPriority"]} onChange={(value) => {
                    this.setState({priority_id: value})
                  }}>
                    {filterData.priority.map(priority =>
                      <Option key={priority.id} value={priority.id}>{priority.name}</Option>
                    )}
                  </Select>)}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.onValidationCheck}>
                    <IntlMessages id="common.save"/>
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <div>
                <div><IntlMessages id="manageTickets.assignTo"/></div>
                <TicketAssigning staffList={filterData.staffs}
                                 onAssignStaff={this.onAssignStaff}
                />
                <div className="gx-mb-3"><IntlMessages id="common.tags"/></div>
                <Select mode="tags" style={{width: '100%'}} placeholder={messages["manageTickets.addTags"]}
                        onChange={this.onAddTags}
                        showSearch onSearch={this.onSearchTags}
                        showArrow={false}
                        notFoundContent={null}>
                  {tagsList.map(tag => {
                    return <Option key={tag.id} value={tag.title}>{tag.title}</Option>
                  })}
                </Select>
              </div>
              <div className="gx-my-5"><IntlMessages id="common.attachments"/></div>
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
  const {formData, filterData, tagsList} = ticketList;
  const {customersList} = customers;
  return {customersList, formData, filterData, tagsList};
};

export default connect(mapStateToProps, {
  onAddTickets,
  onGetCustomersData,
  onGetFormDetails,
  onGetFilterOptions,
  fetchStart,
  fetchError,
  fetchSuccess,
  onGetTagsList
})(injectIntl(AddNewTicket));


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
