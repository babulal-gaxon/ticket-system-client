import React, {Component} from 'react';
import Widget from "../../../../components/Widget";
import {Avatar, Col, Divider, Row, Tag} from "antd";
import Permissions from "../../../../util/Permissions";
import IntlMessages from "../../../../util/IntlMessages";
import {injectIntl} from "react-intl";

class CustomerDetails extends Component {

  state = {
    showMoreAddress: false
  };

  onToggleMoreAddress = () => {
    this.setState({showMoreAddress: !this.state.showMoreAddress})
  };

  render() {
    const {messages} = this.props.intl;
    const {showMoreAddress} = this.state;
    const {currentCustomerProfile, onEditProfile, onBackToList} = this.props;
    const addresses = showMoreAddress ? currentCustomerProfile.addresses : currentCustomerProfile.addresses.slice(0, 1);
    return (
      <div>
        <Widget>
          <div className="gx-d-flex gx-justify-content-between gx-mb-5">
            <span className="gx-widget-heading">  <IntlMessages id="customer.details"/></span>
            <i className="icon icon-arrow-left" onClick={onBackToList}/>
          </div>
          <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
            {currentCustomerProfile.avatar ?
              <Avatar className="gx-mr-3 gx-size-100 gx-fs-xxl"
                      src={currentCustomerProfile.avatar.src}/> :
              <Avatar className="gx-mr-3 gx-size-100 gx-fs-xxl"
                      style={{backgroundColor: '#f56a00'}}>{currentCustomerProfile.first_name[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body">
              <div className="gx-d-flex gx-justify-content-between">
                    <span className="gx-mb-0 gx-text-capitalize gx-font-weight-bold">
                      {currentCustomerProfile.first_name + " " + currentCustomerProfile.last_name}</span>
                {(Permissions.canCustomerEdit()) ?
                  <span><Tag color="blue" onClick={onEditProfile}>
                <i className="icon icon-edit gx-mr-3"/><IntlMessages id="common.editProfile"/></Tag></span> : null}
              </div>
              <div className="gx-mt-2">
                <Tag color={currentCustomerProfile.status === 1 ? "green" : "red"}>
                  {currentCustomerProfile.status === 1 ? <IntlMessages id="common.active"/> :
                    <IntlMessages id="common.disabled"/>}
                </Tag>
              </div>
            </div>
          </div>
          <Row>
            <Col span={6}>
              <IntlMessages id="common.email"/>
            </Col>
            <Col>{currentCustomerProfile.email}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              <IntlMessages id="common.phoneNo."/>
            </Col>
            <Col>{currentCustomerProfile.phone ? <span>{currentCustomerProfile.phone}</span> :
              <IntlMessages id="common.na"/>}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              <IntlMessages id="common.status"/>
            </Col>
            <Col>{currentCustomerProfile.status === 1 ? <IntlMessages id="common.active"/> :
              <IntlMessages id="common.disabled"/>}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              <IntlMessages id="common.address"/>
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
                    <div className="gx-link"
                         onClick={this.onToggleMoreAddress}>{currentCustomerProfile.addresses.length > 1 ? `+ ${currentCustomerProfile.addresses.length - 1} 
                         ${messages["common.more"]}` : null}</div>
                    : <div className="gx-link" onClick={this.onToggleMoreAddress}><IntlMessages id="common.viewLess"/>
                    </div>}
                </div>
                : <IntlMessages id="common.na"/>}
            </Col>
          </Row>
        </Widget>
      </div>
    );
  };
}


export default injectIntl(CustomerDetails);
