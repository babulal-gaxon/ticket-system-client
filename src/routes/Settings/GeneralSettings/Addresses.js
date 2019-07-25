import React, {Component} from 'react';

import Widget from "../../../components/Widget";
import {Button, Dropdown, Menu, Popconfirm, Tag} from "antd";
import AddCustomerAddress from "../../Customers/AllCustomers/AddCustomerAddress";
import PropTypes from "prop-types";
import Permissions from "../../../util/Permissions";

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedAddress: null
    }
  }

  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  onToggleAddressModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible})
  };

  onShowAddressDropdown = (address) => {
    const menu = (
      <Menu>
        {(Permissions.canAddressEdit()) ?
          <Menu.Item key="2" onClick={() => this.onEditAddressDetail(address)}>
            Edit
          </Menu.Item> : null}
        {(Permissions.canAddressDelete()) ?
          <Menu.Item key="4">
            <Popconfirm
              title="Are you sure to delete this Address?"
              onConfirm={() => {
                this.props.onDeleteAddress(address.id);
                // this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
              }}
              okText="Yes"
              cancelText="No">
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
    const generalAddress = this.props.generalAddress;
    return (
      <div className="gx-main-layout-content">
        <Button type="default" style={{width: "50%", color: "blue"}} onClick={this.onToggleAddressModal}>
          <i className="icon icon-add-circle gx-mr-1"/>Add New Address</Button>
        {generalAddress.length > 0 ?
          <div className="gx-main-layout-content" style={{width: "50%"}}>
            {generalAddress.map(address => {
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
                <p>{address.country_name}</p>
              </Widget>
            })}
          </div> : null}
        {this.state.isModalVisible ? <AddCustomerAddress isModalVisible={this.state.isModalVisible}
                                                         onToggleAddressModal={this.onToggleAddressModal}
                                                         countriesList={this.props.countriesList}
                                                         onSaveAddress={this.props.onSaveGeneralAddress}
                                                         selectedAddress={this.state.selectedAddress}
                                                         onEditAddress={this.props.onEditAddress}/> : null}
      </div>
    );
  }
}

export default Addresses;

Addresses.defaultProps = {
  countriesList: {},
  generalAddress: [],
};

Addresses.propTypes = {
  countriesList: PropTypes.object,
  generalAddress: PropTypes.array
};