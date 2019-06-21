import React, {Component} from 'react';
import {Breadcrumb, Button, Col, Form, Input, message, Radio, Row, Select} from "antd";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";
import {connect} from "react-redux";
import {onAddNewCustomer, onEditCustomer} from "../../../appRedux/actions/Customers";
import {onGetLabelData} from "../../../appRedux/actions/Labels";
import AddCustomerAddress from "./AddCustomerAddress";

const {Option} = Select;

class AddNewCustomers extends Component {
  constructor(props) {
    super(props);
    if (this.props.customerId === 0) {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile: "",
        address_line_1: "",
        city: "",
        state: "",
        country_id: "",
        zip_code: "",
        website: "",
        label_ids: [],
        billing_address: "",
        shipping_address: "",
        isModalVisible: false,
        account_status: 1
      };
    } else {
      setTimeout(this.onSetFieldsValue, 10);
      const selectedCustomer = this.props.customersList.find(customer => customer.id === this.props.customerId);
      this.state = {...selectedCustomer}
    }
  }
  componentWillMount() {
    this.props.onGetLabelData();
  }
  onSetFieldsValue = () => {
    this.props.form.setFieldsValue({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile
    });
  };
  onToggleAddressModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible})
  };
  onReturnCustomersScreen = () => {
    this.props.history.goBack();
  };
  onCustomerAdd = () => {
    if(this.props.customerId === null) {
      this.props.onAddNewCustomer({...this.state}, this.props.history, this.onAddSuccess)
    }
    else {
      this.props.onEditCustomer({...this.state}, this.props.history, this.onEditSuccess)
    }
  };
  onAddSuccess = () => {
    message.success('New Customer has been added successfully.');
  };
  onEditSuccess = () => {
    message.success(' Customer details has been updated successfully.');
  };
  onReset = () => {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      address_line_1: "",
      city: "",
      state: "",
      country_id: "",
      zip_code: "",
      website: "",
      label_ids: [],
      billing_address: "",
      shipping_address: "",
      status: 1,
      isModalVisible: false
    })
  };
  onLabelSelect = (id) => {
    this.setState({label_ids: this.state.label_ids.concat(id)})
  };
  onLabelRemove = (value) => {
    const updatedLabels = this.state.label_ids.filter(label => label !== value)
    this.setState({label_ids: updatedLabels})
  };
  onLabeltSelectOption = () => {
    const labelOptions = [];
    this.props.labelList.map(label => {
      return labelOptions.push(<Option value={label.id}>{label.name}</Option>);
    });
    return labelOptions;
  };
  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onCustomerAdd();
      }
    });
  };

  render() {
    console.log("in state", this.props.customerId);
    const {getFieldDecorator} = this.props.form;
    const {first_name, last_name, email, password, mobile, company_name, account_status, label_ids} = this.state;
    const labelOptions = this.onLabeltSelectOption();
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>Add New Customer</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/customers">Customers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/customers/add-customers">Add New Customer</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <hr/>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <div className="gx-d-flex gx-flex-row">
                  <Col sm={12} xs={24} className="gx-pl-0">
                    <Form.Item label="First Name">
                      {getFieldDecorator('first_name', {
                        rules: [{required: true, message: 'Please Enter First Name!'}],
                      })(<Input type="text" value={first_name} onChange={(e) => {
                        this.setState({first_name: e.target.value})
                      }}/>)}
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24} className="gx-pr-0">
                    <Form.Item label="Last Name">
                      {getFieldDecorator('last_name', {
                        rules: [{required: true, message: 'Please Enter Last Name!'}],
                      })(<Input type="text" value={last_name} onChange={(e) => {
                        this.setState({last_name: e.target.value})
                      }}/>)}
                    </Form.Item>
                  </Col>
                </div>
                <Form.Item label="Email Address">
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                      {
                        required: true,
                        message: 'Please Enter Email!'
                      }],
                  })(<Input type="text" value={email} onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Password">
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please Enter Password!'}],
                  })(<Input.Password type="text" value={password} onChange={(e) => {
                    this.setState({password: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Phone Number">
                  <Input type="text" value={mobile} onChange={(e) => {
                    this.setState({mobile: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Select Company">
                  <Input type="text" value={company_name} onChange={(e) => {
                    this.setState({company_name: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label=" Add Labels">
                  <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder="Please select Labels"
                    value={label_ids}
                    onSelect={this.onLabelSelect}
                    onDeselect={this.onLabelRemove}>
                    {labelOptions}
                  </Select>
                </Form.Item>
                <Form.Item label="Status">
                  <Radio.Group value={account_status} onChange={(e) => {
                    this.setState({account_status: e.target.value})
                  }}>
                    <Radio value={1}>Active</Radio>
                    <Radio value={0}>Disabled</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <Button type="default" style={{width: "100%", color: "blue"}} onClick={this.onToggleAddressModal}>
                    <i className="icon icon-add-circle gx-mr-1"/>Add New Address</Button>
                </Form.Item>
              </Form>
              <span>
                <Button type="primary" onClick={this.onValidationCheck}>
                  Save
                </Button>
                     <Button type="primary" onClick={this.onReset}>
                  Reset
                </Button>
                     <Button onClick={this.onReturnCustomersScreen}>
                  Cancel
                </Button>
                </span>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              image uploading option will come here, please wait
            </Col>
          </Row>
        </Widget>
        {this.state.isModalVisible ? <AddCustomerAddress isModalVisible={this.state.isModalVisible}
                                                         onToggleAddressModal={this.onToggleAddressModal}/> : null}
        <InfoView/>
      </div>
    )
  }
}

AddNewCustomers = Form.create({})(AddNewCustomers);

const mapStateToProps = ({customers, labelsList}) => {
  const {customersList, customerId} = customers;
  const {labelList} = labelsList;
  return {labelList, customersList, customerId};
};

export default connect(mapStateToProps, {
  onEditCustomer,
  onAddNewCustomer,
  onGetLabelData
})(AddNewCustomers);
