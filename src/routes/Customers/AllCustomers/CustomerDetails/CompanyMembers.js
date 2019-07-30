import React, {Component} from 'react';
import {Avatar} from "antd";
import Widget from "../../../../components/Widget";

const CompanyMembers = ({currentCustomerProfile, customerCompanyMembers}) => {
    return (
      <div>
      <Widget>
        <div className="gx-d-flex gx-justify-content-between gx-mb-5">
          <span className="gx-font-weight-bold">Company Details</span>
        </div>
        {currentCustomerProfile.company ?
          <div>
            <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
              {currentCustomerProfile.company.avatar ?
                <Avatar className="gx-mr-3 gx-size-80" src={currentCustomerProfile.company.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-80"
                        style={{backgroundColor: '#f56a00'}}>{currentCustomerProfile.company.company_name[0].toUpperCase()}</Avatar>}
              <div className="gx-media-body">
                <span>
                  <h3 className="gx-mb-2 gx-text-capitalize gx-font-weight-bold">
                    {currentCustomerProfile.company.company_name}
                  </h3>
                  <div>{currentCustomerProfile.company.website}</div>
                </span>
              </div>
            </div>
            {customerCompanyMembers.length > 1 ?
              <div>
                <div className="gx-mb-5">Other Members</div>
                <div className="gx-d-flex gx-pl-0 gx-flex-sm-wrap">
                  {customerCompanyMembers.map(member => {
                    return (member.id !== currentCustomerProfile.id) ?
                      <div key={member.id}
                           className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5 gx-mx-5">
                        {member.avatar ?
                          <Avatar className="gx-mr-3 gx-size-50" src={member.avatar.src}/> :
                          <Avatar className="gx-mr-3 gx-size-50"
                                  style={{backgroundColor: '#f56a00'}}>{member.first_name[0].toUpperCase()}</Avatar>}
                        <div className="gx-media-body">
                          <div className="gx-d-flex gx-justify-content-between">
                    <span
                      className="gx-mb-0 gx-text-capitalize gx-font-weight-bold">{member.first_name + " " + member.last_name}</span>
                          </div>
                          <div className="gx-mt-2">
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </div> : null
                  })}
                </div>
              </div> :
              <div className="gx-text-center">Currently No Other Members of this company is associated.</div>}
          </div> : <div>Not associated with any Company</div>}
      </Widget>
      </div>
    );
}

export default CompanyMembers;