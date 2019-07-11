import React, {Component} from 'react';
import {Breadcrumb, Button, Col, Form, Input, Radio, Row, Select, Tag} from "antd";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import InfoView from "../../../components/InfoView";
import {connect} from "react-redux";
import {onAddCustomerAddress, onAddImage, onAddNewCustomer, onEditCustomer} from "../../../appRedux/actions/Customers";
import {onGetLabelData} from "../../../appRedux/actions/Labels";
import {onGetCompaniesData} from "../../../appRedux/actions/Companies";
import AddCustomerAddress from "./AddCustomerAddress";
import CustomerImageUpload from "./CustomerImageUpload";
import {onGetCountriesList} from "../../../appRedux/actions/GeneralSettings";

const {Option} = Select;

class AddNewCustomers extends Component {
  constructor(props) {
    super(props);
    if (this.props.customerId === null) {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        company_id: null,
        label_ids: [],
        isModalVisible: false,
        status: 1,
        profile_pic: null,
        addresses: []
      };
    } else {
      const selectedCustomer = this.props.customersList.find(customer => customer.id === this.props.customerId);
      const {first_name, last_name, email, phone, status, id, avatar} = selectedCustomer;
      const companyId = selectedCustomer.company ? selectedCustomer.company.id : null;
      const labelIds = selectedCustomer.labels.map(label => {
        return label.id
      });
      const imageId = selectedCustomer.avatar ? selectedCustomer.avatar.id : null;
      this.state = {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        status: status,
        company_id: companyId,
        label_ids: labelIds,
        isModalVisible: false,
        profile_pic: imageId,
        imageAvatar: avatar
      }
    }
  }

  componentDidMount() {
    this.props.onGetLabelData();
    this.props.onGetCompaniesData();
    this.props.onGetCountriesList();
  }

  onToggleAddressModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible})
  };

  onReturnCustomersScreen = () => {
    this.props.history.goBack();
  };

  onCustomerAdd = () => {
    if (this.props.customerId === null) {
      this.setState({
          profile_pic: this.props.profilePicId,
          addresses: this.props.customerAddress.map(address => address.id)
        },
        () => {
          this.props.onAddNewCustomer({...this.state}, this.props.history)
        })
    } else {
      this.setState({profile_pic: this.props.profilePicId},
        () => {
          this.props.onEditCustomer({...this.state}, this.props.history)
        })
    }
  };

  onReset = () => {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company_id: null,
      position: "",
      label_ids: [],
      isModalVisible: false,
      status: 1
    })
  };

  onLabelSelect = (id) => {
    this.setState({label_ids: this.state.label_ids.concat(id)})
  };

  onLabelRemove = (value) => {
    const updatedLabels = this.state.label_ids.filter(label => label !== value);
    this.setState({label_ids: updatedLabels})
  };

  onLabelSelectOption = () => {
    const labelOptions = [];
    this.props.labelList.map(label => {
      return labelOptions.push(<Option value={label.id} key={label.id}>{label.name}</Option>);
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

  onCompanySelect = value => {
    this.setState({company_id: value})
  };

  render() {
    console.log("customerAddress", this.props.customerAddress);
    const {getFieldDecorator} = this.props.form;
    const {phone, status, label_ids, company_id, first_name, last_name, email} = this.state;
    const labelOptions = this.onLabelSelectOption();
    const customerAddress = this.props.customerAddress;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h3>{this.props.customerId === null ? "Add New Customer" : "Edit Customer Details"}</h3>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/customers">Customers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/customers/add-customers">{this.props.customerId === null ?
                "Add New Customer" : "Edit Customer Details"}</Link>
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
                        initialValue: first_name,
                        rules: [{required: true, message: 'Please Enter First Name!'}],
                      })(<Input type="text" onChange={(e) => {
                        this.setState({first_name: e.target.value})
                      }}/>)}
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24} className="gx-pr-0">
                    <Form.Item label="Last Name">
                      {getFieldDecorator('last_name', {
                        initialValue: last_name,
                        rules: [{required: true, message: 'Please Enter Last Name!'}],
                      })(<Input type="text" onChange={(e) => {
                        this.setState({last_name: e.target.value})
                      }}/>)}
                    </Form.Item>
                  </Col>
                </div>
                <Form.Item label="Email Address">
                  {getFieldDecorator('email', {
                    initialValue: email,
                    rules: [{
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                      {
                        required: true,
                        message: 'Please Enter Email!'
                      }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password type="text" onChange={(e) => {
                    this.setState({password: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Phone Number">
                  <Input type="text" value={phone} onChange={(e) => {
                    this.setState({phone: e.target.value})
                  }}/>
                </Form.Item>
                <Form.Item label="Select Company">
                  <Select value={company_id} onChange={this.onCompanySelect}>
                    {this.props.companiesList.map(company => {
                      return <Option value={company.id} key={company.id}>{company.company_name}</Option>
                    })}
                  </Select>
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
                  <Radio.Group value={status} onChange={(e) => {
                    this.setState({status: e.target.value})
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
              {this.props.customerAddress.length > 0 ?
                <div className="gx-main-layout-content" style={{width: "60%"}}>
                  {customerAddress.map(address => {
                    return <Widget styleName="gx-card-filter">

                      {address.address_type.map(type => {
                        return <Tag color="#108ee9">{type}</Tag>
                      })}
                      <p>{address.address_line_1}</p>
                      <p>{`${address.city}, ${address.state} - ${address.zip_code}`}</p>
                    </Widget>
                  })}
                </div> : null}
              <span>
                <Button type="primary" onClick={this.onValidationCheck}>
                  Save
                </Button>
                     <Button onClick={this.onReset}>
                  Reset
                </Button>
                     <Button onClick={this.onReturnCustomersScreen}>
                  Cancel
                </Button>
                </span>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <CustomerImageUpload onAddImage={this.props.onAddImage}
                                   imageAvatar={this.state.imageAvatar}/>
            </Col>
          </Row>
        </Widget>
        {this.state.isModalVisible ? <AddCustomerAddress isModalVisible={this.state.isModalVisible}
                                                         onToggleAddressModal={this.onToggleAddressModal}
                                                         countriesList={this.props.countriesList}
                                                         onAddCustomerAddress={this.props.onAddCustomerAddress}/> : null}
        <InfoView/>
      </div>
    )
  }
}

AddNewCustomers = Form.create({})(AddNewCustomers);

const mapStateToProps = ({customers, labelsList, companies, generalSettings}) => {
  const {customersList, customerId, profilePicId, customerAddress} = customers;
  const {labelList} = labelsList;
  const {companiesList} = companies;
  const {countriesList} = generalSettings;
  return {labelList, customersList, customerId, companiesList, profilePicId, countriesList, customerAddress};
};

export default connect(mapStateToProps, {
  onEditCustomer,
  onAddNewCustomer,
  onGetLabelData,
  onGetCompaniesData,
  onAddImage,
  onGetCountriesList,
  onAddCustomerAddress
})(AddNewCustomers);
