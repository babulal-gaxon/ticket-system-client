import React, {Component} from 'react';
import {Avatar, Col, Row, Tabs, Tag, Tooltip} from "antd";
import Widget from "../../../components/Widget";

const { TabPane } = Tabs;

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "1"
    }
  }
  onTabChange = (key) => {
    this.setState({currentTab: key})
  }
  render() {
    const operations = <span><i className="icon icon-arrow-left" onClick ={()=> this.props.onBackToList()}/></span>;
    const staff = this.props.staff;
    return (
      <div>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Widget>
              <Tabs defaultActiveKey={this.state.currentTab} onChange={this.onTabChange} tabBarExtraContent={operations}>
                <TabPane tab="Profile" key="1">
                  <div className="gx-media gx-flex-nowrap gx-align-items-center">
                      <Avatar className="gx-mr-3 gx-size-50" src="https://via.placeholder.com/150x150"/>
                    <div className="gx-media-body">
                      <span className="gx-mb-0 gx-text-capitalize">{staff.first_name + " " + staff.last_name}</span>
                      <Tag className="gx-ml-2" color="blue">{staff.account_status}</Tag>
                      <div>
                        <Tag color = {staff.account_status === 1 ? "green" : "red"}>
                          {staff.account_status === 1 ? "Active" : "Disabled"}
                        </Tag>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Permissions" key="2">
                  Content of Tab Pane 2
                </TabPane>
              </Tabs>
            </Widget>
          </Col>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Widget></Widget>
              </Col>
              <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                <Widget></Widget>
              </Col>
            </Row>
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Widget></Widget>
              </Col>
            </Row>
          </Col>
        </Row>
        <Widget></Widget>
      </div>
    );
  }
}

export default StaffDetail;