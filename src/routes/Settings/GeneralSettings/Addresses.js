import React, {Component} from 'react';

import Widget from "../../../components/Widget";
import {Button, Tag} from "antd";
import AddCustomerAddress from "../../Customers/AllCustomers/AddCustomerAddress";

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    }
  }


  onCountrySelect = value => {
    this.setState({country_id: value})
  };

  onToggleAddressModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible})
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
              return <Widget styleName="gx-card-filter">
                {address.address_type.map(type => {
                  return <Tag color="#108ee9">{type}</Tag>
                })}
                <p>{address.address_line_1}</p>
                <p>{`${address.city}, ${address.state} - ${address.zip_code}`}</p>
                <p>{address.country_name}</p>
              </Widget>
            })}
          </div> : null}
        {this.state.isModalVisible ? <AddCustomerAddress isModalVisible={this.state.isModalVisible}
                                                         onToggleAddressModal={this.onToggleAddressModal}
                                                         countriesList={this.props.countriesList}
                                                         onSaveAddress={this.props.onSaveGeneralAddress}/> : null}
      </div>
    );
  }
}


export default Addresses;