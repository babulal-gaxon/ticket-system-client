import React, {Component} from 'react';
import {Breadcrumb, Button, Col, Dropdown, Form, Input, Menu, Popconfirm, Radio, Row, Select, Tag} from "antd";
import Widget from "../../../components/Widget";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  onAddCustomerAddress,
  onAddImage,
  onAddNewCustomer,
  onDeleteCustomerAddress,
  onEditCustomer,
  onEditCustomerAddress,
  onGetCustomerFilterOptions
} from "../../../appRedux/actions/Customers";
import AddCustomerAddress from "./AddCustomerAddress";
import CustomerImageUpload from "./CustomerImageUpload";
import {onGetCountriesList} from "../../../appRedux/actions/GeneralSettings";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";
import IntlMessages from "../../../util/IntlMessages";
import {injectIntl} from "react-intl";

const {Option} = Select;

class AddNewCustomers extends Component {
  constructor(props) {
    super(props);
    if (this.props.currentCustomer === null) {
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
        addresses: [],
        selectedAddress: null,
      };
    } else {
      const selectedCustomer = this.props.currentCustomer;
      const {first_name, last_name, email, phone, status, id, avatar, addresses} = selectedCustomer;
      const companyId = selectedCustomer.company ? selectedCustomer.company.id : null;
      const labelIds = selectedCustomer.labels.map(label => {
        return label.id
      });
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
        profile_pic: avatar ? avatar.id : null,
        imageAvatar: avatar,
        addresses: addresses,
        selectedAddress: null
      }
    }
  }

  addAddress = (address) => {
    this.setState({addresses: this.state.addresses.concat(address)})
  };

  updateAddress = (updatedAddress) => {
    this.setState({addresses: this.state.addresses.map(address => address.id === updatedAddress.id ? updatedAddress : address)})
  };

  deleteAddress = (addressId) => {
    this.setState({addresses: this.state.addresses.filter(address => address.id !== addressId)})
  };

  updateProfilePic = (profile_pic) => {
    this.setState({profile_pic})
  };

  componentDidMount() {
    this.props.onGetCountriesList();
    this.props.onGetCustomerFilterOptions();
  }

  onToggleAddressModal = () => {
    this.setState({selectedAddress: null, isModalVisible: !this.state.isModalVisible})
  };

  onReturnCustomersScreen = () => {
    this.props.history.goBack();
  };

  onCustomerAdd = () => {
    if (this.props.currentCustomer === null) {
      let {profile_pic, addresses} = this.state;
      addresses = addresses.map(address => address.id);
      this.props.onAddNewCustomer({...this.state, profile_pic, addresses}, this.props.history)
    } else {
      let {profile_pic, addresses} = this.state;
      addresses = addresses.map(address => address.id);
      this.props.onEditCustomer({...this.state, profile_pic, addresses}, this.props.history)
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
    this.props.labels.map(label => {
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

  onShowAddressDropdown = (address) => {
    const menu = (
      <Menu>
        {(Permissions.canAddressEdit()) ?
          <Menu.Item key="2" onClick={() => this.onEditAddressDetail(address)}>
            <IntlMessages id="common.edit"/>
          </Menu.Item> : null}
        {(Permissions.canAddressDelete()) ?
          <Menu.Item key="4">
            <Popconfirm
              title="Are you sure to delete this Address?"
              onConfirm={() => {
                this.props.onDeleteCustomerAddress(address.id, this);
              }}
              okText={<IntlMessages id="common.yes"/>}
              cancelText={<IntlMessages id="common.no"/>}>
              Delete
            </Popconfirm>
          </Menu.Item> : null}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h"/>
      </Dropdown>
    )
  };

  onEditAddressDetail = (address) => {
    this.setState({selectedAddress: address, isModalVisible: true})
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {messages} = this.props.intl;
    const {phone, status, label_ids, addresses, first_name, last_name, email, company_id} = this.state;
    const labelOptions = this.onLabelSelectOption();
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h4
            className="gx-widget-heading">{this.props.currentCustomer === null ?
            <IntlMessages id="customer.add.addNew"/> : <IntlMessages id="customer.add.editDetail"/>}</h4>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/customers"><IntlMessages id="customers.customers"/></Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/customers/add-customers"
                    className="gx-text-primary">{this.props.currentCustomer === null ?
                <IntlMessages id="customer.add.addNew"/> : <IntlMessages id="customer.add.editDetail"/>}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <hr/>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <div className="gx-d-flex gx-flex-row">
                  <Col sm={12} xs={24} className="gx-pl-0">
                    <Form.Item label={<IntlMessages id="common.firstName"/>}>
                      {getFieldDecorator('first_name', {
                        validateTrigger: 'onBlur',
                        initialValue: first_name,
                        rules: [{required: true, message: messages["validation.message.firstName"]}],
                      })(<Input type="text" autoFocus onChange={(e) => {
                        this.setState({first_name: e.target.value})
                      }}/>)}
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24} className="gx-pr-0">
                    <Form.Item label={<IntlMessages id="common.lastName"/>}>
                      {getFieldDecorator('last_name', {
                        validateTrigger: 'onBlur',
                        initialValue: last_name,
                        rules: [{required: true, message:  messages["validation.message.lastName"]}],
                      })(<Input type="text" onChange={(e) => {
                        this.setState({last_name: e.target.value})
                      }}/>)}
                    </Form.Item>
                  </Col>
                </div>
                <Form.Item label={<IntlMessages id="common.emailAddress"/>}>
                  {getFieldDecorator('email', {
                    initialValue: email,
                    validate: [{
                      trigger: 'onBlur',
                      rules: [
                        {
                          required: true,
                          message: messages["validation.message.email"]
                        },
                      ],
                    }, {
                      trigger: 'onChange',
                      rules: [
                        {
                          type: 'email',
                          message: messages["validation.message.emailFormat"],
                        },
                      ],
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>

                <Form.Item label={<IntlMessages id="common.password"/>}
                           extra={this.props.currentCustomer === null ? "" : <IntlMessages id="validation.message.passwordUpdateNote"/>}>
                  {getFieldDecorator('password', {
                    initialValue: "",
                    validateTrigger: 'onBlur',
                    rules: [{
                      min: 8,
                      message: messages["validation.message.passwordLength"],
                    }],
                  })(<Input.Password type="text" onChange={(e) => {
                    this.setState({password: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.phoneNo."/>}>
                  {getFieldDecorator('phone', {
                    initialValue: phone,
                    validateTrigger: 'onBlur',
                    rules: [{
                      pattern: /^[0-9\b]+$/,
                      message: messages["validation.message.numericalValues"],
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({phone: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.selectCompany"/>}>
                  <Select value={company_id} onChange={this.onCompanySelect}>
                    {this.props.company.map(company => {
                      return <Option value={company.id}
                                     key={company.id}>{company.company_name}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label={<IntlMessages id="customer.add.addLabels"/>}>
                  <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder={<IntlMessages id="customers.filter.selectLabels"/>}
                    value={label_ids}
                    onSelect={this.onLabelSelect}
                    onDeselect={this.onLabelRemove}>
                    {labelOptions}
                  </Select>
                </Form.Item>
                <Form.Item label={<IntlMessages id="common.status"/>}>
                  <Radio.Group value={status} onChange={(e) => {
                    this.setState({status: e.target.value})
                  }}>
                    <Radio value={1}><IntlMessages id="common.active"/></Radio>
                    <Radio value={0}><IntlMessages id="common.disabled"/></Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  {(Permissions.canAddressAdd()) ?
                    <Button type="default" style={{width: "100%", color: "blue"}}
                            onClick={this.onToggleAddressModal}>
                      <i className="icon icon-add-circle gx-mr-1"/><IntlMessages id="common.addNewAddress"/></Button> : null}
                </Form.Item>

              </Form>
              {(Permissions.canAddressView()) ?
                addresses.length > 0 ?
                  <div className="gx-main-layout-content" style={{width: "60%"}}>
                    {addresses.map(address => {
                      return <Widget styleName="gx-card-filter" key={address.id}>
                        <div className="gx-d-flex gx-justify-content-between">
                          <div>
                            {address.address_type.map(type => {
                              return <Tag color="#108ee9" key={type}>{type}</Tag>
                            })}
                          </div>
                          {this.onShowAddressDropdown(address)}
                        </div>
                        <p>{address.address_line_1}</p>
                        <p>{`${address.city}, ${address.state} - ${address.zip_code}`}</p>
                      </Widget>
                    })}
                  </div> : null : null}
              <span>
                <Button type="primary" onClick={this.onValidationCheck}>
                  <IntlMessages id="common.save"/>
                </Button>
                     <Button onClick={this.onReset}>
                  <IntlMessages id="common.reset"/>
                </Button>
                     <Button onClick={this.onReturnCustomersScreen}>
                  <IntlMessages id="common.cancel"/>
                </Button>
                </span>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <CustomerImageUpload onAddImage={this.props.onAddImage}
                                   context={this}
                                   imageAvatar={this.state.imageAvatar}/>
            </Col>
          </Row>
        </Widget>
        {this.state.isModalVisible ? <AddCustomerAddress isModalVisible={this.state.isModalVisible}
                                                         onToggleAddressModal={this.onToggleAddressModal}
                                                         countriesList={this.props.countriesList}
                                                         context={this}
                                                         onSaveAddress={this.props.onAddCustomerAddress}
                                                         selectedAddress={this.state.selectedAddress}
                                                         onEditAddress={this.props.onEditCustomerAddress}/> : null}
      </div>
    )
  }
}

AddNewCustomers = Form.create({})(AddNewCustomers);

const mapStateToProps = ({customers, generalSettings}) => {
  const {customersList, currentCustomer, profilePicId, labels, company} = customers;
  const {countriesList} = generalSettings;
  return {labels, customersList, currentCustomer, company, profilePicId, countriesList};
};

export default connect(mapStateToProps, {
  onEditCustomer,
  onAddNewCustomer,
  onAddImage,
  onGetCountriesList,
  onAddCustomerAddress,
  onGetCustomerFilterOptions,
  onEditCustomerAddress,
  onDeleteCustomerAddress
})(injectIntl(AddNewCustomers));

AddNewCustomers.defaultProps = {
  customersList: [],
  currentCustomer: null,
  labels: [],
  company: [],
  profilePicId: null,
  countriesList: [],
};

AddNewCustomers.propTypes = {
  customersList: PropTypes.array,
  currentCustomer: PropTypes.object,
  labels: PropTypes.array,
  company: PropTypes.array,
  profilePicId: PropTypes.number,
  countriesList: PropTypes.array,

};
