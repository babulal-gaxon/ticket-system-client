import React from 'react';
import {Avatar} from "antd";
import Widget from "../../../../components/Widget";
import IntlMessages from "../../../../util/IntlMessages";

const CompanyDetails = ({currentCustomerProfile, customerCompanyMembers}) => {
  return (
    <div>
      <Widget>
        <div className="gx-d-flex gx-justify-content-between gx-mb-5">
          <span className="gx-widget-heading"><IntlMessages id="customer.details.companyDetails"/></span>
        </div>
        {currentCustomerProfile.company ?
          <div>
            <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
              {currentCustomerProfile.company.avatar ?
                <Avatar className="gx-mr-3 gx-size-80 gx-fs-xxl"
                        src={currentCustomerProfile.company.avatar.src}/> :
                <Avatar className="gx-mr-3 gx-size-80 gx-fs-xxl"
                        style={{backgroundColor: '#f56a00'}}>{currentCustomerProfile.company.company_name[0].toUpperCase()}</Avatar>}
              <div className="gx-media-body">
                <span>
                  <h3 className="gx-mb-2 gx-text-capitalize gx-widget-heading">
                    {currentCustomerProfile.company.company_name}
                  </h3>
                  <div>{currentCustomerProfile.company.website}</div>
                </span>
              </div>
            </div>
            {customerCompanyMembers.length > 1 ?
              <div>
                <div className="gx-mb-5"><IntlMessages id="customer.details.otherMembers"/></div>
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
              <div className="gx-text-center"><IntlMessages id="customer.details.noMembersMessage"/></div>}
          </div> : <div><IntlMessages id="customer.details.noCompany"/></div>}
      </Widget>
    </div>
  );
};

export default CompanyDetails;
