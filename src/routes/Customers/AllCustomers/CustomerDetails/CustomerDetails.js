import React, {Component} from 'react';
import Widget from "../../../../components/Widget";
import {Avatar, Col, Divider, Row, Tag} from "antd";
import {MEDIA_BASE_URL} from "../../../../constants/ActionTypes";
import Permissions from "../../../../util/Permissions";

class CustomerDetails extends Component {

  state = {
    showMoreAddress: false
  };

  onToggleMoreAddress = () => {
    this.setState({showMoreAddress: !this.state.showMoreAddress})
  };

  render() {
    const {showMoreAddress} = this.state;
    const {currentCustomerProfile, onEditProfile, onBackToList} = this.props;
    const addresses = showMoreAddress ? currentCustomerProfile.addresses : currentCustomerProfile.addresses.slice(0, 1);
    return (
      <div>
        <Widget>
          <div className="gx-d-flex gx-justify-content-between gx-mb-5">
            <span className="gx-font-weight-bold">Customer Details</span>
            <i className="icon icon-arrow-left" onClick={onBackToList}/>
          </div>
          <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
            {currentCustomerProfile.avatar ?
              <Avatar className="gx-mr-3 gx-size-100"
                      src={MEDIA_BASE_URL + currentCustomerProfile.avatar.src}/> :
              <Avatar className="gx-mr-3 gx-size-100"
                      style={{backgroundColor: '#f56a00'}}>{currentCustomerProfile.first_name[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body">
              <div className="gx-d-flex gx-justify-content-between">
                    <span className="gx-mb-0 gx-text-capitalize gx-font-weight-bold">
                      {currentCustomerProfile.first_name + " " + currentCustomerProfile.last_name}</span>
                {(Permissions.canCustomerEdit()) ?
                  <span><Tag color="blue" onClick={onEditProfile}>
                <i className="icon icon-edit gx-mr-3"/>Edit Profile</Tag></span> : null}
              </div>
              <div className="gx-mt-2">
                <Tag color={currentCustomerProfile.status === 1 ? "green" : "red"}>
                  {currentCustomerProfile.status === 1 ? "Active" : "Disabled"}
                </Tag>
              </div>
            </div>
          </div>
          <Row>
            <Col span={6}>
              Email
            </Col>
            <Col>{currentCustomerProfile.email}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              Phone
            </Col>
            <Col>{currentCustomerProfile.phone ? <span>{currentCustomerProfile.phone}</span> : "NA"}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              Status
            </Col>
            <Col>{currentCustomerProfile.status === 1 ? "Active" : "Disabled"}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              Address
            </Col>
            <Col>
              {currentCustomerProfile.addresses.length > 0 ?
                <div>
                  {addresses.map(address => {
                    return <div>
                      <div className="gx-d-flex gx-justify-content-between">
                        <p className="gx-mr-2">{address.address_line_1}</p>
                        {address.address_type.map(type => {
                          return <Tag color="#108ee9" key={type}>{type}</Tag>
                        })}
                      </div>
                      <p>{`${address.city}, ${address.state} - ${address.zip_code}`}</p>
                      <Divider/>
                    </div>
                  })}
                  {!showMoreAddress ?
                    <div
                      onClick={this.onToggleMoreAddress}>{currentCustomerProfile.addresses.length > 1 ? `+ ${currentCustomerProfile.addresses.length - 1} more` : null}</div>
                    : <div onClick={this.onToggleMoreAddress}>View Less</div>}
                </div>
                : "NA"}
            </Col>
          </Row>
        </Widget>
      </div>
    );
  };
}


export default CustomerDetails;
