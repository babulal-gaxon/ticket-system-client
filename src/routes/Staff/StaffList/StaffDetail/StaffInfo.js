import React from 'react';
import Widget from "../../../../components/Widget";
import {Avatar, Col, Divider, Row, Tag} from "antd";
import Permissions from "../../../../util/Permissions";
import {MEDIA_BASE_URL} from "../../../../constants/ActionTypes";

const StaffInfo = (currentStaff, context) => {
  console.log("currentStaff", currentStaff);
  return (
    <div className="gx-main-content">
      <Widget styleName="gx-card-filter">
          <i className="icon icon-arrow-left" onClick={() => context.onBackToList()}/>
          <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-4 gx-mt-3">
            {currentStaff.avatar ?
              <Avatar className="gx-mr-3 gx-size-80" src={MEDIA_BASE_URL + currentStaff.avatar.src}/> :
              <Avatar className="gx-mr-3 gx-size-80"
                      style={{backgroundColor: '#f56a00'}}>{currentStaff.first_name[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body">
                      <span className="gx-mb-0 gx-widget-heading ">
                        {currentStaff.first_name + " " + currentStaff.last_name}</span>
              <div className="gx-mt-2">
                <Tag color={currentStaff.status === 1 ? "green" : "red"}>
                  {currentStaff.status === 1 ? "Active" : "Disabled"}
                </Tag>
              </div>
            </div>
          </div>
          <Row>
            <Col span={6}>
              Email
            </Col>
            <Col>{currentStaff.email}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              Phone
            </Col>
            <Col>{currentStaff.mobile}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              Hourly Rate
            </Col>
            <Col>{currentStaff.hourly_rate}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              Departments
            </Col>
            <Col>{currentStaff.departments.map(department => {
              return department.name
            }).join()
            }
            </Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              Status
            </Col>
            <Col>{currentStaff.account_status === 1 ? "Active" : "Disabled"}</Col>
          </Row>
          <Divider/>
          <Row>
            <Col span={6}>
              Designation
            </Col>
            <Col>{currentStaff.designation}</Col>
          </Row>
          <Divider/>
          {(Permissions.canStaffEdit()) ?
            <Tag color="blue" onClick={() => context.onEditProfile()}>
              <i className="icon icon-edit gx-mr-3"/>Edit Profile</Tag> : null}
        </Widget>
      </div>
    );
};

export default StaffInfo;